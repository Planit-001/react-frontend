import React from 'react';
import { connect } from "react-redux";
import { 
    getCalEvents, 
    createCalEvent, 
    updateCalEvent, 
    deleteCalEvent 
} from "../redux/actions/calEvent";

import moment from 'moment';
// import { Editor } from 'slate-react'
import { Value } from 'slate'

import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CreateEventForm from './../components/calendar/CreateEventForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import DialogContentText from '@material-ui/core/DialogContentText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InfoBox from './../components/calendar/InfoBox';
import PageTitle from './../components/PageTitle';
import { Paper } from "@material-ui/core";
import Spacer from './../components/Spacer';
import TextField from '@material-ui/core/TextField';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const localizer = BigCalendar.momentLocalizer(moment)


// Create our initial value...
const eventDescription = Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A line of text in a paragraph.',
                },
              ],
            },
          ],
        },
      ],
    },
  });

class Calendar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        newEventTitle: '',
        newEventStart: '',
        newEventEnd: '',
        newEventDescription: '', //eventDescription,
        newEventAllDay: false,
        openDialogue: false,

        updateEventId: null,
        updateEventTitle: '',
        updateEventStart: '',
        updateEventEnd: '',
        updateEventAllDay: false,
        updateEventDescription: '',
        openUpdateDialogue: false,

        editing: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onUpdateBtnClick = this.onUpdateBtnClick.bind(this);
    this.updateAllDay = this.updateAllDay.bind(this);

  }

  componentDidMount(){
    this.props.getCalEvents();
  }

  handleClickOpen = () => {
    this.setState({ openDialogue: true });
  };

  handleClose = (small=false) => {

    const baseReset = {
        allDay: false,
        openDialogue: false,
        newEventEnd: '',
        newEventStart: '',
        newEventTitle: '',
        newEventDescription: "",
        openUpdateDialogue: false
    }

    if(small){
        this.setState(baseReset)
    }else{
        baseReset.updateEventId = null;
        baseReset.updateEventTitle = '';
        baseReset.updateEventStart = '';
        baseReset.updateEventEnd = '';
        baseReset.updateEventDescription = '';
        baseReset.openUpdateDialogue = false;
        this.setState(baseReset);
    }
  };

  handleSmallClose = () => {
    this.setState({
        openDialogue: false,
        newEventEnd: '',
        newEventStart: '',
        newEventTitle: '',
        newEventDescription: '',
        openUpdateDialogue: false,
        editing: false,
        
    })
  }

  handleSelect = (event) => {
    const { start, end } = event
    const allDay = JSON.stringify(start) === JSON.stringify(end)
    this.setState({
        newEventStart: start,
        newEventEnd: end,
        newEventAllDay: allDay,
        openDialogue: true
    });
  }

  handleSubmit = () => {
      const { newEventStart, newEventEnd, newEventTitle, newEventDescription, newEventAllDay } = this.state;


      if(!newEventTitle.trim()){
          return
      }
      const payload = {
          end_time: newEventEnd,
          start_time: newEventStart,
          title: newEventTitle,
          description: newEventDescription,
          all_day: newEventAllDay,
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
        this.handleSmallClose()
        
    });
  }

  handleDelete(){
    const test = window.confirm("Are you sure?")
    if(test){  
        this.props.deleteCalEvent(this.state.updateEventId).then(() => {
            this.handleClose();
        })
    }else{
        this.handleSmallClose()
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

  onUpdateBtnClick(){
      this.setState({
          // openUpdateDialogue: true
          editing: true
      });
  }

  updateAllDay(e){
    if(e.target.checked !== undefined){
        this.setState({allDay: e.target.checked})
      }
  }

  onEditorStateChange = (newEventDescription) => {
    this.setState({
        newEventDescription: newEventDescription,
    });
  };

    // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ newEventDescription: value })
  }
    

  renderDialogue(){

    const {
        newEventDescription, 
        newEventTitle, 
        newEventAllDay,
        openDialogue
    } = this.state;

    return (
        <Dialog
            fullWidth
            open={openDialogue}
            onClose={this.handleClose}>
            <DialogTitle>
              {"Describe this event" }
            </DialogTitle>
            <DialogContent>
              {/* <CreateEventForm /> */}
                <TextField
                    autoFocus
                    margin="normal"
                    label="Event title"
                    fullWidth
                    value={newEventTitle }
                    onChange={e =>  this.setState({newEventTitle: e.target.value}) }/>
                <Spacer height={20} />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={ newEventAllDay }
                      disableRipple
                      onClick={(e) =>  e.target.checked !== undefined ? this.setState({newEventAllDay: e.target.checked}) : null} />
                  }
                  label="All Day"/>
                {/* <Editor value={newEventDescription || ''} onChange={this.onChange} /> */}
                <TextField
                    label="Description"
                    placeholder="Add a description to the Event (optional)"
                    value={newEventDescription || ''}
                    multiline
                    fullWidth
                    onChange={(e) => this.setState({newEventDescription: e.target.value})}
                    rows="4"
                    margin="normal"/>
              
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.handleClose() } color="default">
                    Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
      )
  }

  renderUpdateForm(){

    return(
        <Card>
          <CardContent>
            <TextField
              autoFocus
              margin="normal"
              label="Event title"
              // variant="filled"
              fullWidth
              value={this.state.updateEventTitle}
              onChange={e => this.setState({updateEventTitle: e.target.value})}/>
            <TextField
              label="Description"
              placeholder="Add a description to the Event (optional)"
              value={this.state.updateEventDescription}
              // variant="filled"
              multiline
              fullWidth
              onChange={(e) => this.setState({updateEventDescription: e.target.value})}
              rows="4"
              margin="normal"/>

          </CardContent>
          <CardActions>
            <Button onClick={this.handleSmallClose} color="default">
                Cancel
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
                Update
            </Button>
          </CardActions>
        </Card>
    )
  }

  render() {
    const { calEvents, darkMode } = this.props;
    return (
      <div>
        <PageTitle page={"calendar"} helper={true} />

        {/* {this.renderCreateDialogue()} */}
        {this.renderDialogue()}

        <Grid container spacing={4}>
            <Grid item xs={12} md={9}>
                <Paper style={{padding: 15}}>
                    <BigCalendar
                        className={darkMode ? 'darkModeCal' : ''}
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
                </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
                {this.state.editing ? this.renderUpdateForm() : <InfoBox 
                    eventId={this.state.updateEventId}
                    eventTitle={this.state.updateEventTitle}
                    eventStart={this.state.updateEventStart}
                    eventEnd={this.state.updateEventEnd}
                    eventDescription={this.state.updateEventDescription}
                    onUpdate={this.onUpdateBtnClick}
                    onDelete={this.handleDelete} />}
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
      user: state.auth.user,
      darkMode: state.ui.darkMode,
    };
};

export default connect(mapStateToProps, { 
    getCalEvents , 
    createCalEvent, 
    updateCalEvent, 
    deleteCalEvent 
})(Calendar);
