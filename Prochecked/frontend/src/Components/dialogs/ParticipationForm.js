import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton,Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AppApi} from '../../AppApi';
import ParticipationBO from '../../AppApi/ParticipationBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Zeigt die ParticipationForm von der Dozenten View
 * 
 */

class ParticipationForm extends Component {

  constructor(props) {
    super(props);

    let m = '';
    if (props.student) {
      m = props.student.matr_nr;
      
    }

    // Init the state
    this.state = {
      
      matr_nr: m,
      matr_nrValidationFailed: false,
      matr_nrEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null,
      student: ''
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  getStudentByMatrikelNummer = (matr_nr) => {
    var api = AppApi.getAPI()
    api.getStudentByMatrikelNummer(matr_nr).then(student =>
      this.setState({
        student: student,
        loadingInProgress: false, // loading indicator 
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          student: null,
          loadingInProgress: false,
          loadingError: e,
        })
      );

    // set loading to true
    this.setState({
      balance: 'loading',
      loadingInProgress: true,
      loadingError: null
    });
  }

  setStudent = (student) => {
    this.props.setStud(student)  
  }

  /** Updates the participation */
  updateParticipation = () => {
    this.setStudent(this.state.student)
    // clone the original participation, in case the backend call fails
    let updatedParticipation = Object.assign(new ParticipationBO(), this.props.participation);
    
    // set the new attributes from our dialog
    // console.log(this.state.student.id)
    updatedParticipation.setStudent(this.state.student.id);
    // console.log(updatedParticipation)
    
    AppApi.getAPI().updateParticipation(updatedParticipation).then(participation => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.matr_nr = this.state.matr_nr;
      this.props.onClose(updatedParticipation);      // call the parent with the new participation
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // disable loading indicator 
        updatingError: e                        // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,                 // show loading indicator
      updatingError: null                       // disable error message
    });
  }

  /** Handles value changes of the forms textfields and validates them */
  textFieldValueChange = (event) => {
    const value = event.target.value;

    this.setState({
      [event.target.id]: event.target.value,
    });

    if(value.length === 5){
      this.getStudentByMatrikelNummer(event.target.value)
    
      this.setState({
        matr_nrValidationFailed: false,
      })
    }

    else if(value.length <5) {
      this.setState({
        matr_nrValidationFailed: true,
      })
    }
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { classes, participation, show } = this.props;
    const { matr_nr, matr_nrValidationFailed, matr_nrEdited, addingInProgress,updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{title}
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {header}
            </DialogContentText>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField autoFocus type='text' required fullWidth margin='normal' id='matr_nr' label='Matrikelnummer:' value={matr_nr} 
                onChange={this.textFieldValueChange} error={matr_nrValidationFailed} 
                helperText={matr_nrValidationFailed ? 'Bitte geben Sie 5 Zeichen ein' : ' '} />
            </form>
            <div>
          <Typography className={classes.participationEntry}>      
             {"Ausgewählter Student:" +" "} {this.state.student.name}
          </Typography>
             </div>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
            <ContextErrorMessage error={updatingError} contextErrorMsg={`The participation ${participation.getID()} could not be updated.`} onReload={this.updateParticipation} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a participation is given, show an update button, else an add button
              participation ?
                <Button disabled={matr_nrValidationFailed} variant='contained' onClick={this.updateParticipation} color='primary'>
                  Update
              </Button>
                : <Button disabled={matr_nrValidationFailed || !matr_nrEdited} variant='contained' onClick={this.addProject} color='primary'>
                  Add
             </Button>
            }
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

/** PropTypes */
ParticipationForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ParticipationBO to be edited */
  participation: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**  
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created ParticipationBO as parameter or null, if cancel was pressed.
   *  
   * Signature: onClose(ParticipationBO participation);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ParticipationForm);
