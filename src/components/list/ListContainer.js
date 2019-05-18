import React from 'react';
import Typography from '@material-ui/core/Typography';

// import CreateTodo from './../components/CreateTodo';
// import TodoList from './../components/TodoList';

import ComponentTitle from './../ComponentTitle';
import { connect } from "react-redux";
import { updateList, deleteList, createListItem } from "./../../redux/actions/list";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


class ListContainer extends React.Component {

    state = {
        createable: false,
        newListItem: '',
    }
  
  updateList = (e, id) => {

  }

  deleteList = (id) => {
    this.props.deleteList(id);
  }

  createListItem = () => {
    const { list } = this.props;
    const title = this.state.newListItem;
    const listItemBody = {
        title,
    };

    this.props.createListItem(list.id, listItemBody)
    
  }

  onEnter = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
        this.handleClickAway()
    }  
  }


  updateListItem = (e, id) => {
    // if(e.target.checked !== undefined){
    //   const listBody = {list: {done: e.target.checked}};
    //   this.props.updatelist(id, todoBody);
    // }
  }

  deleteListItem = (id) => {
    // this.props.deleteList(id);
  }

  handleClickAway = () => {
    this.setState({
      createable: false
    })
  }


  render() {
    const { list } = this.props;
    const { createable } = this.state;

    return (
      
        <Paper>
          <Grid container direction="column" justify="center">

                <ComponentTitle title={list.title} />
                <List>
                    <Divider />
                    <ListItem button disableRipple onClick={() => this.setState({createable: true})}>
                        <ListItemIcon>
                            <AddCircleOutlineIcon />
                        </ListItemIcon>
                        
                        {createable ? (
                            <ClickAwayListener onClickAway={this.handleClickAway}>
                                <div style={{width: '90%'}}>
                                    <TextField
                                        label="Add list item"
                                        onKeyPress={this.onEnter}
                                        fullWidth
                                        style={{width: '100%', paddingRight: 50}}
                                        margin="dense"
                                        value={this.state.newListItem}
                                        onChange={(e) => this.setState({newListItem: e.target.value})}/>
                                    <ListItemSecondaryAction>
                                        <Button variant="contained" color="primary" onClick={this.createListItem}>
                                            Add
                                        </Button>
                                    </ListItemSecondaryAction>
                                </div>
                            </ClickAwayListener>
                        ):(
                            <ListItemText primary="Add list item" />
                        )}
                    </ListItem>
                </List>

          </Grid>
          {/* {disableCreate !== true && <CreateTodo defaultDueDate={this.props.defaultDueDate} user={user} />}  */}
          {/* <TodoList showDate={this.props.showDate} sortByDate={this.props.sortByDate} todos={todos} user={user} /> */}
        </Paper>

      
    );
  }
}

const mapStateToProps = state => {
  return { 
      user: state.auth.user,
  };
};

export default connect(mapStateToProps, {updateList, deleteList, createListItem })(ListContainer);