import React from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { changeDarkMode } from "../redux/actions/ui";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { getTodos } from "../redux/actions/index";
import TodoBlock from './../components/TodoBlock';;

class Dashboard extends React.Component {
    handleChange = name => event => {
        this.props.changeDarkMode(event.target.checked)
    };

    componentDidMount(){
    if (this.props.todos && this.props.todos.length >=1 ){
        return
    }
    this.props.getTodos();
    }
    
    render(){
        const { todos } = this.props
        return (
            <div>
                <Typography variant="h2" gutterBottom component="h1">
                    Dashboard
                </Typography>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.props.darkMode}
                                onChange={this.handleChange('checked')}
                                value="checked"
                                color="primary"/>
                        }
                        label="Dark Mode"/>
                </FormGroup>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start">
                    <Grid item sm={12} md={5}>
                        <TodoBlock 
                        title="Today's Todos"
                        todos={todos} />
                    </Grid>
                </Grid>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return { 
        todos: state.todoReducer.todos,
        darkMode: state.uiReducer.darkMode 
    };
};

export default connect(mapStateToProps, {changeDarkMode, getTodos})(Dashboard);