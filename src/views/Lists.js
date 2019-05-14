import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


class Lists extends React.Component {
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
          Lists
        </Typography>
        <div className="spacer"></div>
        <Grid
          container
          direction="row"
          spacing={32}
          alignItems="flex-start">
          <Grid item sm={12} md={6} lg={4}>
            list
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <Typography variant="h5" align="center" gutterBottom component="h4">
              List Recent Archives
            </Typography>
          </Grid>
        </Grid>
        <div className="spacer"></div>
      </div>
    );
  }
}

Lists.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { todos: state.todo.todos };
};

export default connect(mapStateToProps)(Lists);
