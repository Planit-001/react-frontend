import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux";
import { getTodos } from "../redux/actions/index";
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
    if (this.props.todos && this.props.todos.length >=1 ){
      return
    }
    this.props.getTodos();
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
              todos={todos} />
          </Grid>
          <Grid item sm={12} md={3}>
            <TodoBlock 
              title="Tomorrow's Todos"
              todos={[]} />
          </Grid>
          <Grid item sm={12} md={3}>
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

export default connect(mapStateToProps, { getTodos })(withStyles(styles)(Todos));
