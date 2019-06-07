import React, { useState } from 'react';

import { withStyles } from '@material-ui/core';
import {readableDate} from './../utils/dateFuncs';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
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

const ItemEditable = React.memo(({item, classes, inputLabel, handleUpdate, handleDelete, showDate }) => {

    const [editable, setEditable] = useState(false);
    
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

    return (
        <ListItem 
            button 
            disableRipple >

            <Checkbox 
                checked={item.done || false}
                tabIndex={-1}
                disableRipple
                onClick={(e) => e.target.checked !== undefined ? onUpdate({done: e.target.checked}, e.target.checked) : null} />

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