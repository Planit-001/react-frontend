import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));


export default function SuggestionTable({suggestions}) {
  const classes = useStyles();

  return (
    suggestions && <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>
                        ID
                    </TableCell>
                    <TableCell align="right">
                        Type
                    </TableCell>
                    <TableCell align="right">
                        Body
                    </TableCell>
                    <TableCell align="right">
                        User ID
                    </TableCell>
                    <TableCell align="right">
                        Created at
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {suggestions.map(sugg => (
                    <TableRow key={sugg.id}>
                        <TableCell component="th" scope="row">
                            {sugg.id}
                        </TableCell>
                        <TableCell align="right">
                            {sugg.suggestion_type}
                        </TableCell>
                        <TableCell align="right">
                            {sugg.body}
                        </TableCell>
                        <TableCell align="right">
                            {sugg.user_id}
                        </TableCell>
                        <TableCell align="right">
                            {sugg.created_at}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
  );
}
