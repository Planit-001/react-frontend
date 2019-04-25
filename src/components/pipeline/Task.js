import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props => (
      props.isDragDisabled ? 'lightgrey' : 
        props.isDragging ? 'lightgreen': 'white'
    )};
  display: flex;
`;

export default class Class extends React.Component {
    render() {
        const isDragDisabled = false// this.props.task.id === 'task-1';
        return (
            <Draggable 
                draggableId={this.props.task.id} 
                isDragDisabled={isDragDisabled}
                index={this.props.index}>
                
                {(provided, snapshot) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    isDragDisabled={isDragDisabled}
                    >
                    {/* <Handle {...provided.dragHandleProps} /> */}
                    {this.props.task.content}
                </Container>
                )}

            </Draggable>
        );
    }
}