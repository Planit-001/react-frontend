import React from 'react';
import { connect } from "react-redux";

import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import { 
    getCalEvents
} from "./../../redux/actions/calEvent";

import { eventsApiMutator } from './../../utils/calEventFuncs';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import ComponentTitle from './../ComponentTitle';

const localizer = BigCalendar.momentLocalizer(moment)

function EventAgenda({ event }) {
    return (
      <span>
        <em>{event.title}</em>
        <p>{event.desc}</p>
      </span>
    )
  }

class MiniCal extends React.Component{

    componentDidMount(){
        this.props.getCalEvents();
    }

    render(){
        const { calEvents, title } = this.props;
        return (
            <div>
                <ComponentTitle title={title} />
                <BigCalendar
                    startAccessor="start_time"
                    endAccessor="end_time"
                    allDayAccessor="all_day"
                    defaultView="agenda"
                    toolbar={false}
                    style={{minHeight: '600px'}}
                    events={eventsApiMutator(calEvents)}
                    components={{
                        agenda: {
                          event: EventAgenda,
                        }
                    }}                  
                    localizer={localizer} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        calEvents: state.calEvent.calEvents,
        user: state.auth.user
      };
  };
  
  export default connect(mapStateToProps, { getCalEvents })(MiniCal);
  