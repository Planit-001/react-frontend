import React from 'react';
import Typography from '@material-ui/core/Typography';
import Column from './../components/pipeline/Column';

import {DragDropContext} from 'react-beautiful-dnd';

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
      }
    },
    columnOrder: ['column-1'],
  };


class PipelineBuilder extends React.Component {
    state = {
        ...initialData
    }

    onDragEnd = result => {

    }

    render(){

        return (
            <div>
                <Typography variant="h2" gutterBottom component="h1">
                    Pipeline Builder
                </Typography>
                <DragDropContext
                    onDragEnd={this.onDragEnd}>
                    {this.state.columnOrder.map((columnId, index) => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                        return <Column key={column.id} column={column} tasks={tasks} />
                    })}
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