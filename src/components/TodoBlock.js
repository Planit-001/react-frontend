import React from 'react';
import Typography from '@material-ui/core/Typography';

import CreateTodo from './../components/CreateTodo';
import TodoList from './../components/TodoList';

import { connect } from "react-redux";
import { updateTodo, deleteTodo } from "../redux/actions/index";

class TodoBlock extends React.Component {
  
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
    const { todos, title, disableCreate } = this.props;

    return (
      <div>
        <Typography variant="h5" align="center" gutterBottom component="h4">
            {title}
        </Typography>
        {disableCreate !== true && <CreateTodo defaultDueDate={this.props.defaultDueDate} user={this.props.user} />} 
        <TodoList showDate={this.props.showDate} sortByDate={this.props.sortByDate} todos={todos} />
      </div>
    );
  }
}

export default connect(null, {updateTodo, deleteTodo})(TodoBlock);