import React from 'react';
import { connect } from "react-redux";
import { getTodos } from "../redux/actions/todo";
import { getWeatherCurrent } from "../redux/actions/external";
import { changeDarkMode, getCurrentCoordinates } from "../redux/actions/ui";

import Grid from '@material-ui/core/Grid';
import TodoBlock from './../components/TodoBlock';

import WindyWeatherCard from './../components/widgets/WindyWeatherCard';
import SuggestionWizard from './../components/suggestion/SuggestionWizard';
import CalEventList from './../components/calendar/CalEventList';
import Spacer from './../components/Spacer';
import PageTitle from './../components/PageTitle';

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
                <Grid container justify="space-between">
                    <PageTitle title="Dashboard" page="dashboard" />
                </Grid>
                <Grid container spacing={32}>
                    <Grid item xs={12} sm={12} md={7} lg={6}>
                        <WindyWeatherCard />
                        <Spacer height={40} />
                        <CalEventList events={calEvents} />
                    </Grid>
                    <Grid item sm={12} md={5} lg={6}>
                        <TodoBlock 
                            title="Today's To-do's"
                            todos={todayNullOrBefore(todos)} />
                        <Spacer height={54} />
                        <SuggestionWizard />
                        <Spacer height={30} />
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