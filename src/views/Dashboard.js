import React from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { changeDarkMode } from "../redux/actions/ui";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class Dashboard extends React.Component {
      handleChange = name => event => {
          this.props.changeDarkMode(event.target.checked)
      };
    
    render(){
        return (
            <div>
                <Typography variant="h2" gutterBottom component="h1">
                    Dashboard
                </Typography>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.props.darkTheme}
                                onChange={this.handleChange('checked')}
                                value="checked"
                                color="primary"/>
                        }
                        label="Dark Mode"/>
                </FormGroup>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return { darkTheme: state.uiReducer.darkTheme };
};

export default connect(mapStateToProps, {changeDarkMode})(Dashboard);