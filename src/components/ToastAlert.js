import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
});

class ToastAlert extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            open: false,
            toastMsg: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

  componentDidMount(){
      window.addEventListener('hideToast', this.handleClose);
      window.addEventListener('showToast', this.handleClick);
  }

  componentWillUnmount(){
    window.removeEventListener('showToast', this.handleClick);
    window.removeEventListener('hideToast', this.handleClose);
  }


  handleClick = (e) => {
    this.setState({ 
        open: true,
        toastMsg: e.detail
    });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
        open: false,
        toastMsg: '',
    });
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
          message={<span id="message-id">{this.state.toastMsg}</span>}
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
