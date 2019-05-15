import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Column from './../components/pipeline/Column';
// import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd';
import PipelineList from './../components/pipeline/PipelineList'
import { connect } from "react-redux";
import PipelineActionBtn from './../components/pipeline/PipelineActionBtn';
import { sort } from './../redux/actions/pipeline';

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
        
        console.log("handleDragEnd");
    }

    render(){
        const {lists} = this.props;
        return (
            <div>
                <Typography variant="h2" gutterBottom component="h1">
                    Pipeline 
                </Typography>
                <DragDropContext onDragEnd={this.handleDragEnd}>
                    <div style={styles.listContainer}>
                        {lists.map((col , i) => <PipelineList colId={col.id} key={`col-${i}`} title={col.title} cards={col.cards} />)}
                        <PipelineActionBtn list />
                    </div>
                </DragDropContext>
            </div>
        )
    }
}

const styles = {
    listContainer: {
        display: "flex",
        flexDirection: "row",
    }
}

const mapStateToProps = state => {
    return { 
        lists: state.list
    };
};

export default connect(mapStateToProps)(Pipeline);