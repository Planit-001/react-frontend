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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { connect } from "react-redux";
import { updateTodo, deleteTodo } from "../redux/actions/index";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class TodoItem extends React.Component {

  state = {
    timeModal: false,
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

  deleteTodo = (id) => {
    this.props.deleteTodo(id);
  }

  handleClose = () => {
    this.setState({
      timeModal: false
    });
  };

  render() {
    const { todo } = this.props;
    const { selectedDate } = this.state;

    return (
        <ListItem key={todo.id} dense>
          
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
                    onChange={this.handleDateChange}
                  />
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

          <ListItemText  
              className={todo.done ? 'checkedTodo' : ''}
              primary={todo.title} />

          <ListItemSecondaryAction>
            
              <Tooltip title="Add Time" placement="right-start">
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