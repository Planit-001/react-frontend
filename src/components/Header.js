import React, { Component } from 'react';
import '../App.scss';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
// import Brightness4Icon from '@material-ui/icons/Brightness4';
// import Brightness7Icon from '@material-ui/icons/Brightness7';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

class Header extends Component {

  render() {
    const { 
      classes, 
      open, 
      drawerOpen, 
      auth,
      darkMode,
      changeDarkMode
    } = this.props;
    
    return (
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, open && classes.appBarShift)}>
          <Toolbar disableGutters={!open} className={classes.toolbar}>
            <Hidden only="xs" >
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

            </Hidden>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              Simple Planner
            </Typography>
            <Tooltip title={ darkMode ? "Switch to day mode" : "Switch to dark mode"}>
              <IconButton
                  onClick={() => changeDarkMode(!darkMode)}
                  color="inherit">
                  {darkMode ? <WbSunnyIcon /> : <Brightness3Icon /> }
                  {/* {darkMode ? <Brightness4Icon /> : <Brightness7Icon /> } */}
              </IconButton>
            </Tooltip>
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
