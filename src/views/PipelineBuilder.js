import React from 'react';
import Typography from '@material-ui/core/Typography';
import Column from './../components/pipeline/Column';
import styled from 'styled-components'


import { DragDropContext, Droppable} from 'react-beautiful-dnd';

import { connect } from "react-redux";

const initialData = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch my favourite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'In Progress',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: [],
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };


const Container = styled.div`
  display: flex;
`


class OuterList extends React.PureComponent{
    render(){
        const { column, taskMap, index } = this.props;
        const tasks = column.taskIds.map(taskId => taskMap[taskId]);
        return <Column column={column} tasks={tasks} index={index} />
    }
}


class PipelineBuilder extends React.Component {
    state = {
        ...initialData
    }

    onDragStart = () => {
        document.body.style.color = 'orange';
        document.body.style.transition = 'background-color 0.2s ease';
    }

    onDragUpdate = update => {
        const { destination } = update;
        const opacity = destination ? 
            destination.index / Object.keys(this.state.tasks).length
            : 0;

        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
    }

    onDragEnd = result => {
        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';

        const { destination, source, draggableId, type } = result;

        if(!destination){
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ){
            return;
        }

        if(type === 'column'){
            const newColumnOrder = Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId)
            const newState = {
                ...this.state,
                columnOrder: newColumnOrder
            }
            this.setState(newState);
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if(start === finish){
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
    
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            }
    
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            }
            this.setState(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);

        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            },
        };

        this.setState(newState)


        // after performing this 'optimistic' ui update,
        // call an endpoint to let a server know that a reorder has occured
    }

    render(){

        return (
            <div>
                <Typography variant="h2" gutterBottom component="h1">
                    Pipeline Builder
                </Typography>

                <DragDropContext
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}
                    onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="columnHolder" direction="horizontal" type="column">
                        {provided => (
                            <Container
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                >
                                {this.state.columnOrder.map((columnId, index) => {
                                    const column = this.state.columns[columnId];
                                    // const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
                                    return (
                                        <OuterList 
                                            key={column.id}
                                            column={column}
                                            taskMap={this.state.tasks}
                                            index={index}/>
                                    )

                                    // return <Column key={column.id} column={column} tasks={tasks} index={index} />
                                })}
                                {provided.placeholder}
                            </Container>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        todos: state.todoReducer.todos,
        darkMode: state.uiReducer.darkMode 
    };
};

export default connect(mapStateToProps)(PipelineBuilder);