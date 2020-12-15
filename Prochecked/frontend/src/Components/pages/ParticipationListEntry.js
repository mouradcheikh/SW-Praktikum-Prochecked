//getParticipationByProject()

//getPersonByParticipation()

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, ListItem, ListItemSecondaryAction, Link, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import { Link as RouterLink } from 'react-router-dom';
import { AppApi } from '../../AppApi';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';
// import MoneyTransferDialog from './dialogs/MoneyTransferDialog'; Noten Dialog 


/**
 * Renders a ParticipationBO object within a ListEntry and provides a delete button to delete it. Links participations 
 * to a list of transactions. This is done by routing the link to /transactions and passing the ProjectBO and
 * the ParticipationBO as props to the ParticipationList component. It also shows a MoneyTransferDialog to transfer money.
 * 
 * @see See Material-UIs [Lists](https://material-ui.com/components/lists/)
 * @see See Material-UIs [ListItem](https://material-ui.com/api/list-item/)
 * @see See Material-UIs [Link](https://material-ui.com/components/links/)
 * @see See Material-UIs React Router integration [Composition](https://material-ui.com/guides/composition/#link)
 * @see See React Router [ReactRouter](https://reacttraining.com/react-router/web/guides/quick-start)
 * @see See React Router [Link](https://reacttraining.com/react-router/web/api/Link)
 * 
 * @see See [MoneyTransferDialog](#moneytransferdialog)
 * @see See [TransactionList](#transactionlist)
 * 
 * 
 */

class ParticipationListEntry extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      student: '',
      loadingInProgress: false,
      deletingInProgress: false,
      loadingError: null,
      deletingError: null,
      // showMoneyTransferDialog: false,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // load initial balance
    this.getStudent();
  }

  /** Lifecycle method, which is called when the component was updated */
  componentDidUpdate(prevProps) {
    if ((this.props.show) && (this.props.show !== prevProps.show)) {
      this.getStudent();
    }
  }

  /** gets the students for this participation */

  
  getStudent = () => {
    var api = AppApi.getAPI()
    api.getStudent(this.props.participation.getStudent_id()).then(student =>
      this.setState({
        student: student,
        loadingInProgress: false, // loading indicator 
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          student: null,
          loadingInProgress: false,
          loadingError: e
        })
      );

    // set loading to true
    this.setState({
      balance: 'loading',
      loadingInProgress: true,
      loadingError: null
    });
  }

  /** Deletes this participation */
  deleteParticipation = () => {
    const { participation } = this.props;
    var api = AppApi.getAPI()
    api.deleteParticipation(participation.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      })
      // console.log(participation);
      this.props.onParticipationDeleted(participation);
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        deletingInProgress: false,
        deletingError: e
      })
    );

    // set loading to true
    this.setState({
      deletingInProgress: true,
      deletingError: null
    });
  }

  // /** Handles click events from the transfer money button */
  // transferMoney = () => {
  //   this.setState({
  //     showMoneyTransferDialog: true
  //   });
  // }

  // /** Handles the onClose event from the transfer money dialog */
  // moneyTransferDialogClosed = (transaction) => {
  //   this.setState({
  //     showMoneyTransferDialog: false
  //   });
  //   if (transaction) {
  //     // Transaction is not null and therefore was performed
  //     this.getBalance();
  //   }
  // }

  /** Renders the component */
  render() {
    const { classes, project, participation } = this.props;
    const { loadingInProgress, deletingInProgress, loadingError, deletingError, balance, showMoneyTransferDialog } = this.state;

    return (
      <div>
        <ListItem>
          <Typography className={classes.participationEntry}>
            <Link component={RouterLink} to={{
              pathname: '/transactions',
              owner: {
                project: project,
                participation: participation
              }
            }} >
              Participation ID: {participation.getID()}
            </Link>

          </Typography>
          <Typography color='textSecondary'>
            Balance: {!isNaN(balance) ? AppApi.getAPI().getCurrencyFormatter().format(balance) : balance}
          </Typography>
          <ListItemSecondaryAction>
            <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' startIcon={<SwapHoriz />} onClick={this.transferMoney}>
              Transfer
            </Button>
            <Button color='secondary' size='small' startIcon={<DeleteIcon />} onClick={this.deleteParticipation}>
              Delete
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <LoadingProgress show={loadingInProgress || deletingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The balance of participation ${participation.getID()} could not be loaded.`} onReload={this.getBalance} />
          <ContextErrorMessage error={deletingError} contextErrorMsg={`The participation ${participation.getID()} could not be deleted.`} onReload={this.deleteParticipation} />
        </ListItem>
        {/* <MoneyTransferDialog show={showMoneyTransferDialog} project={project} participation={participation} onClose={this.moneyTransferDialogClosed} /> */}
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%'
  }, 
  buttonMargin: {
    marginRight: theme.spacing(2),
  },
  participationEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

/** PropTypes */
ParticipationListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO of this ParticipationListEntry */
  project: PropTypes.object.isRequired,
  /** The ParticipationBO to be rendered */
  participation: PropTypes.object.isRequired,
  /**  
   * Event Handler function which is called after a sucessfull delete of this participation. 
   * 
   * Signature: onParticipationDeleted(ParticipationBO participation); 
   */
  onParticipationDeleted: PropTypes.func.isRequired,
  /** If true, balance is (re)loaded */
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(ParticipationListEntry);
