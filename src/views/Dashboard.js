import React from 'react';
import { connect } from "react-redux";
import { getTodos } from "../redux/actions/todo";
import { getWeatherCurrent } from "../redux/actions/external";
import { changeDarkMode } from "../redux/actions/ui";

import Grid from '@material-ui/core/Grid';
import TodoBlock from './../components/TodoBlock';
import Typography from '@material-ui/core/Typography';
import WindyWeatherCard from './../components/widgets/WindyWeatherCard';
import SuggestionWizard from './../components/suggestion/SuggestionWizard';
import CalEventList from './../components/calendar/CalEventList';

import {todayNullOrBefore} from './../utils/todoFuncs'
// import MiniCal from './../components/calendar/MiniCal';

class Dashboard extends React.Component {
    componentDidMount(){
        // this.props.getWeatherCurrent()
        // this.geoLocate();
        
        // if (this.props.todos && this.props.todos.length >=1 ){
        //     return
        // }
        this.props.getTodos();
    }

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
        const { todos, calEvents } = this.props
        return (
            <div>
                <Typography variant="h2" gutterBottom component="h1">
                    Dashboard
                </Typography>
                <Grid
                    container
                    spacing={32}>
                    {/* {currentWeather && !_.isEmpty(currentWeather) && <Grid item sm={12} md={7} lg={6}>
                        <Typography variant="h5" align="center" gutterBottom component="h4">
                            Today's Weather
                        </Typography>
                        <WeatherCard data={currentWeather}/>
                    </Grid>} */}
                    
                    <Grid item xs={12} sm={12} md={7} lg={6}>
                        <WindyWeatherCard />
                        {/* <div className="spacer"></div> */}
                        {/* <CalEventList events={calEvents} /> */}
                    </Grid>
                    <Grid item sm={12} md={5}>
                        <TodoBlock 
                            title="Today's To-do's"
                            todos={todayNullOrBefore(todos)} />
                        <SuggestionWizard />
                    </Grid>

                    <Grid item xs={12} sm={12} md={8}>
                        <CalEventList events={calEvents} />
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
        calEvents: state.calEvent.calEvents,
    };
};

export default connect(mapStateToProps, {changeDarkMode, getTodos, getWeatherCurrent})(Dashboard);