import React from 'react';
import { connect } from "react-redux";
import { getTodos } from "../redux/actions/todo";
import { getWeatherCurrent } from "../redux/actions/external";
import { changeDarkMode, getCurrentCoordinates } from "../redux/actions/ui";

import Grid from '@material-ui/core/Grid';
import TodoBlock from './../components/TodoBlock';
import Typography from '@material-ui/core/Typography';
import WindyWeatherCard from './../components/widgets/WindyWeatherCard';
import SuggestionWizard from './../components/suggestion/SuggestionWizard';
import CalEventList from './../components/calendar/CalEventList';
import Spacer from './../components/Spacer';
import {todayNullOrBefore} from './../utils/todoFuncs'


class Dashboard extends React.Component {

    componentDidMount(){
        this.props.getTodos();
        this.props.getCurrentCoordinates();
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
                        
                        {/* <CalEventList events={calEvents} /> */}
                    </Grid>
                    <Grid item sm={12} md={5} lg={6}>
                        <TodoBlock 
                            title="Today's To-do's"
                            todos={todayNullOrBefore(todos)} />
                        {/* <SuggestionWizard /> */}
                    </Grid>

                    <Grid item xs={12} sm={12} md={7} lg={6}>
                        <CalEventList events={calEvents} />
                    </Grid>

                    <Grid item xs={12} md={5} lg={6}>
                        <Spacer height={40} />
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
        calEvents: state.calEvent.calEvents,
    };
};

export default connect(mapStateToProps, {changeDarkMode, getTodos, getWeatherCurrent, getCurrentCoordinates})(Dashboard);