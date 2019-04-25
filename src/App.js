import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withStyles } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from "react-redux";
import blue from '@material-ui/core/colors/blue';

import CalendarFull from './components/CalendarFull';
import CalendarToast from './components/CalendarToast';
import CalendarBig from './components/CalendarBig';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './views/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PipelineBuilder from './views/PipelineBuilder';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Todos from './views/Todos'
import Typography from '@material-ui/core/Typography';

function BigCalendar() {
  return <div>
    <CalendarBig />
  </div>;
}

function FullCalendar(){
  return <div>
    <Typography variant="h2" gutterBottom component="h1">
        Your Calendar
    </Typography>
    <div className="spacer"></div>
    <div className="amazebert" style={{height: '800px', width: '800px'}}>
      <CalendarFull/>
    </div>
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
    const { classes, darkMode } = this.props;
    const { anchorEl } = this.state;

    const muiTheme = createMuiTheme({
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: {
          main: '#1565c0', // blue
        },
        secondary: {
          main: '#ec407a'
        }
      },
      typography: { useNextVariants: true },
    });

    return (
      <div className={classes.root}>
      <MuiThemeProvider theme={muiTheme}>

        <CssBaseline />
        <Router>
          <Header
            anchorEl={anchorEl}
            classes={classes}
            open={this.state.open}
            drawerOpen={this.handleDrawerOpen}
            drawerClose={this.handleDrawerClose}
            handleCalMenuClose={this.handleCalMenuClose}
            handleCalMenuClick={this.handleCalMenuClick} />
          <Sidebar 
            classes={classes} 
            open={this.state.open} 
            drawerOpen={this.handleDrawerOpen} 
            drawerClose={this.handleDrawerClose} />

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Route path="/" exact component={Dashboard} />
            <Route path="/todos/" component={Todos} />
            <Route path="/signup/" component={SignUp} />
            <Route path="/signin/" component={SignIn} />
            <Route path="/pipelines/" component={PipelineBuilder} />
            <Route path="/calendar-full/" component={FullCalendar} />
            <Route path="/calendar-toast/" component={ToastCalendar} />
            <Route path="/calendar-big/" component={BigCalendar} />
          </main>


        </Router>
      </MuiThemeProvider>
      </div>
    );
  }
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarBtn: {
    marginRight: 12
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


const mapStateToProps = state => {
  return { 
      darkMode: state.uiReducer.darkMode 
  };
};

// export default withStyles(styles)(App);
export default withStyles(styles)(connect(mapStateToProps)(App));
