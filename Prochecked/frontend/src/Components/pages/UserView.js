import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper } from '@material-ui/core';
import { BankAPI } from '../api';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';

class UserView extends Component {

    constructor(props) {
      super(props);

      // Init state
      this.state = {
        loadingInProgress: false,
        loadingError: null,
      };
    }
}