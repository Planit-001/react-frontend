import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import CreateTodo from './../components/CreateTodo';
import TodoList from './../components/TodoList';

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
        <Typography variant="h4" gutterBottom component="h2">
            Your Todos
        </Typography>
        <CreateTodo />
        <TodoList todos={todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo} />
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
