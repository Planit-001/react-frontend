import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import { connect } from "react-redux";
import { getTodos } from "../redux/actions/index";
import TodoBlock from './../components/TodoBlock';
import { todayNullOrBefore, tomorrowsTodos, dayAfterTodos, futureTodos } from './../utils/todoFuncs';
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
    if (this.props.todos && this.props.todos.length >=1 ){
      return
    }
    this.props.getTodos();
  }

  sameYear(date){
    return moment(date).get('year') === moment().get('year');
  }

  filterTodosToday(todos){
    return todayNullOrBefore(todos);
    // console.log('totalToday: ', totalToday);
    return todos.filter((todo, i) => {
      return todo.due_date === null || (this.sameYear(todo.due_date) && moment(todo.due_date).dayOfYear() === moment().dayOfYear())
    });
  }

  filterTodosTomorrow(todos){
    return tomorrowsTodos(todos)
    // return todos.filter((todo, i) => {
    //   return this.sameYear(todo.due_date) 
    // });
  }

  render() {
    const { todos } = this.props;

    return (
      <div>
        <Typography variant="h3" gutterBottom component="h1">
          Daily Todos
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start">
          <Grid item sm={12} md={5}>
            <TodoBlock 
              title="Today's Todos"
              todos={this.filterTodosToday(todos)} />
          </Grid>
          <Grid item sm={12} md={3}>
            <TodoBlock 
              defaultDueDate={moment().add(1, 'day')}
              title="Tomorrow's Todos"
              todos={this.filterTodosTomorrow(todos)} />
          </Grid>
          <Grid item sm={12} md={3}>
            <TodoBlock 
              defaultDueDate={moment().add(2, 'day')}
              title="The Day After"
              todos={dayAfterTodos(todos)} />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-start">
          <Grid item sm={12} md={5}>
            <TodoBlock 
              title="Future Todos"
              showDate={true}
              disableCreate={true}
              todos={futureTodos(todos)} />
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

export default connect(mapStateToProps, { getTodos })(withStyles(styles)(Todos));
