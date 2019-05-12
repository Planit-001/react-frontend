import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import moment from 'moment';
import { getTodos, getArchived } from "../redux/actions/todo";
import { todayNullOrBefore, tomorrowsTodos, dayAfterTodos, futureTodos } from './../utils/todoFuncs';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TodoBlock from './../components/TodoBlock';
import RecentArchived from './../components/todo/RecentArchived';

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
    // if (this.props.todos && this.props.todos.length >=1 ){
    //   return
    // }
    this.props.getTodos();
    this.props.getArchived();
  }

  sameYear(date){
    return moment(date).get('year') === moment().get('year');
  }

  filterTodosToday(todos){
    return todayNullOrBefore(todos);
  }

  filterTodosTomorrow(todos){
    return tomorrowsTodos(todos)
  }

  render() {
    const { todos, todosArchived } = this.props;

    return (
      <div>
        <Typography variant="h3" gutterBottom component="h1">
          Daily To-do's
        </Typography>
        <div className="spacer"></div>
        <Grid
          container
          direction="row"
          spacing={32}
          alignItems="flex-start">
          <Grid item sm={12} md={6} lg={4}>
            <TodoBlock 
              title="Today's To-do's"
              todos={this.filterTodosToday(todos)} />
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <TodoBlock 
              defaultDueDate={moment().add(1, 'day')}
              title="Tomorrow's To-do's"
              todos={this.filterTodosTomorrow(todos)} />
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <TodoBlock 
              defaultDueDate={moment().add(2, 'day')}
              title="The Day After"
              todos={dayAfterTodos(todos)} />
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <TodoBlock 
              sortByDate={true}
              title="Future To-do's"
              showDate={true}
              disableCreate={true}
              todos={futureTodos(todos)} />
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <Typography variant="h5" align="center" gutterBottom component="h4">
              To-do Recent Archives
            </Typography>
            <RecentArchived todos={todosArchived} />
          </Grid>
        </Grid>
        <div className="spacer"></div>
      </div>
    );
  }
}

Todos.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { 
    todos: state.todo.todos,
    todosArchived: state.todo.todosArchived.items
  };
};

export default connect(mapStateToProps, { getTodos, getArchived })(withStyles(styles)(Todos));
