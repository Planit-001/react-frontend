import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { updateListItem } from "../../redux/actions/list";


const ListItemEditable = React.memo(({listId, listItem, dispatch }) => {
    const [editable, setEditable] = useState(false);
    const [listTitle, setListTitle] = useState(listItem.title);
  
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


   return (
        <ListItem button disableRipple onClick={() => setEditable(true)}>
            {editable ? (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <TextField
                        label="Add list item"
                        onKeyPress={onEnter}
                        fullWidth
                        autoFocus
                        // style={{width: '100%', paddingRight: 50}}
                        margin="dense"
                        value={listTitle}
                        onChange={(e) => setListTitle( e.target.value )}/>
                    
                </ClickAwayListener>
            ):(
                <ListItemText primary={listItem.title} />
            )}
        </ListItem>
   )
  });
  
  export default connect()(ListItemEditable);