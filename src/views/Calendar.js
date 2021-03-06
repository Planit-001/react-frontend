import React from 'react';
import { connect } from "react-redux";
import { 
    getCalEvents, 
    createCalEvent, 
    updateCalEvent, 
    deleteCalEvent 
} from "../redux/actions/calEvent";

import moment from 'moment';
import _ from 'lodash';

import { readableDate } from './../utils/dateFuncs';
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { toastEvent } from './../utils/uiFuncs';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
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


      if(newEventEnd < newEventStart){
        toastEvent("End time is before start time. Please adjust.");
        return
      }

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
        updateEventStart, 
        updateEventAllDay,
        updateEventEnd, 
        updateEventId,
        updateEventTitle, 
        updateEventDescription 
    } = this.state;

    const payload = {
        all_day: updateEventAllDay,
        end_time: updateEventEnd,
        start_time: updateEventStart,
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

  updateDateTime(itemFromState, dateObj, timeString){

    let _dateObj = _.cloneDeep(dateObj);
    const _times = timeString.split(':').map(item => Number(item));
    _dateObj.setHours(_times[0]);
    _dateObj.setMinutes(_times[1]);

    this.setState({
      [itemFromState]: _dateObj
    });
  }
    

  renderDialogue(){

    const {
        newEventDescription, 
        newEventTitle, 
        newEventAllDay,
        newEventStart,
        newEventEnd,
        openDialogue
    } = this.state;

    return (
        <Dialog
            fullWidth
            open={openDialogue}
            onClose={this.handleClose}>
            <DialogTitle>
              Describe this event {newEventStart && `(on ${readableDate(newEventStart)})`}
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

                  { !newEventAllDay && <div>
                    <br/>
                    <TextField
                        label="Start time"
                        type="time"
                        value={moment(newEventStart).format('HH:mm')}
                        onChange={(e) => this.updateDateTime('newEventStart', newEventStart, e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 1800, // 30 min
                        }}/>
                    <span>&nbsp;</span> 
                      <TextField
                        label="End time"
                        type="time"
                        value={moment(newEventEnd).format('HH:mm')}
                        onChange={(e) => this.updateDateTime('newEventEnd', newEventEnd, e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          min: moment(newEventStart).format('HH:mm'), // Doesn't work??
                          step: 1800, // 30 min
                        }}/>
                  </div>}
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
    const {
      updateEventAllDay, 
      updateEventTitle, 
      updateEventDescription,
      updateEventEnd, 
      updateEventStart
    } = this.state;

    const dashStyle = {
      marginRight: 5,
      fontSize: 16,
      marginLeft: 5,
    }

    const timeContainer = {
      display: "flex",
      alignItems: "center",
      margin: "10px 0"
    }

    return(
        <Card>
          <CardContent>
            <TextField
              autoFocus
              margin="normal"
              label="Event title"
              // variant="filled"
              fullWidth
              value={updateEventTitle}
              onChange={e => this.setState({updateEventTitle: e.target.value})}/>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={ updateEventAllDay }
                  disableRipple
                  onClick={(e) =>  e.target.checked !== undefined ? this.setState({updateEventAllDay: e.target.checked}) : null} />
              }
              label="All Day"/>
            {!updateEventAllDay && <div style={timeContainer}>

              <br/>
              <TextField
                  label="Start time"
                  type="time"
                  value={moment(updateEventStart).format('HH:mm')}
                  onChange={(e) => this.updateDateTime('updateEventStart', updateEventStart, e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 1800, // 30 min
                  }}/>
              <span style={dashStyle}>&nbsp;-&nbsp;</span> 
                <TextField
                  label="End time"
                  type="time"
                  value={moment(updateEventEnd).format('HH:mm')}
                  onChange={(e) => this.updateDateTime('updateEventEnd', updateEventEnd, e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: moment(updateEventStart).format('HH:mm'), // Doesn't work??
                    step: 1800, // 30 min
                  }}/>

            </div>}
            <TextField
              label="Description"
              placeholder="Add a description to the Event (optional)"
              value={updateEventDescription}
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
                        // showMultiDayTimes={false}
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
                    onDelete={this.handleDelete}
                    darkMode={this.props.darkMode} />}
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
    getCalEvents, 
    createCalEvent, 
    updateCalEvent, 
    deleteCalEvent 
})(Calendar);
