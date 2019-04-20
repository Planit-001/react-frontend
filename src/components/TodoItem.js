import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from "react-redux";
import { updateTodo, deleteTodo } from "../redux/actions/index";

class TodoItem extends React.Component {

    updateTodo = (e, id) => {
        if(e.target.checked !== undefined){
          const todoBody = {todo: {done: e.target.checked}};
          this.props.updateTodo(id, todoBody);
        }
      }
    
      deleteTodo = (id) => {
        this.props.deleteTodo(id);
      }

  render() {
    const { todo } = this.props;

    return (
        <ListItem key={todo.id} dense>
        
            <Checkbox
                checked={todo.done}
                tabIndex={-1}
                onClick={(e) => this.updateTodo(e, todo.id)}
                disableRipple />

            <ListItemText  
                className={todo.done ? 'checkedTodo' : ''}
                primary={todo.title} />

            <ListItemSecondaryAction>
                <IconButton onClick={() => this.deleteTodo(todo.id)} aria-label="Delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
  }
}


export default connect(null, {updateTodo, deleteTodo})(TodoItem);