import React from 'react';
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';

import moment from 'moment';
import BigCalendar from 'react-big-calendar'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getCalEvents, createCalEvent, updateCalEvent, deleteCalEvent } from "../redux/actions/calEvent";

import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = BigCalendar.momentLocalizer(moment)

const now = new Date()

const events = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 10, 0, 0, 0),
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: 'Big conference for important people',
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: 'Late Same Night Event',
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
]


class Calendar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        newEventTitle: '',
        newEventStart: '',
        newEventEnd: '',
        newEventDescription: '',
        openDialogue: false,

        updateEventId: null,
        updateEventTitle: '',
        updateEventStart: '',
        updateEventEnd: '',
        updateEventDescription: '',
        openUpdateDialogue: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    this.props.getCalEvents();
  }

  handleClickOpen = () => {
    this.setState({ openDialogue: true });
  };

  handleClose = () => {
    this.setState({ 
        openDialogue: false,
        newEventEnd: '',
        newEventStart: '',
        newEventTitle: '',
        newEventDescription: '',
        updateEventTitle: '',
        updateEventStart: '',
        updateEventEnd: '',
        updateEventDescription: '',
        openUpdateDialogue: false
    });
  };




  handleSelect = ({ start, end }) => {
    this.setState({
        newEventStart: start,
        newEventEnd: end,
        openDialogue: true
    });
  }

  handleSubmit = () => {
      const { newEventStart, newEventEnd, newEventTitle, newEventDescription } = this.state;
      const payload = {
          end_time: newEventEnd,
          start_time: newEventStart,
          title: newEventTitle,
          description: newEventDescription,
          user_id: this.props.user.id
      };

      this.props.createCalEvent(payload).then(() => {
          this.handleClose()
      });
  }

  handleUpdate = () => {
    const { 
        // updateEventStart, 
        // updateEventEnd, 
        updateEventId,
        updateEventTitle, 
        updateEventDescription 
    } = this.state;

    const payload = {
        // end_time: updateEventEnd,
        // start_time: updateEventStart,
        title: updateEventTitle,
        description: updateEventDescription,
    };

    this.props.updateCalEvent(updateEventId, payload).then(() => {
        this.handleClose()
    });
  }

  handleDelete(){
    const test = window.confirm("Are you sure?")
    if(test){  
        this.props.deleteCalEvent(this.state.updateEventId).then(() => {
            this.handleClose();
        })
    }else{
        this.handleClose();
    }
  }


  eventsMutator(events){
      return events.map((item, index) => {
          return {
              ...item,
              end_time: moment(item.end_time).toDate(),
              start_time: moment(item.start_time).toDate()
          }
      })
  }

  onEventSelect(event){
    this.setState({
        updateEventId: event.id,
        updateEventTitle: event.title,
        updateEventStart: event.start_time,
        updateEventEnd: event.end_time,
        updateEventDescription: event.description || '',
        openUpdateDialogue: true
    })

  }

  renderCreateDialogue(){
      return <Dialog
        open={this.state.openDialogue}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title">
            <DialogTitle>
            Describe this event
            </DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                    Event Title
                </DialogContentText> */}
                <TextField
                    autoFocus
                    margin="normal"
                    label="Event title"
                    fullWidth
                    value={this.state.newEventTitle}
                    onChange={e => this.setState({newEventTitle: e.target.value})}/>
                <TextField
                    label="Description"
                    placeholder="Add a description to the Event (optional)"
                    value={this.state.newEventDescription}
                    multiline
                    fullWidth
                    onChange={(e) => this.setState({newEventDescription: e.target.value})}
                    rows="4"
                    margin="normal"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="default">
                    Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
  }

  renderUpdateDialogue(){

      return <Dialog
                open={this.state.openUpdateDialogue}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle>
                    Update or Delete this Event
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        label="Event title"
                        fullWidth
                        value={this.state.updateEventTitle}
                        onChange={e => this.setState({updateEventTitle: e.target.value})}/>
                    <TextField
                        label="Description"
                        placeholder="Add a description to the Event (optional)"
                        value={this.state.updateEventDescription}
                        multiline
                        fullWidth
                        onChange={(e) => this.setState({updateEventDescription: e.target.value})}
                        rows="4"
                        margin="normal"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="default">
                        Cancel
                    </Button>
                    <Button onClick={this.handleUpdate} color="primary">
                        Update
                    </Button>
                    <Button onClick={this.handleDelete} color="secondary">
                        Delete event
                    </Button>
                </DialogActions>
            </Dialog>
  }


  render() {
    const { calEvents } = this.props;
    return (
      <div>
        <Typography variant="h3" gutterBottom component="h1">
          Calendar
        </Typography>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        {this.renderCreateDialogue()}
        {this.renderUpdateDialogue()}
        <BigCalendar
            defaultView="month"    
            events={this.eventsMutator(calEvents)}
            selectable
            startAccessor="start_time"
            endAccessor="end_time"
            allDayAccessor="all_day"
            views={["month", "week", "day", "agenda"]}
            style={{minHeight: '600px'}}
            onSelectEvent={event => this.onEventSelect(event)}
            onSelectSlot={this.handleSelect}
            // showMultiDayTimes
            localizer={localizer} />
        <div className="spacer"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
      calEvents: state.calEvent.calEvents,
      user: state.auth.user
    };
};

export default connect(mapStateToProps, { getCalEvents , createCalEvent, updateCalEvent, deleteCalEvent })(Calendar);
