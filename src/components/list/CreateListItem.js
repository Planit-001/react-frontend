import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { createListItem } from "./../../redux/actions/list";


const CreateListItem = React.memo(({listId, dispatch }) => {
    const [createable, setCreatable] = useState(false);
    const [listItem, setListItem] = useState('');
  
    const handleClickAway = () => {
        setCreatable(false);
    }

    const onEnter = (e) => {
        if (e.key === 'Enter' && !(e.target.value === '')) {
           handleCreate()
        }
    }

    const handleCreate = () => {
        if(listItem){
            const listItemBody = {
                title: listItem,
            };

            dispatch(createListItem(listId, listItemBody)).then(() => {
                setListItem('');
                setCreatable(false);
            })
        }
    }


   return (
        <ListItem 
            style={{marginBottom: 15, padding: 10}} 
            button 
            disableRipple 
            onClick={() => setCreatable(true)}>
            <ListItemIcon style={{marginLeft: 20}}>
                <AddCircleOutlineIcon />
            </ListItemIcon>

            {createable ? (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div style={{width: '90%'}}>
                        <TextField
                            label="Add list item"
                            onKeyPress={onEnter}
                            fullWidth
                            autoFocus
                            style={{width: '100%', paddingRight: 50}}
                            margin="dense"
                            value={listItem}
                            onChange={(e) => setListItem( e.target.value )}/>
                        <ListItemSecondaryAction>
                            <Button variant="contained" color="primary" onClick={handleCreate}>
                                Add
                            </Button>
                        </ListItemSecondaryAction>
                    </div>
                </ClickAwayListener>
            ):(
                <ListItemText primary="Add list item" style={{fontStyle: 'italic'}} />
            )}
        </ListItem>
   )
  });
  
  export default connect()(CreateListItem);