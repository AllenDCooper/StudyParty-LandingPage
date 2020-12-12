import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import calendarEvents from '../data/calendarEvents';
// import { INITIAL_EVENTS, createEventId } from './event-utils'

export default class CalenderSelect extends React.Component {

  state = {
    // weekendsVisible: true,
    eventsClicked: []
  }

  getVisibleRange = () => {
    const startDate = calendarEvents[0].start;
    const endDate = calendarEvents[6].start;
    return ({
        start: startDate,
        end: endDate
    })
  }

  render() {
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
            eventContent={renderEventContent} // custom render function
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

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          {/* <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul> */}
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
            {renderSidebarEvent(this.props.value)}
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

  handleEventClick = (clickInfo) => {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
    const timeClicked = clickInfo.event._instance.range
    this.props.onChange(timeClicked);

    console.log(clickInfo.event._instance.range)
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
function renderSidebarEvent(event) {
  return (
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric', timeZoneName: 'short', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })}</b>
  )
}