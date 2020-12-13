//getParticipationByProject()

//getPersonByParticipation()

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, ListItem, ListItemSecondaryAction, Link, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import { Link as RouterLink } from 'react-router-dom';
import { AppApi } from '../AppApi';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
// import MoneyTransferDialog from './dialogs/MoneyTransferDialog'; Noten Dialog 


/**
 * Renders a ParticipationBO object within a ListEntry and provides a delete button to delete it. Links accounts 
 * to a list of transactions. This is done by routing the link to /transactions and passing the CustomerBO and
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
      balance: '',
      loadingInProgress: false,
      deletingInProgress: false,
      loadingError: null,
      deletingError: null,
      showMoneyTransferDialog: false,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // load initial balance
    this.getBalance();
  }

  /** Lifecycle method, which is called when the component was updated */
  componentDidUpdate(prevProps) {
    if ((this.props.show) && (this.props.show !== prevProps.show)) {
      this.getBalance();
    }
  }

  /** gets the balance for this account */
  getBalance = () => {
    BankAPI.getAPI().getBalanceOfAccount(this.props.account.getID()).then(balance =>
      this.setState({
        balance: balance,
        loadingInProgress: false, // loading indicator 
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          balance: null,
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

  /** Deletes this account */
  deleteAccount = () => {
    const { account } = this.props;
    BankAPI.getAPI().deleteAccount(account.getID()).then(() => {
      this.setState({  // Set new state when AccountBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      })
      // console.log(account);
      this.props.onAccountDeleted(account);
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

  /** Handles click events from the transfer money button */
  transferMoney = () => {
    this.setState({
      showMoneyTransferDialog: true
    });
  }

  /** Handles the onClose event from the transfer money dialog */
  moneyTransferDialogClosed = (transaction) => {
    this.setState({
      showMoneyTransferDialog: false
    });
    if (transaction) {
      // Transaction is not null and therefore was performed
      this.getBalance();
    }
  }

  /** Renders the component */
  render() {
    const { classes, customer, account } = this.props;
    const { loadingInProgress, deletingInProgress, loadingError, deletingError, balance, showMoneyTransferDialog } = this.state;

    return (
      <div>
        <ListItem>
          <Typography className={classes.accountEntry}>
            <Link component={RouterLink} to={{
              pathname: '/transactions',
              owner: {
                customer: customer,
                account: account
              }
            }} >
              Participation ID: {account.getID()}
            </Link>

          </Typography>
          <Typography color='textSecondary'>
            Balance: {!isNaN(balance) ? BankAPI.getAPI().getCurrencyFormatter().format(balance) : balance}
          </Typography>
          <ListItemSecondaryAction>
            <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' startIcon={<SwapHoriz />} onClick={this.transferMoney}>
              Transfer
            </Button>
            <Button color='secondary' size='small' startIcon={<DeleteIcon />} onClick={this.deleteAccount}>
              Delete
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <LoadingProgress show={loadingInProgress || deletingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The balance of account ${account.getID()} could not be loaded.`} onReload={this.getBalance} />
          <ContextErrorMessage error={deletingError} contextErrorMsg={`The account ${account.getID()} could not be deleted.`} onReload={this.deleteAccount} />
        </ListItem>
        <MoneyTransferDialog show={showMoneyTransferDialog} customer={customer} account={account} onClose={this.moneyTransferDialogClosed} />
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
  accountEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

/** PropTypes */
ParticipationListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO of this ParticipationListEntry */
  customer: PropTypes.object.isRequired,
  /** The ParticipationBO to be rendered */
  account: PropTypes.object.isRequired,
  /**  
   * Event Handler function which is called after a sucessfull delete of this account. 
   * 
   * Signature: onParticipationDeleted(ParticipationBO account); 
   */
  onParticipationDeleted: PropTypes.func.isRequired,
  /** If true, balance is (re)loaded */
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(ParticipationListEntry);
