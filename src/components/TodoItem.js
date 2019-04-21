import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Tooltip from '@material-ui/core/Tooltip';
import MomentUtils from '@date-io/moment';

import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { updateTodo, deleteTodo } from "../redux/actions/index";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class TodoItem extends React.Component {

  state = {
    timeModal: false,
    editable: false,
    newTitle: '',
    selectedDate: new Date(),
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  updateTodo = (e, id) => {
    if(e.target.checked !== undefined){
      const todoBody = {todo: {done: e.target.checked}};
      this.props.updateTodo(id, todoBody);
    }
  }

  updateTodoTitle = (newTitle, id) => {
    const todoBody = { todo: {title: newTitle}}
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
            aria-labelledby="customized-dialog-title"
            open={this.state.timeModal}>
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              Modal title
            </DialogTitle>
            <DialogContent>
              <MuiPickersUtilsProvider utils={MomentUtils}>

                <Grid container justify="space-around">
                  <DatePicker
                    margin="normal"
                    label="Date picker"
                    value={selectedDate}
                    onChange={this.handleDateChange}/>
                    
                  <TimePicker
                    margin="normal"
                    label="Time picker"
                    value={selectedDate}
                    onChange={this.handleDateChange}/>
                </Grid>

              </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Save changes
              </Button>
            </DialogActions>
          </Dialog>
        
          <Checkbox
              checked={todo.done}
              tabIndex={-1}
              onClick={(e) => this.updateTodo(e, todo.id)}
              disableRipple />
          {this.state.editable ? (
            <ClickAwayListener onClickAway={this.handleClickAway}>
              <TextField
                label="Update Todo"
                // className={classes.textField}
                onKeyPress={this.onEnter}
                margin="dense"
                value={this.state.newTitle}
                onChange={(e) => this.setState({newTitle: e.target.value})}/>
            </ClickAwayListener>
          ):(
            <ListItemText
                className={todo.done ? 'checkedTodo' : ''}
                onClick={this.onTodoClick}
                primary={todo.title} />
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