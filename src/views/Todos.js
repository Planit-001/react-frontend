import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../redux/actions/index";
import TodoBlock from './../components/TodoBlock';

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
    const { todos } = this.props;

    return (
      <div>
        <Typography variant="h3" gutterBottom component="h1">
          Your Todos
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start">
          <Grid item xs={5}>
            <TodoBlock 
              title="Today's Todos"
              todos={todos} />
          </Grid>
          <Grid item xs={3}>
            <TodoBlock 
              title="Tomorrow's Todos"
              todos={[]} />
          </Grid>
          <Grid item xs={3}>
            <TodoBlock 
              title="The Day After"
              todos={[]} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Todos.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { todos: state.todoReducer.todos };
};

export default connect(mapStateToProps, { getTodos, createTodo, updateTodo, deleteTodo })(withStyles(styles)(Todos));
