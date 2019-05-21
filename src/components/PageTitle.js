import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import pageInfo from './../utils/pageInfo';
import PageHelper from './PageHelper';

function PageTitle({page, helper}){
    return (
        <Grid container justify="space-between">
            <Typography variant="h2" gutterBottom component="h1">
                {pageInfo[page].title}
            </Typography>
            {helper && <PageHelper page={page} />}
        </Grid>
    )
}

export default PageTitle