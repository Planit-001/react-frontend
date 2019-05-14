import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';


class Calendar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    };
  }

  componentDidMount(){
  }


  render() {

    return (
      <div>
        <Typography variant="h3" gutterBottom component="h1">
          Calendar
        </Typography>
        
        <div className="spacer"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
      todos: state.todo.todos 
    };
};

export default connect(mapStateToProps)(Calendar);
