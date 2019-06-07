import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
// import HelpIcon from '@material-ui/icons/Help';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import _ from 'lodash';
import {pageInfo} from './../utils/pageInfo';


const btnWords = ["Cool", "OK", "Got it"]

const Transition = React.forwardRef((props, ref) => {
    return <Slide ref={ref} direction="down" {...props} />;
})

  

function PageHelper({page}){
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
                    <DialogContentText id="alert-dialog-slide-description" style={{whiteSpace: 'pre-line'}} >
                        {pageInfo[page].description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {_.sample(btnWords)}
                    </Button>
                </DialogActions>
                </Dialog>
                <Fab onClick={handleClickOpen} color="primary" size="small" aria-label="Help" >
                    <HelpOutlineIcon />
                </Fab>
            </div>
    )
}

export default PageHelper;