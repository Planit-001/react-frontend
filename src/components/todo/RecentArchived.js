import React from 'react';
import { List, Paper } from "@material-ui/core";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        paddingRight: '50px'
    },
    primary: {
        textDecoration: 'line-through'
    }
  };

class RecentArchived extends React.Component {
    render(){
        const {todos, classes} = this.props;
        return (
            <div>
                {todos && todos.length > 0 && (
                    <Paper style={{ margin: 16 }}>
                        <List dense={true}>
                            {todos.map((item, index) => (
                            <ListItem key={`todo-${index}`}>
                                <ListItemText
                                    classes={{
                                        root: classes.root,
                                        primary: classes.primary
                                    }}
                                    primary={item.title}
                                    secondary={moment(item.updated_at).format("D MMM, YYYY")}
                                />
                            </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
            </div>
        )
    }
}

export default withStyles(styles)(RecentArchived);