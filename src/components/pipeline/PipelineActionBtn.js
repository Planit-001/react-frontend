import React from 'react';
import Icon from '@material-ui/core/Icon';

class PipelineActionBtn extends React.Component{
    
    renderAddButton = () => {
        const { list } = this.props;
        const btnText = list ? 'Add another list' : 'Add another card'
        return (
            <div>
                <Icon>add</Icon>
                <p>
                    {btnText}
                </p>
            </div>
        )
    }

    render(){
        return this.renderAddButton();
    }
}

export default PipelineActionBtn;