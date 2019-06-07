import React from 'react';
import { connect } from "react-redux";

import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import { getLists } from "../redux/actions/list";
import PageTitle from './../components/PageTitle'
import CreateList from './../components/list/CreateList';
import ListContainer from './../components/list/ListContainer';

class Lists extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // list: '',
    };
  }

  componentDidMount(){
    this.props.getLists();
  }

  filterLists(lists){
    return lists ? lists.filter((list) => list.archived !== true) : []
  }


  render() {

    const lists = this.filterLists(this.props.lists);

    return (
      <div>
        <PageTitle page="lists" helper={true} />

        <Grid container spacing={6}>
          <Grid xs={12} md={6} lg={4} item>
            <CreateList />
          </Grid>
        </Grid>
        
        <div className="spacer"></div>
        <Grid 
          container 
          spacing={6} >
          {lists && lists.map((item, index) => {
            return <Grid xs={12} md={6} lg={4} item key={index}>
              <ListContainer list={item} />
            </Grid>
          })}
          
        </Grid>
        <div className="spacer"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    lists: state.list.lists 
  };
};

export default connect(mapStateToProps, {getLists})(Lists);
