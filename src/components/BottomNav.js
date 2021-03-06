import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { Link, withRouter } from "react-router-dom";

import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Spacer from './Spacer'
import Hidden from '@material-ui/core/Hidden';

const styles = {
  root: {
    // width: 500,
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0
  },
};

class BottomNav extends React.Component {
  state = {
    value: 'dashboard',
  };

  componentDidMount(){
    const {location} = this.props;
    const _location = location.pathname.replace('/','');
    if(_location){
      this.setState({
        value: _location
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <Hidden smUp>
            <Spacer height={30} />
            <BottomNavigation value={value} onChange={this.handleChange} className={classes.stickToBottom}>
                <BottomNavigationAction component={Link} to="/" label="Dashboard" value="dashboard" icon={<DashboardIcon />} />
                <BottomNavigationAction component={Link} to="/todos" label="To-do's" value="todos"  icon={<FormatListBulletedIcon />} />
                <BottomNavigationAction component={Link} to="/lists" label="Lists" value="lists" icon={<ListAltIcon />} />
                <BottomNavigationAction component={Link} to="/calendar" label="Calendar" value="calendar" icon={<DateRangeIcon />} />
            </BottomNavigation>
        </Hidden>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(BottomNav));
