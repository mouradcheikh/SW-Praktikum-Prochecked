import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, IconButton, Avatar, ClickAwayListener, withStyles, Typography, Paper, Button, Grid } from '@material-ui/core';
import firebase from 'firebase/app';

/**
 * Zeigt das Profil DropDown im Header in der Sidebar. 
 * 
 */

class ProfileDropDown extends Component {

  // a refernce to the avatar button
  #avatarButtonRef = createRef();

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      open: false,
    }
  }

  /** Handles click events on the avatar button and toggels visibility */
  handleAvatarButtonClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  /** 
   * Handles click events from the ClickAwayListener.
   * 
   * @see See Material-UIs [ClickAwayListener](https://material-ui.com/components/click-away-listener/)
   */
  handleClose = () => {
    this.setState({
      open: false
    });
  }

  /** 
	 * Handles the click event of the sign in button and uses the firebase.auth() component to sign in.
	 * 
	 * @see See Google [firebase.auth](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signOut](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout)
	 */
  handleSignOutButtonClicked = () => {
    firebase.auth().signOut();
  }

  /** Renders the profile drop down if a loggin user is given as a prop */
  render() {
    const { classes, person } = this.props;
    const { open } = this.state;

    return (
      person ?
        <div>
          <IconButton className={classes.avatarButton} ref={this.#avatarButtonRef} onClick={this.handleAvatarButtonClick}>
            <Avatar src={person.photoURL} />
          </IconButton>

          <Popover open={open} anchorEl={this.#avatarButtonRef.current} onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <ClickAwayListener onClickAway={this.handleClose}>
              <Paper className={classes.profileBox}>
                <Typography align='center'>Mein Profil</Typography>
                
                <Grid container justify='center'>
                  <Grid item>
                    <Button color='primary' onClick={this.handleSignOutButtonClicked}>Abmelden</Button>
                  </Grid>
                </Grid>
              </Paper>
            </ClickAwayListener>
          </Popover>
        </div>
        : null
    )
  }
}

/** Component specific styles */
const styles = theme => ({
  avatarButton: {
    float: 'right'
  },
  divider: {
    margin: theme.spacing(1),
  },
  profileBox: {
    padding: theme.spacing(1),
    background: theme.palette.background.default,
  }
});

/** PropTypes */
ProfileDropDown.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default withStyles(styles)(ProfileDropDown)
