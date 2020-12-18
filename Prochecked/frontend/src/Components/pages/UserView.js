import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import { Link as RouterLink } from 'react-router-dom'
// import './App.css';
import React, { Component } from 'react';
import RoleBO from '../../AppApi/RoleBO'
import {Link} from 'react-router-dom';

class UserView extends Component {

    constructor(props) {
      super(props);
    }

    handleAdminButtonClicked = () => {
      this.props.setRole(3);
      this.viewRole()
    }

    handleStudentButtonClicked = () => {
      this.props.setRole(1);
      this.viewRole()
    }

    handleDozentButtonClicked = () => {
      this.props.setRole(2);
      this.viewRole()
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
                    className={classes.button}
                    onClick = {this.handleStudentButtonClicked}
                >
                            Student
                    
                </Button>
                </Link>
                </div>
                <div>
                <Link to={{
                pathname: '/DozentView',
                state: { person: this.props.person }
                }}>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    algin="center"
                    className={classes.button}
                    onClick = {this.handleDozentButtonClicked}
                    
                >
                            Dozent
                    
                </Button>
                </Link>
                </div>
                <div>
                <Link to='/AdminView'>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick = {this.handleAdminButtonClicked}
                    
                 >
                            Admin
                  
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