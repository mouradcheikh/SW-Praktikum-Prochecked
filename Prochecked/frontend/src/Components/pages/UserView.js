import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import { Link as RouterLink } from 'react-router-dom'
// import './App.css';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class UserView extends Component {

    constructor(props) {
      super(props);
    }

    viewRole= function() {
      console.log("clicked")
    };

render () {
  const { classes } = this.props;

	return(
        <div>
          <center>
                <h1>Bitte wählen Sie Ihre Rolle:</h1>
                <div>
                <Link to='/StudentView'>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button} onClick = {e => this.viewRole()}>Student
                </Button>
                </Link>
                </div>
                <div>
                <Link to='/DozentView'>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    algin="center"
                    className={classes.button} onClick = {e => this.viewRole()}>Dozent
                </Button>
                </Link>
                </div>
                <div>
                <Link to='/AdminView'>
                <Button
                     size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button} onClick = {e => this.viewRole()}>Admin
                </Button>
                </Link>
                </div>
        </center>
      </div>
    );
  }
}

const styles = (theme) => ({
  button: {
    margin: theme.spacing(2),
    width: 170,
    fontSize: 25,
    padding: "15x 0"
  },
})

  export default  withStyles(styles)(UserView);