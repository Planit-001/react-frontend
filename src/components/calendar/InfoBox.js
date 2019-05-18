import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import {readableDateRange, readableTimeRange} from './../../utils/dateFuncs';

function InfoBox({eventId, eventTitle, eventStart, eventEnd, eventDescription, onUpdate, onDelete}){
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Click an event to view
                </Typography>
                {eventId && <div>
                    <Typography variant="h5" component="h2">
                        {eventTitle}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {readableDateRange(eventStart, eventEnd)}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {readableTimeRange(eventStart, eventEnd)}
                    </Typography>
                    <Typography component="p">
                        {eventDescription}
                    </Typography>
                </div>}
                {eventId && <CardActions>
                    <Button onClick={onDelete} size="small" color="secondary">
                        Delete
                    </Button>
                    <Button onClick={onUpdate} size="small" color="default">
                        Update
                    </Button>
                </CardActions>}
                    
                
            </CardContent>
        </Card>
    )
}

export default InfoBox