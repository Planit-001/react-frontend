import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import { createTodo } from "../redux/actions/index";
import { connect } from "react-redux";
import moment from 'moment';

class CreateTodo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [],
      inputValue: '',
    };
  }

  onEnter = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
        this.createTodo(e.target.value)
    }  
  }

  createTodo = (input) => {
      const dueDate = this.props.defaultDueDate
      const todoBody = {title: input}
      if(dueDate && moment.isMoment(dueDate)){
        todoBody.due_date = dueDate.format();
      }
      this.props.createTodo({todo: todoBody});
      this.setState({inputValue: ''});
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  render() {

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
          <Grid container justify="space-around">
            
            <Grid xs={9} item>
                <TextField
                    placeholder="Add Todo here"
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    onKeyPress={this.onEnter}
                    fullWidth/>
            </Grid>

            <Grid xs={2} item>
              <Button
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  onClick={() => this.createTodo(this.state.inputValue)}>
                  Add
              </Button>
            </Grid>
            
          </Grid>
        </Paper>
    );
  }
}



export default connect(null, { createTodo, })(CreateTodo);
