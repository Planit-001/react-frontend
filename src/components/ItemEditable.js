import React, { useState } from 'react';

import MomentUtils from '@date-io/moment';

import { withStyles } from '@material-ui/core';
import {readableDate} from './../utils/dateFuncs';
import {beforeToday } from './../utils/todoFuncs';

import {
    MuiPickersUtilsProvider,
    DatePicker
  } from '@material-ui/pickers';

import moment from 'moment';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    root: {
      paddingRight: 45,
      wordBreak: "break-word"
    },
    input: {
        fontSize: '0.9em',
    //   width: "84%"
        paddingRight: 54
    },
    text: {
        wordBreak: "break-word"
    },
    dateInput: {
        display: 'none'
    }
  });

const ItemEditable = React.memo(({item, classes, inputLabel, handleUpdate, handleDelete, showDate, showDateSelect, defaultDueDate }) => {

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

    // const handleClose = () => {
    //     setTimeModal(false);
    //     setSelectedDate(null);
    // }

    const handleSave = (id) => {
        setTimeModal(false);
        if(moment.isMoment(selectedDate)){
          const updateBody = {
            due_date: selectedDate.format()
          };
          onUpdate(updateBody)
        }
      }

    return (
        <ListItem 
            button 
            disableRipple >
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    open={timeModal}
                    onOpen={() => setTimeModal(true)}
                    onClose={() => setTimeModal(false)}
                    label="Date picker"
                    disablePast={true}
                    initialFocusedDate={ (item.due_date && !beforeToday(item.due_date)) ? item.due_date : null}
                    variant="dialog"
                    okLabel="Save"
                    onAccept={() => handleSave(item.id)}
                    value={selectedDate}
                    classes={{
                        root: classes.dateInput
                    }}
                    onChange={(date) => setSelectedDate(date)}
                />
            </MuiPickersUtilsProvider>
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
                        primary={item.title}
                        classes={{
                            root: showDateSelect ? classes.root : classes.text
                        }} />
                )}

                <ListItemSecondaryAction>
                    {showDateSelect && <Tooltip title="Change Time" placement="right-start">
                        <IconButton onClick={() => setTimeModal(true)} aria-label="Add Time">
                            <AccessTimeIcon />
                        </IconButton>                
                    </Tooltip>}
                    <Tooltip title="Delete item" placement="right-start">
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
        </ListItem>
    )

});

export default withStyles(styles)(ItemEditable);