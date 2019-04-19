import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';

import { connect } from "react-redux";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../redux/actions/index";


import axios from 'axios'
import update from 'immutability-helper'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [],
      inputValue: '',
      checked: [0],
    };
  }

  componentDidMount(){
    this.props.getTodos();
  }

  createTodo = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
      const body = {todo: {title: e.target.value}}
      this.props.createTodo(body);
      this.setState({inputValue: ''});
    }    
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  updateTodo = (e, id) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(e);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(e);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    const todoBody = {todo: {done: e.target.checked}};
    this.props.updateTodo(id, todoBody);
    this.setState({checked: newChecked});

  }

  deleteTodo = (id) => {
    this.props.deleteTodo(id);
  }

  sortTodos = (todos) => {
    if (todos.length >= 1){
      return todos.sort((a, b) => (a.id < b.id) ? 1 : -1)
    }else{
      return todos
    }
  }


  render() {
    const { classes, todos } = this.props;

    return (
      <div>
          <Input
            value={this.state.inputValue}
            onChange={this.handleChange}
            onKeyPress={this.createTodo}
            placeholder="Add a task" maxLength="50"
            inputProps={{
              'aria-label': 'Description',
            }}
          />

        <List className={classes.root}>
          {todos && todos.length >= 1 && this.sortTodos(todos).map(todo => (
            <ListItem key={todo.id} 
              role={undefined} dense button 
              onClick={(e) => this.updateTodo(e, todo.id)}>
              <Checkbox
                checked={todo.done}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText  
                className={todo.done ? 'checkedTodo' : ''}
                primary={todo.title} />

              <ListItemSecondaryAction>
                <IconButton onClick={() => this.deleteTodo(todo.id)} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { todos: state.todos };
};

export default connect(mapStateToProps, { getTodos, createTodo, updateTodo, deleteTodo })(withStyles(styles)(CheckboxList));
