import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



const PipelineCard = ({text}) => {
    return (
        <Card style={styles.container}>
            <CardContent>
                <Typography gutterBottom>
                    {text}
                </Typography>
            </CardContent>
        </Card>
    )
} 

const styles = {
    container: {
        marginBottom: 8
    }
}

export default PipelineCard;