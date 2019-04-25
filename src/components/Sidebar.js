import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import '../App.scss';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import DateRangeIcon from '@material-ui/icons/DateRange';

import ViewWeekIcon from '@material-ui/icons/ViewWeek';

class Sidebar extends Component {
 
  render() {
    const { classes, drawerClose, open } = this.props;
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}>

            <div className={classes.toolbarIcon}>
                <span style={{fontStyle: 'italic'}}>Explore!</span>
                <IconButton onClick={drawerClose}>
                <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>  
                <ListItem component={Link} to="/todos/" button={true} >
                    <ListItemIcon>
                        <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Todos" />
                </ListItem>
                <ListItem button={true} >
                    <ListItemIcon>
                        <DateRangeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Calendar" />
                </ListItem>
                <ListItem component={Link} to="/pipelines/" button={true} >
                    <ListItemIcon>
                        <ViewWeekIcon />
                    </ListItemIcon>
                    <ListItemText primary="Pipelines" />
                </ListItem>
            </List>
        </Drawer>
    );
  }
}


export default Sidebar;
