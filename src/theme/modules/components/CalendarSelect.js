import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import calendarEvents from '../data/calendarEvents';
import './CalendarSelect.css'
// import { INITIAL_EVENTS, createEventId } from './event-utils'

class CalendarSelect extends React.Component {

  state = {
    // weekendsVisible: true,
    eventsClickedArr: [],
    dateRange: {}
  }

  // componentDidMount() {
  //   FullCalendar.setOption('visibleRange',
  //     this.getVisibleRange()
  //   )
  // }

  componentDidMount() {
    console.log('componenet mounted')
    this.getVisibleRange();
  }

  getVisibleRange = () => {
    const startDate = calendarEvents[0].start;
    const mobileEndDate = calendarEvents[15].start
    const normalEndDate = calendarEvents[79].start;
    console.log(startDate)
    if (window.innerWidth <= 740) {
      console.log('mobile run');
      console.log(`startDate: ${startDate}`)
      console.log(`endDate: ${mobileEndDate}`)
      this.setState({
        dateRange: {
          start: startDate,
          end: mobileEndDate
        }
      }, () => console.log(this.state.dateRange))
    } else {
      this.setState({
        dateRange: {
          start: startDate,
          end: normalEndDate
        }
      }, () => console.log(this.state.dateRange))
    }
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <p className='availability-error-msg'>{this.props.error}</p>
        </div>
        <div className='demo-app-sidebar-section'>
          {/* <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label> */}
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>
            {this.state.eventsClickedArr.map(item => this.renderSidebarEvent(item.timeClicked)
            )}
          </h2>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        // id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  toggleStyle = (element) => {
    element.style.backgroundColor === 'green' ? element.style.backgroundColor = '#3788d8' : element.style.backgroundColor = 'green'
  }

  handleEventClick = (clickInfo) => {

    const eventId = clickInfo.event._instance.instanceId
    console.log(eventId);

    const timeClicked = clickInfo.event._instance.range
    console.log(timeClicked);

    this.props.onChange(timeClicked);

    const eventElement = clickInfo.el

    // console.log(clickInfo.el)

    // console.log(clickInfo.event._instance.range)
    // console.log(clickInfo.event._instance)
    // console.log(clickInfo.event._instance.instanceId)

    this.setState(prevState => {
      let eventsClickedArr = [...prevState.eventsClickedArr]
      console.log(eventsClickedArr)
      let matchFound = false
      let matchIndex = ''
      eventsClickedArr.forEach((item, index) => {
        if (item.eventId === eventId) {
          matchFound = true;
          matchIndex = index;
        }
      })
      console.log(`matchFound: ${matchFound}`);
      console.log(`matchIndex: ${matchIndex}`);
      if (matchFound) {
        eventsClickedArr.splice(matchIndex, 1)
        console.log(clickInfo.el)
        clickInfo.el.style.backgroundColor = 'rgb(55, 136, 216)'
        console.log(clickInfo.el)
      } else if (matchFound === false && eventsClickedArr.length < 3) {
        console.log('run else if')
        console.log(clickInfo.el.style.backgroundColor)
        clickInfo.el.style.backgroundColor = 'green'
        console.log(clickInfo.el.style.backgroundColor)
        let dateObj = { eventId: eventId, timeClicked: timeClicked }
        console.log(dateObj)
        eventsClickedArr.push(dateObj)
        console.log(eventsClickedArr[0])
      }
      return {
        eventsClickedArr
      }
    },
      () => { this.props.onChange(this.state.eventsClickedArr) }
    )
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

  handleRangeChange = (num) => {
    console.log(num)
    this.setState(state => {
      const dateRange = state.dateRange
      var startDate = dateRange.start
      startDate.setDate(startDate.getDate() + num)
      var endDate = dateRange.end
      endDate.setDate(endDate.getDate() + num)
      console.log(startDate)
      console.log(endDate)
      dateRange.start = startDate
      dateRange.end = endDate
      return {
        dateRange
      }
    }, () => {console.log(this.state.dateRange)})
  }

  renderEventContent = eventInfo => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        {/* <i>{eventInfo.event.title}</i> */}
      </>
    )
  }

  renderSidebarEvent = event => {
    console.log(formatDate(event, { year: 'numeric', month: 'short', day: 'numeric', timeZoneName: 'short', timeZone: 'local' }))
    return (
      <b>{formatDate(event, { year: 'numeric', month: 'short', day: 'numeric', timeZoneName: 'short', timeZone: 'local' })}</b>
    )
  }

  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          {this.state.dateRange ? 
          <FullCalendar
            timeZone='local'
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={window.innerWidth <= 740 ? { start: 'title', center: false, end: 'backButton,nextButton' } : { start: 'title', center: false, end: false }}
            initialView='timeGrid'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            customButtons={{
              nextButton: {
                text: <span>&gt;</span>,
                click: () => this.handleRangeChange(1)
              },
              backButton: {
                text: <span>&lt;</span>,
                click: () => this.handleRangeChange(-1)
              }}
            }
            // visibleRange={calendarEvents[0].start, calendarEvents[6].start}
            visibleRange={this.state.dateRange}
            // weekends={this.state.weekendsVisible}
            initialEvents={calendarEvents}
            // select={this.handleDateSelect}
            eventContent={this.renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function () { }}
          eventChange={function () { }}
          eventRemove={function () { }}
          */
          />
          :
          null}
        </div>
      </div>
    )
  }
}

export default CalendarSelect;