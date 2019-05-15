import React from 'react';
import PipelineCard from './PipelineCard';
import PipelineActionBtn from './PipelineActionBtn';
import { Droppable} from 'react-beautiful-dnd';

const PipelineList = ({title, cards, colId}) => {
    return (
        <Droppable droppableId={String(colId)}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={styles.container}>
                    <h4>{title}</h4>
                    {cards.map((card, index) => 
                        <PipelineCard index={index} key={`card-${index}`} text={card.text} id={card.id} />
                    )}
                    <PipelineActionBtn colId={colId} />
                    {provided.placeholder}
                </div>

            )}
        </Droppable>
    )
} 

const styles = {
    container: {
        backgroundColor: '#dfe3e6',
        borderRadius: 3,
        width: 300,
        height: '100%',
        padding: 8,
        marginRight: 8
    }
}
export default PipelineList;