import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames';
import '../App.scss';


import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';

import ListAltIcon from '@material-ui/icons/ListAlt';
import Hidden from '@material-ui/core/Hidden';


import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';

class Sidebar extends Component {
 
  render() {
    const { classes, drawerClose, open, devMode } = this.props;
    return (
        <Hidden only="xs">

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
                        <Tooltip title="Dashboard" disableHoverListener={open} placement="right-start">
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Dashboard" />
                    </ListItem>  
                    <ListItem component={Link} to="/todos/" button={true} >
                        <Tooltip title="Todos" disableHoverListener={open} placement="right-start">
                            <ListItemIcon>
                                <FormatListBulletedIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Todos" />
                    </ListItem>
                    <ListItem component={Link} to="/lists/" button={true} >
                        <Tooltip title="Lists" disableHoverListener={open} placement="right-start">
                            <ListItemIcon>
                                <ListAltIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Lists" />
                    </ListItem>
                    <ListItem component={Link} to="/calendar" button={true}>
                        <Tooltip title="Calendar" disableHoverListener={open} placement="right-start">
                            <ListItemIcon>
                                <DateRangeIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Calendar" />
                    </ListItem>
                    {devMode && <ListItem component={Link} to="/pipelines/" button={true} >
                        <Tooltip title="Pipelines" disableHoverListener={open} placement="right-start">
                            <ListItemIcon>
                                <ViewWeekIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Pipelines" />
                    </ListItem>}
                </List>
            </Drawer>
        </Hidden>
    );
  }
}


export default Sidebar;
