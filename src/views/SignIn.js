import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { signInUser } from './../redux/actions/auth';
import { connect } from 'react-redux';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

class SignIn extends React.Component{
  state = { 
    redirectToReferrer: false,
    email: '',
    password: '',
    checked: false,
    error: true
  }


  componentDidUpdate(){
    if(this.props.user){
      console.log("pushing");
      if(this.props.location && this.props.location.state && this.props.location.state.from && this.props.location.state.from.pathname){
        this.props.history.push(this.props.location.state.from.pathname);
      }else{
        this.props.history.push('/');
      }
    }
  }

  onSubmit(e){
    e.preventDefault();
    const body = {
      email: this.state.email,
      password: this.state.password,
      remember_me: this.state.checked
    }
    // this.props.history.push("/");
    this.props.signInUser(body) //.then(() => console.log())
  }


  render(){
    const { classes } = this.props;
  
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input 
                id="email" 
                name="email" 
                autoComplete="email" 
                onChange={(e) => this.setState({email: e.target.value})} 
                value={this.state.email}
                autoFocus  />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input 
                name="password" 
                type="password" 
                id="password" 
                onChange={(e) => this.setState({password: e.target.value})} 
                value={this.state.password}
                autoComplete="current-password" />
            </FormControl>
            <FormControlLabel
              control={<Checkbox 
                checked={this.state.checked} 
                color="primary"
                onClick={(e) => e.target.checked !== undefined ? this.setState({checked: e.target.checked}) : null} />}
              label="Remember me"/>
            <Link to="/forgot_password">
              Forgot Password?
            </Link>
              
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}


const mapStateToProps = state => {
  return { 
      user: state.auth.user,
  };
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, {signInUser} )(SignIn));