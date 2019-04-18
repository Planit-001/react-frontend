import 'tui-calendar/dist/tui-calendar.css'
import Calendar from '@toast-ui/react-calendar'
import React from 'react';

class CalendarToast extends React.Component {
    handleClickDayname = (ev) => {
      // view : week, day
      console.group('onClickDayname');
      console.log(ev.date);
      console.groupEnd();
    };
  
    render() {
      return (
          <div>
              <Calendar 
              
              />
          </div>
      );
    }
}

// const d = new Date();
  
// const CalendarToast = () => (
//     <Calendar
//         usageStatistics={false}
//         defaultView="month" />
// );
  

export default CalendarToast;
