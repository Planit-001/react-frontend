import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { Link } from "react-router-dom";

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
};

class BottomNav extends React.Component {
  state = {
    value: 'dashboard',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <Hidden smUp>
            <Spacer height={30} />
            <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
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

export default withStyles(styles)(BottomNav);
