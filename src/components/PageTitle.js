import React from 'react';
import Typography from '@material-ui/core/Typography';

function PageTitle({title}){
    return (
        <Typography variant="h3" gutterBottom component="h1">
            {title}
        </Typography>
    )
}

export default PageTitle