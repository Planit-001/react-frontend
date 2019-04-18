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

  getTodos() {
    axios.get('/api/v1/todos')
    .then(response => {
      this.setState({todos: response.data})
    })
    .catch(error => console.log(error))
  }

  createTodo = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
      axios.post('/api/v1/todos', {todo: {title: e.target.value}})
      .then(response => {
        const todos = update(this.state.todos, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({
          todos: todos,
          inputValue: ''
        })
      })
      .catch(error => console.log(error))      
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

    axios.put(`/api/v1/todos/${id}`, {todo: {done: e.target.checked}})
    .then(response => {
      const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
      const todos = update(this.state.todos, {
        [todoIndex]: {$set: response.data}
      })
      this.setState({
        todos: todos,
        checked: newChecked
      })
    })
    .catch(error => console.log(error))      
  }

  deleteTodo = (id) => {

    console.log('delete!');
    axios.delete(`/api/v1/todos/${id}`)
    .then(response => {
      const todoIndex = this.state.todos.findIndex(x => x.id === id)
      const todos = update(this.state.todos, {
        $splice: [[todoIndex, 1]]
      })
      this.setState({
        todos: todos
      })
    })
    .catch(error => console.log(error))
  }



  componentDidMount() {
    this.getTodos()
	}

  render() {
    const { classes } = this.props;

    return (
      <div>
          <Input
            defaultValue={this.state.inputValue}
            onChange={this.handleChange}
            onKeyPress={this.createTodo}
            placeholder="Add a task" maxLength="50"
            inputProps={{
              'aria-label': 'Description',
            }}
          />

        <List className={classes.root}>
          {this.state.todos.map(todo => (
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

export default withStyles(styles)(CheckboxList);
