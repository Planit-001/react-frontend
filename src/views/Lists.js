import React from 'react';
import { connect } from "react-redux";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import PageTitle from './../components/PageTitle'
import CreateList from './../components/list/CreateList';

class Lists extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      list: '',
    };
  }

  componentDidMount(){

  }

  handleChange(event){
    this.setState({
      list: event.target.value
    })
  }


  render() {

    return (
      <div>
        <PageTitle title="Lists" />

        <div style={{maxWidth: 400}}>
          <CreateList />
        </div>
        <div className="spacer"></div>
        <Grid container>
          asdf
        </Grid>
        <div className="spacer"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    todos: state.todo.todos 
  };
};

export default connect(mapStateToProps)(Lists);
