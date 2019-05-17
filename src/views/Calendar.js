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
import Grid from '@material-ui/core/Grid';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getCalEvents, createCalEvent, updateCalEvent, deleteCalEvent } from "../redux/actions/calEvent";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import InfoBox from './../components/calendar/InfoBox';


const localizer = BigCalendar.momentLocalizer(moment)

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
        // openUpdateDialogue: true
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

        {this.renderCreateDialogue()}
        {this.renderUpdateDialogue()}

        <Grid container spacing={32}>
            <Grid item sm={12} md={9}>
                <BigCalendar
                    selectable
                    startAccessor="start_time"
                    endAccessor="end_time"
                    allDayAccessor="all_day"
                    defaultView="month"
                    views={["month", "week", "day", "agenda"]}
                    style={{minHeight: '600px'}}
                    popup={true}
                    events={this.eventsMutator(calEvents)}
                    onSelectEvent={event => this.onEventSelect(event)}
                    onSelectSlot={this.handleSelect}
                    localizer={localizer} />
            </Grid>
            <Grid item sm={12} md={3}>
                <InfoBox 
                    eventId={this.state.updateEventId}
                    eventTitle={this.state.updateEventTitle}
                    eventStart={this.state.updateEventStart}
                    eventEnd={this.state.updateEventEnd}
                    eventDescription={this.state.updateEventDescription}
                />
            </Grid>
        </Grid>
        
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
