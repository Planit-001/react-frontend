import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class TodoItem extends React.Component {

  render() {
    const { todo, deleteTodo, updateTodo } = this.props;

    return (
        <ListItem key={todo.id} 
            role={undefined} dense button 
            onClick={(e) => updateTodo(e, todo.id)}>

            <Checkbox
                checked={todo.done}
                tabIndex={-1}
                disableRipple />

            <ListItemText  
                className={todo.done ? 'checkedTodo' : ''}
                primary={todo.title} />

            <ListItemSecondaryAction>
                <IconButton onClick={() => deleteTodo(todo.id)} aria-label="Delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
  }
}

TodoItem.propTypes = {

};

export default TodoItem;
