import React from 'react';
import { connect } from "react-redux";
import { updateList, deleteList, createListItem } from "./../../redux/actions/list";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CreateListItem from './CreateListItem';
// import ListItem from '@material-ui/core/ListItem';
import ListItemEditable from './ListItemEditable';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';

import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import ArchiveIcon from '@material-ui/icons/Archive';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core';

const styles = theme => ({
  actions: {
      display: 'flex',
      // paddingTop: 0
  },
  expand: {
      marginLeft: 'auto',
  },
});

class ListContainer extends React.Component {
  state = {
    editable: false,
    listTitle: '',
  }

  componentDidMount(){
    this.setState({
      listTitle: this.props.list.title
    })
  }
  
  updateList = () => {
    const { listTitle } = this.state;

    if(listTitle){
      const payload = {
        title: this.state.listTitle
      }
      this.props.updateList(this.props.list.id, payload).then(() => {
        this.setState({editable: false})
      });
    }
  }

  onEditClick = () => {
    this.setState({
      editable: true
    });
  }

  handleClose = () => {
    this.setState({
      editable: false,
      listTitle: this.props.list.title
    })
  }

  archiveList = () => {
    const test = window.confirm("Are you sure you want to archive this list?")
    if(test){  
      const _payload = {
        archived: true
      }
      this.props.updateList(this.props.list.id, _payload).then(() => {
        this.setState({editable: false})
      })
    }
  }

  deleteList = (id) => {
    this.props.deleteList(id);
  }


  sortedListItems = (listItems) => {
    if (listItems.length >= 1){
      return listItems.sort((a, b) => {
        if(a.done === b.done){
          return a.id < b.id ? 1 : -1
        }
        return a.done ? 1 : -1 
      })
    }else{
      return listItems
    }
  }

  renderEditDialogue(){

    const {listTitle, editable} = this.state;

    return <Dialog
      open={editable}
      onClose={this.handleClose}
      aria-labelledby="form-dialog-title">
          <DialogTitle>
            Edit this list title
          </DialogTitle>
          <DialogContent>
              <TextField
                  autoFocus
                  margin="normal"
                  label="New list title"
                  fullWidth
                  value={listTitle}
                  onChange={e => this.setState({listTitle: e.target.value})}/>
          </DialogContent>
          <DialogActions>
              <Button onClick={this.handleClose} color="default">
                  Cancel
              </Button>
              <Button onClick={this.updateList} color="primary">
                  Update
              </Button>
          </DialogActions>
      </Dialog>
}


  render() {
    const { list, classes } = this.props;
    return (
        <Grid container direction="column" justify="center">
          {this.renderEditDialogue()}
            <Card>
              <CardHeader 
                title={list.title}
                onClick={this.onTitleClick}
                action={
                  <Tooltip title="Edit list tile">
                    <IconButton onClick={this.onEditClick}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                } />
                <CardContent style={{paddingBottom: 0}}>
                  <List dense={true}>
                    <Divider />
                    <CreateListItem listId={list.id} />
                    <Divider />
                    {list && list.list_items && this.sortedListItems(list.list_items).map((item, index) => {
                      return <ListItemEditable key={index} listItem={item} listId={list.id} />
                    })}  
                    <Divider />
                  </List>
                </CardContent>
                <CardActions className={classes.actions}>
                  {/* <Tooltip title="Archive list">
                      <IconButton onClick={this.archiveList}>
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Archive list">
                      <IconButton className={classes.expand} onClick={this.archiveList}>
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>


              {/* <ComponentTitle title={list.title} /> */}
              

              {/* {disableCreate !== true && <CreateTodo defaultDueDate={this.props.defaultDueDate} user={user} />}  */}
              {/* <TodoList showDate={this.props.showDate} sortByDate={this.props.sortByDate} todos={todos} user={user} /> */}
        </Grid>
    );
  }
}

const mapStateToProps = state => {
  return { 
      user: state.auth.user,
  };
};

export default withStyles(styles)(connect(mapStateToProps, {updateList, deleteList, createListItem })(ListContainer));