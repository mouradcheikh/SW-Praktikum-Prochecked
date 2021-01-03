import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AppApi} from '../../AppApi';
import ParticipationBO from '../../AppApi/ParticipationBO';
// import AppAPI  from '../../AppApi/AppApi';
import StudentBO from '../../AppApi/StudentBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';



/**
 * Shows a modal form dialog for a ParticipationBO in prop participation. If the participation is set, the dialog is configured 
 * as an edit dialog and the text fields of the form are filled from the given ParticipationBO object. 
 * If the participation is null, the dialog is configured as a new participation dialog and the textfields are empty.
 * In dependency of the edit/new state, the respective backend calls are made to update or create a participation. 
 * After that, the function of the onClose prop is called with the created/update ParticipationBO object as parameter.  
 * When the dialog is canceled, onClose is called with null.
 * 
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 * @see See Material-UIs [TextField](https://material-ui.com/components/text-fields//)
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

  // setStudent = (student) => {
  //   this.props.setStudent(student)  
  // }

  /** Updates the participation */
  updateParticipation = () => {
    console.log(this.props.participation)
    // clone the original participation, in case the backend call fails
    let updatedParticipation = Object.assign(new ParticipationBO(), this.props.participation);
    
    // set the new attributes from our dialog
    console.log(this.state.student.id)
    updatedParticipation.setStudent(this.state.student.id);
    console.log(updatedParticipation)
    
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
    const { matr_nr, matr_nrValidationFailed, matr_nrEdited, addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

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
                helperText={matr_nrValidationFailed ? 'The matr_nr must contain at least one character' : ' '} />

            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of participation prop
              // project ?
            <ContextErrorMessage error={updatingError} contextErrorMsg={`The participation ${participation.getID()} could not be updated.`} onReload={this.updateParticipation} />
                // :
                // <ContextErrorMessage error={addingError} contextErrorMsg={`The project could not be added.`} onReload={this.addParticipation} />
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
