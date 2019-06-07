import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import { createTodo } from "./../../redux/actions/todo";
import { connect } from "react-redux";
import moment from 'moment';
// import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import MomentUtils from '@date-io/moment';
// import {readableDate} from './../utils/dateFuncs';

class FutureTodoCreate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
      selectedDate: null
    };
  }

  onEnter = (e) => {
    if (e.key === 'Enter' && !(e.target.value === '')) {
        this.createTodo(e.target.value)
    }  
  }

  createTodo = (input) => {
      const { user} = this.props
      
      const todoBody = {
        title: input,
        user_id: user.id,
      }
      if(moment.isMoment(this.state.selectedDate)){
        todoBody.due_date = this.state.selectedDate.format()
        this.props.createTodo({todo: todoBody});
        this.setState({
            inputValue: '',
            selectedDate: null
        });
      }
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
      const { selectedDate } = this.state;
    return (
        <Paper style={{ 
            marginBottom: 16, 
            padding: 16, 
            display: 'flex', 
            flexDirection: "column", 
            justifyContent: 'center' 
          }}>
          <Grid container spacing={8} justify="space-around">
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    label="Date picker"
                    disablePast={true}
                    clearable={true}
                    value={selectedDate}
                    style={{marginBottom: 40}}
                    onChange={this.handleDateChange}/>
            <div className="spacer"></div>
            </MuiPickersUtilsProvider>

          </Grid>
          <Grid container spacing={8} justify="space-around">
            <div className="spacer"></div>
            
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
                  onClick={() => this.createTodo(this.state.inputValue)}>
                  Add
              </Button>
            </Grid>
            
          </Grid>
        </Paper>
        
    );
  }
}



export default connect(null, { createTodo })(FutureTodoCreate);
