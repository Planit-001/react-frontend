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
// import Icon from '@material-ui/core/Icon';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

const dropdownStyles = {
  padding: "10px",
  border: "1px solid #E5E5E5",
  borderTop: "none",
  width: "300px",
  backgroundColor: "#FFF",
  margin: "0 auto",
};

function Dropdown({ children }) {
  return (
    <div style={dropdownStyles}>
      {children.map((child, index) => (
          <div key={index}>
              {child}
          </div>
      ))}
    </div>
  );
}

function InfoBox({eventId, eventTitle, eventStart, eventEnd, eventDescription, onUpdate, onDelete}){
    console.log(eventStart)
    const event = () => {
        const startDatetime = moment(eventStart);
        const endDatetime = moment(eventEnd) //startDatetime.clone().add(2, 'hours');
        const duration = moment.duration(endDatetime.diff(startDatetime)).asHours();
        const event = {
          description: eventDescription,
          duration: String(duration),
          endDatetime: endDatetime.format('YYYYMMDDTHHmmssZ'),
          startDatetime: startDatetime.format('YYYYMMDDTHHmmssZ'),
          title: eventTitle,
        }
        return event;      
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
                {/* <div onClick={() => cal.download()}>dl</div> */}
                {/* <a href="javascript:cal.download()">Demo</a> */}

                {eventId && <CardActions>
                    <Button onClick={onDelete} size="small" color="secondary">
                        Delete
                    </Button>
                    <AddToCalendarDropdown
                        buttonProps={{
                            size: 'small',
                            color: "primary"
                        }}
                        buttonText="Download"
                        // className={componentStyles}
                        // linkProps={{
                        //     className: linkStyles,
                        // }}
                        event={event()}
                    />
                </CardActions>}
                    
                
            </CardContent>
        </Card>
    )
}

export default InfoBox