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
      const lat = "43.749";
      const lng = "-79.202";
      return (
          <Card>
            <CardHeader            
                title="Weather forecast for your area"
                subheader={moment().format('dddd MMMM Do, YYYY - h:mm a')} />
            <CardContent>
            <iframe 
              title="windy.com"
              width="650" 
              height="450" 
              src={`https://embed.windy.com/embed2.html?
                lat=${lat}
                &lon=${lng}
                &zoom=5
                &level=surface
                &menu=&message=true
                &marker=true
                &location=coordinates
                &detail=true
                &detailLat=${lat}
                &detailLon=${lng}
                &metricWind=km%2Fh
                &metricTemp=%C2%B0C
                &radarRange=-1`}
              frameBorder="0"></iframe>
            </CardContent>
          </Card>

      )
    }
}

export default WindyWeatherCard;