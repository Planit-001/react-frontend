import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { signInUser } from './../redux/actions/auth';
import { connect } from 'react-redux';

import {handleErrors, apiBase} from './../utils/apiHelpers';
import { toastEvent } from './../utils/uiFuncs';



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

class ResetPassword extends React.Component{
  state = { 
    pw1: '',
    pw2: ''
  }


  componentDidUpdate(){
    if(this.props.user){
        this.props.history.push('/');
    }
  }

  onSubmit(e){
    e.preventDefault();
    
    const { pw1, pw2 } = this.state;
    
    if(pw1.trim() !== pw2.trim()){
        toastEvent("Passwords do not match");
        return false
    }

    const body = {
      password: this.state.pw1,
    }

    fetch(`${apiBase}/api/v1/password_resets`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",        
        }
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => {
        toastEvent("Password updated!")
    });
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
            Reset Password
          </Typography>
          <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>
          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input 
                type="password" 
                onChange={(e) => this.setState({pw1: e.target.value})} 
                value={this.state.pw1} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password confirmation</InputLabel>
              <Input 
                type="password"
                onChange={(e) => this.setState({pw2: e.target.value})} 
                value={this.state.pw2} />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Submit
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

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, {signInUser} )(ResetPassword));