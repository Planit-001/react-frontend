import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import { withStyles } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { devMode } from './utils/constants';

import blue from '@material-ui/core/colors/blue';
// import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

import Calendar from './views/Calendar';
import CalendarFull from './components/CalendarFull';
import CalendarToast from './components/CalendarToast';
import CalendarBig from './components/CalendarBig';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './views/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// import PipelineBuilder from './views/PipelineBuilder';
import Pipeline from './views/Pipeline';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ToastAlert from './components/ToastAlert';
import Todos from './views/Todos'
import Typography from '@material-ui/core/Typography';
import { logoutUser} from './redux/actions/auth';
import { changeDarkMode } from "./redux/actions/ui";


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

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
  <Route {...rest} render={(props) => (
    auth === true ? <Component {...props} /> : <Redirect to={{
      pathname: '/signin',
      state: {from: props.location}
    }} />
  )} />
);




class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      anchorEl: null,
      devMode: false
    }
    this.logout = this.logout.bind(this);
  }

  logout(){
    this.props.logoutUser();
  }

  isAuthenticated(){
    return !!this.props.user && !!this.props.token;
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
    const { classes, darkMode, changeDarkMode } = this.props;
    const isAuthenticated =  this.isAuthenticated();
    const { anchorEl } = this.state;

    const muiTheme = createMuiTheme({
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: blue, 
        secondary: pink,
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
      },
      typography: { useNextVariants: true },
    });

    return (
      <MuiThemeProvider theme={muiTheme}>
      <div className={classes.root}>

        <CssBaseline />
        <Router>
          <Header
            darkMode={darkMode}
            changeDarkMode={changeDarkMode}
            anchorEl={anchorEl}
            classes={classes}
            open={this.state.open}
            auth={isAuthenticated}
            logout={this.logout}
            drawerOpen={this.handleDrawerOpen}
            drawerClose={this.handleDrawerClose}
            handleCalMenuClose={this.handleCalMenuClose}
            handleCalMenuClick={this.handleCalMenuClick} />
          <Sidebar 
            classes={classes}
            devMode={devMode}
            open={this.state.open} 
            drawerOpen={this.handleDrawerOpen} 
            drawerClose={this.handleDrawerClose} />

          <main className={classes.content}>
            <ToastAlert />
            <div className={classes.appBarSpacer} />
            <PrivateRoute path="/" exact component={Dashboard} auth={isAuthenticated} />
            <PrivateRoute path="/todos" component={Todos} auth={isAuthenticated} />
            <Route path="/signup/" component={SignUp} />
            <Route path="/signin/" component={SignIn} />
            {devMode && <Route path="/pipelines/" component={Pipeline} />}
            <PrivateRoute path="/calendar/" component={Calendar} auth={isAuthenticated}/>
            <Route path="/calendar-full/" component={FullCalendar} />
            <Route path="/calendar-toast/" component={ToastCalendar} />
            <Route path="/calendar-big/" component={BigCalendar} />
          </main>


        </Router>
      </div>
      </MuiThemeProvider>
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
      darkMode: state.ui.darkMode,
      user: state.auth.user,
      token: state.auth.token
  };
};

export default withStyles(styles)(connect(mapStateToProps, {logoutUser, changeDarkMode })(App));