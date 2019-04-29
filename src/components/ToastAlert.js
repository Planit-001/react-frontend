import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class ToastAlert extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            open: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.sprayMsg = this.sprayMsg.bind(this);
    }

  componentDidMount(){

    //   document.addEventListener('showToast', this.handleClick);
    //   document.addEventListener('hideToast', this.handleClose);
      document.addEventListener('showToast', this.sprayMsg);
  }

  componentWillUnmount(){
    document.removeEventListener('showToast', this.handleClick);
    document.removeEventListener('hideToast', this.handleClose);
  }


  sprayMsg(){
      console.log('Event listener');
  }

  handleClick = () => {
      console.log('event')
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    console.log('event close')
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

ToastAlert.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToastAlert);
