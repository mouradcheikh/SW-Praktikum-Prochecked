import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AppApi } from '../../AppApi';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';
import ParticipationListEntry from './ParticipationListEntry';

/**
 * Renders a list of ParticipationListEntry objects.
 * 
 * @see See [ParticipationListEntry](#participationlistentry)
 * 
 */
class ParticipationList extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      participations: [],
      loadingInProgress: false,
      loadingParticipationError: null,
      addingParticipationError: null,
    };
  }

  /** Fetches ParticipationBOs for the current customer */
  getParticipationsByProject = () => {
    console.log("vor fetch")

      var api = AppApi.getAPI()
      api.getParticipationsByProject(this.props.project.getID())
        .then(participationBOs =>
          this.setState({               // Set new state when ParticipationBOs have been fetched
            participations: participationBOs,
            filteredParticipations: [...participationBOs], // store a copy
            loadingInProgress: false,   // disable loading indicator
            error: null
          })).catch(e =>
            this.setState({             // Reset state with error from catch
              participations: [],
              loadingInProgress: false, // disable loading indicator
              error: e
            })
          );
  
      // set loading to true
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getParticipationsByProject(); //props richtig ??
  }

  /** Lifecycle method, which is called when the component was updated */
  componentDidUpdate(prevProps) {
    // reload participations if shown state changed. Occures if the ProjectListEntrys ExpansionPanel was expanded
    // if ((this.props.show !== prevProps.show)) {
    //   this.getAccounts();
    // }
  }

  /** Adds an participation for the current customer */
//   addAccount = () => {
//     BankAPI.getAPI().addAccountForCustomer(this.props.customer.getID()).then(accountBO => {
//       // console.log(participationBO)
//       this.setState({  // Set new state when AccountBOs have been fetched
//         accounts: [...this.state.accounts, accountBO],
//         loadingInProgress: false, // loading indicator 
//         addingParticipationError: null
//       })
//     }).catch(e =>
//       this.setState({ // Reset state with error from catch 
//         accounts: [],
//         loadingInProgress: false,
//         addingAccountError: e
//       })
//     );

//     // set loading to true
//     this.setState({
//       loadingInProgress: true,
//       addingParticipationError: null
//     });
//   }

//   /** Handles onAccountDelete events from an AccountListEntry  */
//   deleteAccountHandler = (deletedAccount) => {
//     // console.log(deletedAccount.getID());
//     this.setState({
//       participations: this.state.participations.filter(account => account.getID() !== deletedAccount.getID())
//     })
//   }

  /** Renders the component */
  render() {
    const { classes, project } = this.props;
    // Use the states project
    const { participations, loadingInProgress, loadingParticipationError, addingParticipationError } = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>
        <List className={classes.participationList}>
          {
            participations.map(participation => <ParticipationListEntry key={participation.getID()} project={project} participation={participation} onParticipationDeleted={this.deleteParticipationHandler}
              show={this.props.show} />)
          }
          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={loadingParticipationError} contextErrorMsg={`List of participations for project ${project.getID()} could not be loaded.`} onReload={this.getParticipations} />
            {/* <ContextErrorMessage error={addingParticipationError} contextErrorMsg={`Participation for customer ${customer.getID()} could not be added.`} onReload={this.addParticipation} /> */}
          </ListItem>
        </List>
        {/* <Button className={classes.addParticipationButton} variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addParticipation}>
          Add Account
        </Button> */}
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  participationList: {
    marginBottom: theme.spacing(2),
  },
//   addAccountButton: {
//     position: 'absolute',
//     right: theme.spacing(3),
//     bottom: theme.spacing(1),
//   }
});

/** PropTypes */
ParticipationList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO of this ParticipationList */
  project: PropTypes.object.isRequired,
  /** If true, participations are (re)loaded */
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(ParticipationList);
