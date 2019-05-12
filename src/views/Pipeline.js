import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Column from './../components/pipeline/Column';
// import styled from 'styled-components'
// import { DragDropContext, Droppable} from 'react-beautiful-dnd';
import PipelineList from './../components/pipeline/PipelineList'
import { connect } from "react-redux";
import PipelineActionBtn from './../components/pipeline/PipelineActionBtn';

class Pipeline extends React.Component {
    state = {
    }

    render(){
        const {lists} = this.props;
        return (
            <div>
                <Typography variant="h2" gutterBottom component="h1">
                    Pipeline 
                </Typography>
                <div style={styles.listContainer}>
                    {lists.map((list , i) => <PipelineList key={`list-${i}`} title={list.title} cards={list.cards} />)}
                    <PipelineActionBtn list />
                </div>
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