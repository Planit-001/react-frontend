import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CalendarFull from './components/CalendarFull';
import CalendarToast from './components/CalendarToast';
import CalendarBig from './components/CalendarBig';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import Dashboard from './views/Dashboard';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Todos from './views/Todos'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '100%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});


function BigCalendar() {
  return <div>
    <CalendarBig />
  </div>;
}

function FullCalendar(){
  return <div className="amazebert" style={{height: '800px', width: '800px'}}>
    <CalendarFull/>
  </div>
}


function ToastCalendar(){
  return <div className="amazebert" style={{height: '800px'}}>
    <CalendarToast/>
  </div>
}


class App extends Component {
  state = {
    open: false,
    anchorEl: null
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleCalMenuClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleCalMenuClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Router>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
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
              <Button component={Link} to="/" color="inherit">Dashboard</Button>
              <Button component={Link} to="/todos/" color="inherit">Todos</Button>
              <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                color="inherit"
                onClick={this.handleCalMenuClick}>
                Calendars
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleCalMenuClose}>
                <MenuItem component={Link} to="/calendar-full" onClick={this.handleCalMenuClose}>Full Calendar</MenuItem>
                <MenuItem component={Link} onClick={this.handleCalMenuClose} to="/calendar-toast">Toast Calendar</MenuItem>
                <MenuItem component={Link} onClick={this.handleCalMenuClose} to="/calendar-big">Big Calendar</MenuItem>
              </Menu>
              <Button component={Link} to="/signin/" color="inherit" variant="outlined">
                Sign In
              </Button>
              <Button component={Link} to="/signup/" color="inherit" variant="outlined">
                Sign Up
              </Button>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}>

            <div className={classes.toolbarIcon}>
              <span style={{fontStyle: 'italic'}}>Explore!</span>
              <IconButton onClick={this.handleDrawerClose}>
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
            </List>

          </Drawer>
          
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Route path="/" exact component={Dashboard} />
            <Route path="/todos/" component={Todos} />
            <Route path="/signup/" component={SignUp} />
            <Route path="/signin/" component={SignIn} />
            <Route path="/calendar-full/" component={FullCalendar} />
            <Route path="/calendar-toast/" component={ToastCalendar} />
            <Route path="/calendar-big/" component={BigCalendar} />
          </main>


        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App);
