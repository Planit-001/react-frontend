import React, { Component } from 'react';
import '../App.scss';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends Component {

  render() {
    const { 
      classes, 
      open, 
      drawerOpen, 
      anchorEl, 
      handleCalMenuClick, 
      handleCalMenuClose,
      auth
    } = this.props;
    
    return (
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, open && classes.appBarShift)}>
          <Toolbar disableGutters={!open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={drawerOpen}
              className={classNames(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              Small Business
            </Typography>
            <Button
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              color="inherit"
              onClick={handleCalMenuClick}>
              Calendars
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCalMenuClose}>
              <MenuItem component={Link} to="/calendar-full" onClick={handleCalMenuClose}>Full Calendar</MenuItem>
              <MenuItem component={Link} onClick={handleCalMenuClose} to="/calendar-toast">Toast Calendar</MenuItem>
              <MenuItem component={Link} onClick={handleCalMenuClose} to="/calendar-big">Big Calendar</MenuItem>
            </Menu>
            {!auth && <Button className={classes.toolbarBtn} component={Link} to="/signin/" color="inherit" variant="outlined">
              Sign In
            </Button>}
            {!auth && <Button component={Link} to="/signup/" color="inherit" variant="outlined">
              Sign Up
            </Button>}
            {auth && <Button onClick={this.props.logout} color="inherit" variant="outlined">
              Sign Out
            </Button>}
          </Toolbar>
        </AppBar>
    );
  }
}


export default Header;
