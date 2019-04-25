import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CurrentWeather from './CurrentWeather';
import WeatherDetails from './WeatherDetails';
import WeeklyWeather from './WeeklyWeather';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function WeatherCard(props){
    const classes = props.classes;
    const result = props.data
    const cityName = result.city.name
    const country = result.city.country
    const today = new Date(result.list[0].dt * 1000)
    const weatherDescription = capitalizeFirstLetter( result.list[0].weather[0].description )
    const now = new Date()

  
    return (
    <div>
        <Card className={classes.card}>
          <CardContent>
  
            <Typography type="display3"   >
            {`${cityName}, ${country}`}
            </Typography>
            <Typography type="display1"  >
              {`${today.toDateString()}, ${now.toLocaleTimeString()}`}
            </Typography>
            <Typography type="display1"  >
              {weatherDescription}
            </Typography>
            <div className={classes.flex}>
              <CurrentWeather data= {result.list[0]}/>
              <WeatherDetails data= {result.list[0]}/>
            </div>
            <div>
              <WeeklyWeather data={result.list}/>
            </div>
            
  
  
          </CardContent>
        </Card>
    </div>
    )
}
const styleSheet = theme => ({
    card: {
      minWidth: 275,
      marginBottom: 16,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
      color: theme.palette.text.secondary,
    },
    pos: {
      marginBottom: 12,
      color: theme.palette.text.secondary,
    },
    flex: {
        display: 'flex',
        flexWrap: 'wrap'
     },
});

export default withStyles(styleSheet)(WeatherCard);