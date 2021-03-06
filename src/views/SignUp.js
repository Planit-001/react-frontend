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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { createUser } from './../redux/actions/auth';
import { connect } from 'react-redux';

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

class SignUp extends React.Component{
  state = { 
    email: '',
    password: '',
    checked: false,
    error: true,
    btnDisabled: false
  }

  componentDidUpdate(){
    if(this.props.user){
      this.props.history.push('/');
    }
  }

  onSubmit(e){
    e.preventDefault();
    const body = {
      email: this.state.email,
      password: this.state.password
    }
    this.setState({
      btnDisabled: true
    }, () => {
      toastEvent("Creating user...");
      this.props.createUser(body);
    })
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
            Sign up
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
            <Button
              type="submit"
              disabled={this.state.btnDisabled}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Sign up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { 
      user: state.auth.user,
  };
};


export default withStyles(styles)(connect(mapStateToProps, {createUser})(SignUp));