import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
//import AccountList from './AccountList';


/**
 * Renders a PersonBO object within a expandable/collapsible PersonListEntry with the person manipulation
 * functions. If expanded, it renders a AccountList.
 * 
 * @see See [AccountList](#accountlist)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class PersonListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      person: props.person,
      showPersonForm: false,
      showPersonDeleteDialog: false,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.person);
  }

  /** Handles onAccountDelete events from an AccountListEntry  */
//   deleteAccountHandler = (deletedAccount) => {
//     // console.log(deletedAccount.getID());
//     this.setState({
//       accounts: this.state.accounts.filter(account => account.getID() !== deletedAccount.getID())
//     })
//   }

  /** Handles the onClick event of the edit person button */
  editPersonButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showPersonForm: true
    });
  }

  /** Handles the onClose event of the PersonForm */
  personFormClosed = (person) => {
    // person is not null and therefor changed
    if (person) {
      this.setState({
        person: person,
        showPersonForm: false
      });
    } else {
      this.setState({
        showPersonForm: false
      });
    }
  }

  /** Handles the onClick event of the delete person button */
  deletePersonButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showPersonDeleteDialog: true
    });
  }

  /** Handles the onClose event of the PersonDeleteDialog */
  deletePersonDialogClosed = (person) => {
    // if person is not null, delete it
    if (person) {
      this.props.onPersonDeleted(person);
    };

    // Don´t show the dialog
    this.setState({
      showPersonDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states person
    const { person, showPersonForm, showPersonDeleteDialog } = this.state;

    // console.log(this.state);
    return (
        <div>
        <Grid item>
                <Typography variant='body1' className={classes.heading}>{person.getName()}
                </Typography>
              </Grid>
              <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editPersonButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deletePersonButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>

        </div>)

      /*<div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`person${person.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{person.getName()}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editPersonButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deletePersonButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of accounts</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <AccountList show={expandedState} person={person} />
          </AccordionDetails>
        </Accordion>
        <PersonForm show={showPersonForm} person={person} onClose={this.personFormClosed} />
        <PersonDeleteDialog show={showPersonDeleteDialog} person={person} onClose={this.deletePersonDialogClosed} />
      </div>
    );*/
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
PersonListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The PersonBO to be rendered */
  person: PropTypes.object.isRequired,
  /** The state of this PersonListEntry. If true the person is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this PersonListEntry 
   * 
   * Signature: onExpandedStateChange(PersonBO person)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /** 
   *  Event Handler function which is called after a sucessfull delete of this person.
   * 
   * Signature: onPersonDelete(PersonBO person)
   */
  onPersonDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(PersonListEntry);
