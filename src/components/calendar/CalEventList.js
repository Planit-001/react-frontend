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

function sortedEvents(events){
    return events.sort(function(a, b){
        return moment(a.start_time).format('X')-moment(b.start_time).format('X')
    })
}

const styles = theme => ({
    root: {
    //   display: 'flex',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'scroll',
    },
    table: {
      minWidth: 340,
      height: '100%'
    },
  });

function CalEventList({events, classes}){
    
    return (
        <div>
            <ComponentTitle title="Calendar event list (5)" />
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>
                                Date
                            </TableCell>
                            <TableCell>
                                Time
                            </TableCell>
                            <TableCell>
                                Event
                            </TableCell>
                            <TableCell>
                                Description
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {sortedEvents(events).slice(0,5).map(event => (
                        <TableRow key={event.id}>
                            <TableCell colSpan={2} component="th" scope="row">
                                {readableDate(event.start_time)}
                            </TableCell>
                            <TableCell>
                                {readableTime(event.start_time)}
                            </TableCell>
                            <TableCell>
                                {event.title} <br />
                            </TableCell>
                            <TableCell>
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