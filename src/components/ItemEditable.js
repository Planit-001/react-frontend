import React, { useState } from 'react';

import { withStyles } from '@material-ui/core';

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
    input: {
        fontSize: '0.9em'
    }
});

const ItemEditable = React.memo(({item, classes, inputLabel, handleUpdate, handleDelete }) => {

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

    const onUpdate = (itemBody) => {
        if(item){
            // ItemBody needs to be an object
            handleUpdate(item.id, itemBody)
            setEditable(false);
        }
    }

    const handleClickAway = () => {
        if(itemTitle.trim() !== item.title ) {
            onUpdate({title: itemTitle})
        }
        setEditable(false)
        
        // this.setState({
        //   editable: false
        // }, () => {
        //   this.updateTodoTitle(this.state.newTitle, this.props.todo.id)
        // })
      }

    return (
        <ListItem 
            button 
            disableRipple >

            <Checkbox 
                checked={item.done || false}
                tabIndex={-1}
                disableRipple
                onClick={(e) => e.target.checked !== undefined ? onUpdate({done: e.target.checked}) : null} />

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