import React from 'react';
import PipelineCard from './PipelineCard';
import PipelineActionBtn from './PipelineActionBtn';

const PipelineList = ({title, cards}) => {
    return (
        <div style={styles.container}>
            <h4>{title}</h4>
            {cards.map((card, index) => 
                <PipelineCard key={`card-${index}`} text={card.text} />
            )}
            <PipelineActionBtn />
        </div>
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