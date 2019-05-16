import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Column from './../components/pipeline/Column';
// import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PipelineList from './../components/pipeline/PipelineList'
import { connect } from "react-redux";
import PipelineActionBtn from './../components/pipeline/PipelineActionBtn';
import { sort } from './../redux/actions/pipeline';
import  styled  from 'styled-components';

const ListContainer = styled.div`
    display: flex;
    flex-direction: row,
`

class Pipeline extends React.Component {

    state = {
    
    }

    handleDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if(!destination){
            return
        }

        this.props.dispatch(sort(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            type
        ))
    }

    render(){
        const { lists } = this.props;
        return (
            <div>
                <Typography variant="h2" gutterBottom component="h1">
                    Pipeline 
                </Typography>
                <DragDropContext 
                    onDragEnd={this.handleDragEnd}>
                    <h2>Hello Youtube</h2>

                    <Droppable 
                        droppableId="all-cols" 
                        direction="horizontal" 
                        type="list">
                        {provided => (
                            <ListContainer 
                                {...provided.droppableProps} 
                                ref={provided.innerRef}>

                                {lists.map((col , i) => (
                                    <PipelineList 
                                        colId={col.id} 
                                        index={i} 
                                        key={col.id} 
                                        title={col.title} 
                                        cards={col.cards} />
                                ))}
                                {provided.placeholder}
                                <PipelineActionBtn list />
                            </ListContainer>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { 
        lists: state.list
    };
};

export default connect(mapStateToProps)(Pipeline);