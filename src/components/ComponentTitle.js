import React from 'react';
import Typography from '@material-ui/core/Typography';

function ComponentTitle({title}){
    return (
        <Typography variant="h5" align="center" gutterBottom component="h4">
            {title}
        </Typography>
    )
}

export default ComponentTitle