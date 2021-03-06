import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import { createTodo } from "../redux/actions/todo";
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
    if (e.key === 'Enter' && !(e.target.value.trim() === '')) {
        this.createTodo(e.target.value)
    }  
  }

  onCreate = () => {
    if (this.state.inputValue && (this.state.inputValue.trim() !== '')) {
      this.createTodo(this.state.inputValue)
    }  
  }

  createTodo = (input) => {
      const {defaultDueDate, user} = this.props
      
      const todoBody = {
        title: input,
        user_id: user.id
      }
      if(defaultDueDate && moment.isMoment(defaultDueDate)){
        todoBody.due_date = defaultDueDate.format();
      }
      this.props.createTodo({todo: todoBody});
      this.setState({inputValue: ''});
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  render() {
    return (
        <Paper style={{ marginBottom: 16, padding: 16 }}>
          <Grid container spacing={4} justify="space-around">
            
            <Grid sm={12} md={9} item>
                <TextField
                    placeholder="Add Todo here"
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    onKeyPress={this.onEnter}
                    fullWidth/>
            </Grid>

            <Grid md={3} item>
              <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={this.onCreate}>
                  Add
              </Button>
            </Grid>
            
          </Grid>
        </Paper>
    );
  }
}



export default connect(null, { createTodo })(CreateTodo);
