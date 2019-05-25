import React from 'react';
import ComponentTitle from './../ComponentTitle'
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {readableDate, readableTime } from './../../utils/dateFuncs';

import { withStyles } from '@material-ui/core/styles';

const before = moment().subtract(7, 'd').format('X');
const after = moment().add(4, 'weeks').format('X');


function sortedEvents(events){
    return events.sort(function(a, b){
        return moment(a.start_time).format('X')-moment(b.start_time).format('X')
    });
}

function filterEvents(events){
    return events.filter(event => {
        return moment(event.start_time).isBetween(moment().subtract(7, 'd'), moment().add(4, 'weeks'))
    });
}


const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    cell: {
        paddingRight: 20,
    }
  });

const strikeThru = {
    textDecoration: 'line-through'
};

function CalEventList({events, classes}){
    
    return (
        <div>
            <ComponentTitle title="Calendar events" />
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width:140}}>
                                Date
                            </TableCell>
                            <TableCell style={{width:100}}>
                                Time
                            </TableCell>
                            <TableCell style={{width: 160}}>
                                Event
                            </TableCell>
                            <TableCell style={{width: 250}}>
                                Description
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {events && sortedEvents(filterEvents(events)).map(event => (
                        <TableRow style={ moment(event.start_time).isBefore(moment().subtract(1, 'd')) ? strikeThru : {} }  key={event.id}>
                            <TableCell className={classes.cell} style={{width: 140}} >
                                    {readableDate(event.start_time)}
                            </TableCell>
                            <TableCell className={classes.cell} style={{width: 100}}>
                                {readableTime(event.start_time)}
                            </TableCell>
                            <TableCell className={classes.cell} style={{width: 160}}>
                                {event.title} <br />
                            </TableCell>
                            <TableCell className={classes.cell} style={{width: 250}}>
                                {event.description ? event.description : ' - '}
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}


export default withStyles(styles)(CalEventList);