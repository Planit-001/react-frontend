import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd';


const PipelineCard = ({text, id, index}) => {
    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Card style={styles.container}>
                        <CardContent>
                            <Typography gutterBottom>
                                {text}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    )
} 

const styles = {
    container: {
        marginBottom: 8
    }
}

export default PipelineCard;