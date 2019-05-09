import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import React, {Component} from 'react';

import moment from 'moment';

class WindyWeatherCard extends Component {
    
    shouldComponentUpdate() {
      return false;
    }

    render() {
      return (
          <Card>
            <CardHeader            
                title="Weather forecast for your area"
                subheader={moment().format('MMMM Do YYYY, h:mm:ss a')} />
            <CardContent>
            <iframe 
              width="650" 
              height="450" 
              src="https://embed.windy.com/embed2.html?lat=43.749&lon=-79.202&zoom=5&level=surface&overlay=wind&menu=&message=true&marker=true&calendar=&pressure=&type=map&location=coordinates&detail=true&detailLat=43.749&detailLon=-79.202&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" 
              frameBorder="0"></iframe>
            </CardContent>
          </Card>

      )
    }
}

export default WindyWeatherCard;