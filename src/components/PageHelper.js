import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import HelpIcon from '@material-ui/icons/Help';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import {pageInfo} from './../utils/pageInfo';

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

  

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

function PageHelper({page, classes}){
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };
    
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">
                    {pageInfo[page].title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {pageInfo[page].description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cool
                    </Button>
                </DialogActions>
                </Dialog>
                <Fab onClick={handleClickOpen} color="primary" size="small" aria-label="Help" >
                    {/* <HelpIcon /> */}
                    <HelpOutlineIcon />
                </Fab>
            </div>
    )
}

export default withStyles(styles)(PageHelper);