import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd';

import styled from 'styled-components';

const CardContainer = styled.div`
    margin-bottom: 8px;
`
const PipelineCard = ({text, id, index}) => {
    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom>
                                {text}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardContainer>
            )}
        </Draggable>
    )
} 

export default PipelineCard;