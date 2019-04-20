import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Input from '@material-ui/core/Input';

import TodoItem from './../components/TodoItem';

import { connect } from "react-redux";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../redux/actions/index";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class Todos extends React.Component {
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

  updateTodo = (e, id) => {
    if(e.target.checked !== undefined){
      const todoBody = {todo: {done: e.target.checked}};
      this.props.updateTodo(id, todoBody);
    }
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
          {todos && todos.length >= 1 && this.sortTodos(todos).map((todo, index) => (

            <TodoItem 
              key={`todo-${index}`}
              todo={todo}
              deleteTodo={this.deleteTodo}
              updateTodo={this.updateTodo}/>

          ))}
        </List>
      </div>
    );
  }
}

Todos.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { todos: state.todos };
};

export default connect(mapStateToProps, { getTodos, createTodo, updateTodo, deleteTodo })(withStyles(styles)(Todos));
