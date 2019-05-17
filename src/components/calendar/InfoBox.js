import React from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {readableDateRange, readableTimeRange} from './../../utils/dateFuncs';

function InfoBox({eventId, eventTitle, eventStart, eventEnd, eventDescription}){
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Click an event to view
                </Typography>
                {eventId && <Typography variant="h5" component="h2">
                    {eventTitle}
                </Typography> }
                {eventId && <Typography color="textSecondary" gutterBottom>
                    {readableDateRange(eventStart, eventEnd)}
                </Typography>}
                {eventId && <Typography color="textSecondary" gutterBottom>
                    {readableTimeRange(eventStart, eventEnd)}
                </Typography>}
                <Typography>
                    {eventDescription}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox