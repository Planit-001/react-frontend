import React from 'react';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@material-ui/core/Button';

class PipelineActionBtn extends React.Component{
    state = {
        formOpen: false,
        text: ''
    }

    openForm = () => {
        this.setState({
            formOpen: true
        })
    }

    closeForm = () => {
        this.setState({
            formOpen: false
        })
    }

    renderAddButton = () => {
        const { list } = this.props;
        const btnText = list ? 'Add another column' : 'Add another item'
        const btnTextOpacity = list ? 1 : 0.5;
        const btnTextColor = list ? "white" : 'inherit';
        const btnTextBg = list ? "rgba(0,0,0,0.15)" : "inherit";

        const style = {
            ...styles.openForButtonGroup,
            opacity: btnTextOpacity,
            color: btnTextColor,
            backgroundColor: btnTextBg
        }
        return (
            <div
                onClick={this.openForm} 
                style={style}>
                <Icon>add</Icon>
                <p>
                    {btnText}
                </p>
            </div>
        )
    }

    handleInputChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    renderForm = () => {
        const { list } = this.props;
        const placeholder = list ? "Column title" : "Item title"
        const btnTitle = list ? "Add column" : "Add item"
        return <div>
            <Card style={{
                minHeight: 80,
                minWidth: 272,
                padding: "6px, 8px, 2px"
            }}>
                <TextareaAutosize 
                    placeholder={placeholder} 
                    autoFocus 
                    onBlur={this.closeForm}
                    value={this.state.text}
                    onChange={this.handleInputChange}
                    style={{
                        resize: 'none',
                        width: '100%',
                        overflow: 'hiddenk',
                        outline: "none",
                        border: "none"
                    }}/>
            </Card>
            <div style={styles.formBtnGroup}>
                <Button variant="contained" style={{color: "white", backgroundColor: '#5aac44'}}>
                    {btnTitle}
                </Button>
                <Icon style={{marginLeft: 8, cursor: "pointer" }} >
                    close
                </Icon>
            </div>

        </div>
    }

    render(){
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}



const styles = {
    openForButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10,
    },
    formBtnGroup: {
        marginTop: 8,
        display: 'flex',
        alignItems: 'center'
    }
}

export default PipelineActionBtn;