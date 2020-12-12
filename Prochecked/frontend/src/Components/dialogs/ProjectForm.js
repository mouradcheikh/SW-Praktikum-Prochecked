import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AppApi, ProjectBO } from '../../AppApi';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


/**
 * Shows a modal form dialog for a ProjectBO in prop project. If the project is set, the dialog is configured 
 * as an edit dialog and the text fields of the form are filled from the given ProjectBO object. 
 * If the project is null, the dialog is configured as a new project dialog and the textfields are empty.
 * In dependency of the edit/new state, the respective backend calls are made to update or create a project. 
 * After that, the function of the onClose prop is called with the created/update ProjectBO object as parameter.  
 * When the dialog is canceled, onClose is called with null.
 * 
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 * @see See Material-UIs [TextField](https://material-ui.com/components/text-fields//)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ProjectForm extends Component {

  constructor(props) {
    super(props);

    let n = '';
    if (props.project) {
      n = props.project.getName();
      
    }

    // Init the state
    this.state = {
      
      name: n,
      nameValidationFailed: false,
      nameEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the project */
  addProject = () => {
    let newProject = new ProjectBO(this.state.name);
    AppAPI.getAPI().addProject(newProject).then(project => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty project
      this.setState(this.baseState);
      this.props.onClose(project); // call the parent with the project object from backend
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // disable loading indicator 
        updatingError: e              // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,       // show loading indicator
      updatingError: null             // disable error message
    });
  }

  /** Updates the project */
  updateProject = () => {
    // clone the original project, in case the backend call fails
    let updatedProject = Object.assign(new ProjectBO(), this.props.project);
    // set the new attributes from our dialog
    updatedProject.setName(this.state.name);
    
    AppAPI.getAPI().updateProject(updatedProject).then(project => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.name = this.state.name;
      this.props.onClose(updatedProject);      // call the parent with the new project
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

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { classes, project, show } = this.props;
    const { name, nameValidationFailed, nameEdited, addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (project) {
      // project defindet, so ist an edit dialog
      title = 'Update a project';
      header = `Project ID: ${project.getID()}`;
    } else {
      title = 'Create a new project';
      header = 'Enter project data';
    }

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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='name' label='name:' value={name} 
                onChange={this.textFieldValueChange} error={nameValidationFailed} 
                helperText={nameValidationFailed ? 'The name must contain at least one character' : ' '} />

            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of project prop
              project ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The project ${project.getID()} could not be updated.`} onReload={this.updateProject} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The project could not be added.`} onReload={this.addProject} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a project is given, show an update button, else an add button
              project ?
                <Button disabled={nameValidationFailed} variant='contained' onClick={this.updateProject} color='primary'>
                  Update
              </Button>
                : <Button disabled={nameValidationFailed || !nameEdited} variant='contained' onClick={this.addProject} color='primary'>
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
ProjectForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be edited */
  project: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**  
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created ProjectBO as parameter or null, if cancel was pressed.
   *  
   * Signature: onClose(ProjectBO project);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjectForm);
