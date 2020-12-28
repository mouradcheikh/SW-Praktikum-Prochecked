import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AppAPI  from '../../AppApi/AppApi';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Shows a modal delete/cancle dialog, which asks for deleting a person. The PersonBO to be deleted must be given in prop person. 
 * In dependency of the user interaction (delete/cancel) the respective backendcall is made. After that, the function of the onClose prop 
 * is called with the deleted PersonBO object as parameter. When the dialog is canceled, onClose is called with null.
 * 
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 */
class PersonDeleteDialog extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      deletingInProgress: false,
      deletingError: null
    };
  }

  /** Delete the person */
  deletePerson = () => {
    AppAPI.getAPI().deletePerson(this.props.person.getID()).then(person => {
      this.setState({
        deletingInProgress: false,              // disable loading indicator  
        deletingError: null                     // no error message
      });
      this.props.onClose(this.props.person);  // call the parent with the deleted person
    }).catch(e =>
      this.setState({
        deletingInProgress: false,              // disable loading indicator 
        deletingError: e                        // show error message
      })
    );

    // set loading to true
    this.setState({
      deletingInProgress: true,                 // show loading indicator
      deletingError: null                       // disable error message
    });
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // console.log(event);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { classes, person, show } = this.props;
    const { deletingInProgress, deletingError } = this.state;

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='delete-dialog-title'>Delete person
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Really delete person '{person.getName()}' (ID: {person.getID()})?
            </DialogContentText>
            <LoadingProgress show={deletingInProgress} />
            <ContextErrorMessage error={deletingError} contextErrorMsg={`The person '${person.getName()} ' (ID: ${person.getID()}) could not be deleted.`}
              onReload={this.deletePerson} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button variant='contained' onClick={this.deletePerson} color='primary'>
              Delete
            </Button> 
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

/** PropTypes */
PersonDeleteDialog.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The PersonBO to be deleted */
  person: PropTypes.object.isRequired,
  /** If true, the dialog is rendered */
  show: PropTypes.bool.isRequired,
  /**  
   * Handler function which is called, when the dialog is closed.
   * Sends the deleted PersonBO as parameter or null, if cancel was pressed.
   *  
   * Signature: onClose(PersonBO person);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(PersonDeleteDialog);
