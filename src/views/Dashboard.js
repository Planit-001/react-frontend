import React from 'react';
import { connect } from "react-redux";
import { getTodos } from "../redux/actions/todo";
import { getWeatherCurrent } from "../redux/actions/external";
import { changeDarkMode } from "../redux/actions/ui";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TodoBlock from './../components/TodoBlock';
import Typography from '@material-ui/core/Typography';

// import WeatherCard from './../components/widgets/WeatherCard';
import WindyWeatherCard from './../components/widgets/WindyWeatherCard';
import SuggestionWizard from './../components/suggestion/SuggestionWizard';

import {todayNullOrBefore} from './../utils/todoFuncs'

class Dashboard extends React.Component {
    componentDidMount(){
        // this.props.getWeatherCurrent()
        // this.geoLocate();
        
        // if (this.props.todos && this.props.todos.length >=1 ){
        //     return
        // }
        this.props.getTodos();
    }

    handleChange = name => event => {
        this.props.changeDarkMode(event.target.checked)
    };

    geoLocate(){
        const {getWeatherCurrent} = this.props;
        function showPosition(position) {
            getWeatherCurrent(position.coords.latitude, position.coords.longitude);
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

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
                    justify="space-around"
                    spacing={32}
                    alignItems="flex-start">
                    {/* {currentWeather && !_.isEmpty(currentWeather) && <Grid item sm={12} md={7} lg={6}>
                        <Typography variant="h5" align="center" gutterBottom component="h4">
                            Today's Weather
                        </Typography>
                        <WeatherCard data={currentWeather}/>
                    </Grid>} */}
                    <Grid  item sm={12} md={7} lg={6}>
                        <WindyWeatherCard />
                    </Grid>
                    <Grid item sm={12} md={5}>
                        <TodoBlock 
                            title="Today's To-do's"
                            todos={todayNullOrBefore(todos)} />
                        <SuggestionWizard />
                    </Grid>
                </Grid>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return { 
        todos: state.todo.todos,
        darkMode: state.ui.darkMode,
        currentWeather: state.external.currentWeather,
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, {changeDarkMode, getTodos, getWeatherCurrent})(Dashboard);