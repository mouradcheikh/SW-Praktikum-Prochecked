import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import { Link as RouterLink } from 'react-router-dom'
// import './App.css';
import React, { Component } from 'react';
import RoleBO from '../../AppApi/RoleBO'

class UserView extends Component {

    constructor(props) {
      super(props);
    }

    handleAdminButtonClicked = () => {
      this.props.setRole("Admin");
    }

    handleStudentButtonClicked = () => {
      this.props.setRole("Student");
    }

    handleDozentButtonClicked = () => {
      this.props.setRole("Dozent");
    }


render () {
  const { classes } = this.props;

	return(
        <div>
          <center>
                <h1>Ich bin ein ...</h1>
                <div>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick = {this.handleStudentButtonClicked}
                >
                            Student
                </Button>
                </div>
                <div>
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
                </div>
                <div>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick = {this.handleAdminButtonClicked}
                 >
                            Admin
                </Button>
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