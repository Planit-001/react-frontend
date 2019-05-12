import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { createSuggestion } from "./../../redux/actions/suggestion";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function getSteps() {
  return ['Select suggestion type', 'Write Comment', 'Send'];
}

class SuggestionWizard extends React.Component {
  state = {
    open: false,
    activeStep: 0,
    type: 'bug',
    body: '',
  };

  handleRadio = event => {
    this.setState({ 
      type: event.target.value 
    });
  };


  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleSubmit = () => {
    const {type, body} = this.state
    const {user} = this.props;

    this.props.createSuggestion({
      suggestion_type: type,
      body,
      user_id: user.id
    }).then(() => {
      console.log('amazebert')
    });
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      type: 'bug',
      body: '',
      open: false
    });
  };

  renderButtons = () => {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return  <div className={classes.actionsContainer}>
      <div>
        <Button
          disabled={activeStep === 0}
          onClick={this.handleBack}
          className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleNext}
          className={classes.button}>
          Next
        </Button>
      </div>
    </div>
  }

  step0 = () => {
    const { classes } = this.props;
    return <Step>
      <StepLabel>
        Select suggestion type
      </StepLabel>
      <StepContent>
        {/* <Typography>{getStepContent(0)}</Typography> */}
        <RadioGroup
            aria-label="suggestionType"
            name="suggestionType"
            row={true}
            className={classes.group}
            value={this.state.type}
            onChange={this.handleRadio}>
            <FormControlLabel value="bug" control={<Radio />} label="Bug" />
            <FormControlLabel value="feature_request" control={<Radio />} label="Feature Request" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        {this.renderButtons()}
      </StepContent>
    </Step>
  }

  step1 = () => {
    const { classes } = this.props;
    const { body } = this.state;

    return <Step>
      <StepLabel>
        Write suggestion
      </StepLabel>
      <StepContent>
        <TextField
          label="Suggestion"
          placeholder="Please tell us about your suggestion"
          value={body}
          className={classes.textField}
          multiline
          fullWidth
          onChange={(e) => this.setState({body: e.target.value})}
          rows="4"
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}/>
         {this.renderButtons()}
      </StepContent>
    </Step>
  }

  step2 = () => {
    const { classes } = this.props;
    return <Step>
      <StepLabel>
        Submit
      </StepLabel>
      <StepContent>
        <div className={classes.actionsContainer}>
          <div>
            <Button
              onClick={this.handleBack}
              className={classes.button}>
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              className={classes.button}>
              Submit
            </Button>
          </div>
        </div>
      </StepContent>
    </Step>
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, open } = this.state;

    return (
      <div style={{margin: 16}}>
         <ExpansionPanel expanded={open} onChange={() => this.setState({open: !open})}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Have a suggestion to make this app better?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.root}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {this.step0()}
                {this.step1()}
                {this.step2()}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>
                    Thanks for your input! We'll take it into consideration :)
                  </Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Reset
                  </Button>
                </Paper>
              )}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

SuggestionWizard.propTypes = {
  classes: PropTypes.object,
};
const mapStateToProps = state => {
  return { 
      user: state.auth.user,
  };
};
export default  withStyles(styles)(connect( mapStateToProps, { createSuggestion })(SuggestionWizard));
