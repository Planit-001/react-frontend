import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Task from './Task'
import InnerList from './InnerList';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 220px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;

`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue': 'inherit')};
    flex-grow: 1;
    min-height: 100px;
`;

export default class Column extends React.Component {
  render() {
    return (
        <Draggable 
            draggableId={this.props.column.id} 
            index={this.props.index}>
            {provided => (
                <Container 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    >
                    <Title {...provided.dragHandleProps}>
                        {this.props.column.title}
                    </Title>
                    <Droppable droppableId={this.props.column.id} 
                        type="task">
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}>
                                <InnerList tasks={this.props.tasks} />
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    )
  }
}