import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import { createList } from "./../../redux/actions/list";
import { connect } from "react-redux";


class CreateList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
    };
  }

  onEnter = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
        this.createList(e.target.value)
    }  
  }

  createList = (input) => {
      const {user} = this.props
      
      if (input){
          const listBody = {
            title: input,
            user_id: user.id
          }
          this.props.createList({list: listBody});
          this.setState({inputValue: ''});
      }
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  render() {
    return (
        <Paper style={{padding: 16 }}>
          <Grid container spacing={8} justify="space-around">            
            <Grid sm={12} md={9} item>
                <TextField
                    placeholder="Create a new list"
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    onKeyPress={this.onEnter}
                    fullWidth/>
            </Grid>

            <Grid sm={3} item >
              <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.createList(this.state.inputValue)}>
                  Create
              </Button>
            </Grid>
          </Grid>
        </Paper>
    );
  }
}

const mapStateToProps = state => {
    return { 
        user: state.auth.user,
    };
};
  


export default connect(mapStateToProps, { createList })(CreateList);
