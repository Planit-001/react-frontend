import React from 'react';
import { withStyles } from '@material-ui/core';

import DailyWeather from './DailyWeather'

const styleSheet = theme => ({
  daily:{
    justifyContent:"space-between",
    display: "flex",
    marginRight: 32
  }
});

function WeeklyWeather(props){
  const classes = props.classes;
  const result = props.data
  let days
  days = result.slice(1).map(day=>
    <DailyWeather data={day} key={day.dt}/>
  )

  return(
    <ul className={classes.daily}>
      {days}
    </ul>
  )
}

export default withStyles(styleSheet)(WeeklyWeather);