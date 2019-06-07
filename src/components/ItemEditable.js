import React, { useState } from 'react';

import MomentUtils from '@date-io/moment';

import { withStyles } from '@material-ui/core';
import {readableDate} from './../utils/dateFuncs';
// import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

import moment from 'moment';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    root: {
      paddingRight: '50px',
      wordBreak: "break-word"
    },
    input: {
      fontSize: '0.9em',
      width: "84%"
    }
  });

const ItemEditable = React.memo(({item, classes, inputLabel, handleUpdate, handleDelete, showDate, showDateSelect }) => {

    const [editable, setEditable] = useState(false);
    const [timeModal, setTimeModal] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    let [itemTitle, setItemTitle] = useState(item.title);


    const handleKeyDown = (e) => {
        if(e.key === "Escape"){
            setEditable(false)
        }
    }

    const onTextClick = () => {
        setItemTitle(item.title);
        setEditable(true)
    }

    const onEnter = (e) => {
        if (e.key === 'Enter' && !(e.target.value === '')) {
            const itemBody = {
                title: itemTitle,
            };
           onUpdate(itemBody)
        }
    }

    const onUpdate = (itemBody, shouldDing = false) => {
        if(item){
            // ItemBody needs to be an object
            handleUpdate(item.id, itemBody, shouldDing)
            setEditable(false);
        }
    }

    const handleClickAway = () => {
        if(itemTitle.trim() !== item.title ) {
            onUpdate({title: itemTitle})
        }
        setEditable(false)   
    }

    const handleClose = () => {
        setTimeModal(false);
        setSelectedDate(null);
    }

    const handleSave = (id) => {
        setTimeModal(false);
        if(moment.isMoment(selectedDate)){
          const updateBody = {
            due_date: selectedDate.format()
          };
          onUpdate(updateBody)
        }
      }

    const renderDialogue = (item) => {
    
        return (
            <Dialog
              onClose={() => setTimeModal(false)}
              open={timeModal}>
              <DialogTitle onClose={() => setTimeModal(false)}>
                Choose a Date for the Todo
              </DialogTitle>
              <DialogContent>
                <MuiPickersUtilsProvider utils={MomentUtils}>
    
                {/* <KeyboardDatePicker
                    margin="normal"
                    id="mui-pickers-date"
                    label="Date picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    /> */}
                <KeyboardDatePicker
                    margin="normal"
                    disablePast={true}
                    label="Date picker"
                    value={selectedDate}
                    clearable={true}
                    variant="inline"
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    onChange={(date) => setSelectedDate(date)}/>
    
                </MuiPickersUtilsProvider>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={() => handleSave(item.id)} color="primary">
                  Save changes
                </Button>
              </DialogActions>
          </Dialog>
        )
      }

    return (
        <ListItem 
            button 
            disableRipple >
            {renderDialogue(item)}
            <ListItemIcon>
                <Checkbox 
                    checked={item.done || false}
                    tabIndex={-1}
                    disableRipple
                    onClick={(e) => e.target.checked !== undefined ? onUpdate({done: e.target.checked}, e.target.checked) : null} />
            </ListItemIcon>

                {editable ? (
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <TextField 
                            label={inputLabel}
                            onKeyPress={onEnter}
                            onKeyDown={handleKeyDown}
                            fullWidth
                            autoFocus
                            InputProps={{
                                classes: {
                                    input: classes.input
                                }
                            }}
                            margin="dense"
                            value={itemTitle}
                            onChange={(e) => setItemTitle(e.target.value)} />

                    </ClickAwayListener>
                ) : (
                    <ListItemText 
                        className={item.done ? 'checkedTodo' : ''}
                        onClick={() => onTextClick()}
                        secondary={showDate ? readableDate(item.due_date) : null}
                        primary={item.title} />
                )}

                <ListItemSecondaryAction>
                    {showDateSelect && <Tooltip title="Change Time" placement="right-start">
                        <IconButton onClick={() => setTimeModal(true)} aria-label="Add Time">
                            <AccessTimeIcon />
                        </IconButton>                
                    </Tooltip>}
                    <Tooltip title="Delete item" >
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
        </ListItem>
    )

});

export default withStyles(styles)(ItemEditable);