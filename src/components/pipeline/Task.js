import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
`;

export default class Class extends React.Component {
  render() {
    return (
      <Draggable 
        draggableId={this.props.task.id} 
        index={this.props.index}>
        
        {(provided) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >
            {this.props.task.content}
          </Container>
        )}

      </Draggable>
    );
  }
}