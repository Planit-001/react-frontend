import React from 'react';
import Typography from '@material-ui/core/Typography';
import PipelineList from './../components/pipeline/PipelineList'
import { connect } from "react-redux";

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PipelineActionBtn from './../components/pipeline/PipelineActionBtn';
import { sort } from './../redux/actions/pipeline';
import  styled  from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;


class Pipeline extends React.Component {
    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
          return;
        }
    
        this.props.dispatch(
          sort(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            type
          )
        );
    };

    render(){
        const { lists } = this.props;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Typography variant="h3" gutterBottom component="h1">
                Pipeline builder
              </Typography>
              <Droppable droppableId="all-lists" direction="horizontal" type="list">
                {provided => (
                  <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                    {lists.map((list, index) => (
                      <PipelineList
                        listID={list.id}
                        key={list.id}
                        title={list.title}
                        cards={list.cards}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                    <PipelineActionBtn list />
                  </ListContainer>
                )}
              </Droppable>
            </DragDropContext>
        );
    }
}


const mapStateToProps = state => {
    return { 
        lists: state.pipeline
    };
};

export default connect(mapStateToProps)(Pipeline);