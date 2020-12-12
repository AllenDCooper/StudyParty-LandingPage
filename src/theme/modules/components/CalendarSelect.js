import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import calendarEvents from '../data/calendarEvents';
// import { INITIAL_EVENTS, createEventId } from './event-utils'

class CalendarSelect extends React.Component {

  state = {
    // weekendsVisible: true,
    eventsClickedArr: []
  }

  getVisibleRange = () => {
    const startDate = calendarEvents[0].start;
    const endDate = calendarEvents[6].start;
    return ({
      start: startDate,
      end: endDate
    })
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


  renderEventContent = eventInfo => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  renderSidebarEvent = event => {
    console.log(formatDate(event, { year: 'numeric', month: 'short', day: 'numeric', timeZoneName: 'short', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }))
    return (
      <b>{formatDate(event, { year: 'numeric', month: 'short', day: 'numeric', timeZoneName: 'short', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })}</b>
    )
  }

  render() {
    console.log(this.props.error)
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={false}
            initialView='timeGrid'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // visibleRange={calendarEvents[0].start, calendarEvents[6].start}
            visibleRange={this.getVisibleRange()}
            // weekends={this.state.weekendsVisible}
            initialEvents={calendarEvents}
            // select={this.handleDateSelect}
            eventContent={this.renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          />
        </div>
      </div>
    )
  }
}

export default CalendarSelect;