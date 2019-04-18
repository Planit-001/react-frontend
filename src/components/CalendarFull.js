import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick


// import './main.scss' // webpack must be configured to do this

export default class CalendarFull extends React.Component {

  render() {
    return (
      <FullCalendar 
        defaultView="dayGridMonth" 
        header={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        events={[
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' }
          ]}
        />
    )
  }

}