import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {readableDateRange, readableTimeRange} from './../../utils/dateFuncs';
import moment from 'moment';
import AddToCalendarHOC from 'react-add-to-calendar-hoc';
import CardHeader from '@material-ui/core/CardHeader';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

function InfoBox({eventId, eventTitle, eventStart, eventEnd, eventDescription, onUpdate, onDelete, darkMode}){
    const event = () => {
        const startDatetime = moment(eventStart);
        const endDatetime = moment(eventEnd) //startDatetime.clone().add(2, 'hours');
        const duration = moment.duration(endDatetime.diff(startDatetime)).asHours();
        const event = {
          description: eventDescription,
          duration: String(duration),
          endDatetime: endDatetime.format('YYYYMMDDTHHmmss'),
          startDatetime: startDatetime.format('YYYYMMDDTHHmmss'),
          title: eventTitle,
        }
        return event;      
    }

    const Dropdown = ({children}) => {
        return (
            <div className={`cal-dropdown ${darkMode ? 'dropdown-dark' : ''}`}>
              {children.map((child, index) => (
                // <Typography key={index}>
                //     {child}
                // </Typography>
                  <div key={index}>
                      {child}
                  </div>
              ))}
            </div>
          );    
    }

    const AddToCalendarDropdown = AddToCalendarHOC(Button, Dropdown);

    return (
        <Card>
            {eventId && <CardHeader 
                style={{paddingBottom: 0}}
                title={eventTitle}
                action={
                  <Tooltip title="Edit Event">
                    <IconButton onClick={onUpdate} >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
            } />}
            
            <CardContent>
                {!eventId && <Typography color="textSecondary" gutterBottom>
                    Click an event to view
                </Typography>}
                {eventId && <div>
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
            </CardContent>

            {eventId && <CardActions>
                <Button onClick={onDelete} color="secondary">
                    Delete
                </Button>
                <AddToCalendarDropdown
                    buttonProps={{
                        color: "primary"
                    }}
                    buttonText="Download Event"
                    // className={componentStyles}
                    // linkProps={{
                    //     className: linkStyles,
                    // }}
                    event={event()}
                />
            </CardActions>}
                
        </Card>
    )
}

export default InfoBox