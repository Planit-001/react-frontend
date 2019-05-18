import React from 'react';
import ComponentTitle from './../ComponentTitle';
import { connect } from "react-redux";
import { updateList, deleteList, createListItem } from "./../../redux/actions/list";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CreateListItem from './CreateListItem';
// import ListItem from '@material-ui/core/ListItem';
import ListItemEditable from './ListItemEditable';
import ListItemText from '@material-ui/core/ListItemText';

class ListContainer extends React.Component {

  
  updateList = (e, id) => {

  }

  deleteList = (id) => {
    this.props.deleteList(id);
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


  render() {
    const { list } = this.props;
    const listItems = list.list_items
    return (
      
        <Paper>
          <Grid container direction="column" justify="center">

                <ComponentTitle title={list.title} />
                <List>
                    {list.list_items.map((item, index) => {
                      return <ListItemEditable key={index} listItem={item} listId={list.id} />
                    })}
                    <Divider />
                    <CreateListItem listId={list.id} />
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