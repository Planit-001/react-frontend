import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { updateListItem, deleteListItem } from "../../redux/actions/list";
import { ding } from './../../utils/uiFuncs';


const ListItemEditable = React.memo(({listId, listItem, dispatch }) => {

    const [editable, setEditable] = useState(false);
    
    let [listTitle, setListTitle] = useState(listItem.title);

    const handleClickAway = () => {
        setEditable(false);
    }

    const onEnter = (e) => {
        if (e.key === 'Enter' && !(e.target.value === '')) {
           handleUpdate()
        }
    }

    const handleUpdate = () => {
        if(listItem){
            const listItemBody = {
                title: listTitle,
            };
            dispatch(updateListItem(listId, listItem.id, listItemBody)).then(() => {
                setEditable(false);
            })
        }
    }

    const onTextClick = () => {
        setListTitle(listItem.title);
        setEditable(true)
    }

    const updateListItemDone = (e) => {
        if(e.target.checked !== undefined){
            const listItemBody = {
                done: e.target.checked
            }

            dispatch(updateListItem(listId, listItem.id, listItemBody)).then(() => {
                setEditable(false);
                ding();
            })
        }
    }

    const handleDelete = () => {
        console.log('delete')
        dispatch(deleteListItem(listId, listItem.id))
    }

   return (
        <ListItem button disableRipple >
             <Checkbox
              checked={listItem.done || false}
              tabIndex={-1}
              onClick={(e) => updateListItemDone(e)}
              disableRipple />
            {editable ? (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <TextField
                        label="Add list item"
                        onKeyPress={onEnter}
                        fullWidth
                        autoFocus
                        margin="dense"
                        value={listTitle}
                        onChange={(e) => setListTitle( e.target.value )}/>
                </ClickAwayListener>
            ):(
                <ListItemText 
                    className={listItem.done ? 'checkedTodo' : ''} 
                    onClick={() => onTextClick()}
                    primary={listItem.title} />
            )}
            <ListItemSecondaryAction>
                <Tooltip title="Delete list item">
                    <IconButton onClick={handleDelete} aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>

                </Tooltip>

            </ListItemSecondaryAction>
        </ListItem>
   )
});
  
  export default connect()(ListItemEditable);