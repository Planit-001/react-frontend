import React from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { connect } from "react-redux";
import { updateTodo, deleteTodo } from "../redux/actions/index";
import moment from 'moment';
import {readableDate} from './../utils/dateFuncs';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

class TodoItem extends React.Component {

  state = {
    timeModal: false,
    editable: false,
    newTitle: '',
    selectedDate: null, // moment().format(),
    // selectedTime: null
  }

  componentDidMount(){
    if(this.props.todo.due_date){
      this.setState({selectedDate: this.props.todo.due_date})
    }
  }

  handleDateChange = date => {
    console.log('date: ', date)
    this.setState({ selectedDate: date });
  };

  handleTimeChange = time => {
    console.log('time: ', time)
    this.setState({ selectedTime: time });
  };

  updateTodoDone = (e, id) => {
    if(e.target.checked !== undefined){
      this.updateTodo({done: e.target.checked}, id)
    }
  }

  updateTodo = (todoObject, id) => {
    const todoBody = { todo: todoObject}
    this.props.updateTodo(id, todoBody)
  }

  updateTodoTitle = (newTitle, id) => {
    const todoBody = { 
      todo: { 
        title: newTitle,
      }
    }
    this.props.updateTodo(id, todoBody)
  }

  deleteTodo = (id) => {
    this.props.deleteTodo(id);
  }

  handleClose = () => {
    this.setState({
      timeModal: false
    });
  };

  handleSave = (id) => {
    this.setState({
      timeModal: false
    }, () => {
      let updateBody = {};
      if(moment.isMoment(this.state.selectedDate)){
        updateBody.due_date = this.state.selectedDate.format()
        this.updateTodo(updateBody, id)
      }
    });
  }

  onTodoClick = () => {
    this.setState({
      editable: true,
      newTitle: this.props.todo.title
    })
  }

  handleClickAway = () => {
    this.setState({
      editable: false
    }, () => {
      this.updateTodoTitle(this.state.newTitle, this.props.todo.id)
    })
  }

  onEnter = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
        this.handleClickAway()
    }  
  }

  render() {
    const { todo } = this.props;
    const { selectedDate } = this.state;

    return (
        <ListItem>
          <Dialog
            onClose={this.handleClose}
            open={this.state.timeModal}>
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              Choose a Date for the Todo
            </DialogTitle>
            <DialogContent>
              <MuiPickersUtilsProvider utils={MomentUtils}>

                <Grid container justify="space-between" >
                  {/* <Grid item sm={6}> */}
                    <DatePicker
                      margin="normal"
                      disablePast={true}
                      label="Date picker"
                      value={selectedDate}
                      clearable={true}
                      onChange={this.handleDateChange}/>
                  {/* </Grid> */}
                  {/* <Grid item sm={6}>
                    <TimePicker
                      margin="normal"
                      disabled={this.state.selectedDate === null}
                      clearable={true}
                      helperText="(optional)"
                      label="Time picker"
                      value={selectedTime}
                      onChange={this.handleTimeChange}/>
                  </Grid> */}
                </Grid>

              </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={() => this.handleSave(todo.id)} color="primary">
                Save changes
              </Button>
            </DialogActions>
          </Dialog>
        
          <Checkbox
              checked={todo.done}
              tabIndex={-1}
              onClick={(e) => this.updateTodoDone(e, todo.id)}
              disableRipple />
          {this.state.editable ? (
            <ClickAwayListener onClickAway={this.handleClickAway}>
              {/* <ListItem> */}
                <TextField
                  label="Update Todo"
                  // className={classes.textField}
                  onKeyPress={this.onEnter}
                  margin="dense"
                  value={this.state.newTitle}
                  onChange={(e) => this.setState({newTitle: e.target.value})}/>
              {/* </ListItem> */}
            </ClickAwayListener>
          ):(
            <ListItemText
                className={todo.done ? 'checkedTodo' : ''}
                onClick={this.onTodoClick}
                primary={todo.title}
                secondary={this.props.showDate ? readableDate(todo.due_date) : null} />
          )}
          <ListItemSecondaryAction>
              <Tooltip title="Change Time" placement="right-start">
                <IconButton onClick={() => this.setState({timeModal: true})} aria-label="Add Time">
                  <AccessTimeIcon />
                </IconButton>                
              </Tooltip>

              <IconButton onClick={() => this.deleteTodo(todo.id)} aria-label="Delete">
                  <DeleteIcon />
              </IconButton>

          </ListItemSecondaryAction>
        </ListItem>
    );
  }
}


export default connect(null, {updateTodo, deleteTodo})(TodoItem);