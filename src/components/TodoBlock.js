import React from 'react';
import ComponentTitle from './../components/ComponentTitle';
import Typography from '@material-ui/core/Typography';
import CreateTodo from './../components/CreateTodo';
import TodoList from './../components/TodoList';

import { connect } from "react-redux";
import { updateTodo, deleteTodo } from "../redux/actions/todo";

class TodoBlock extends React.Component {
  
  updateTodo = (itemId, itemBody, shouldDing) => {
    this.props.updateTodo(itemId, itemBody, shouldDing);
  }


  deleteTodo = (id) => {
    this.props.deleteTodo(id);
  }


  render() {
    const { todos, title, subtitle, disableCreate, user } = this.props;

    return (
      <div>
        <ComponentTitle title={title} />
        {subtitle && <Typography align="center" variant="subtitle2" color="textSecondary" gutterBottom>
          {subtitle}
        </Typography>}        
        {disableCreate !== true && <CreateTodo defaultDueDate={this.props.defaultDueDate} user={user} />} 
        <TodoList 
          showDate={this.props.showDate} 
          handleUpdate={this.updateTodo}
          handleDelete={this.deleteTodo}
          sortByDate={this.props.sortByDate} 
          todos={todos} 
          user={user} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
      user: state.auth.user,
  };
};

export default connect(mapStateToProps, {updateTodo, deleteTodo})(TodoBlock);