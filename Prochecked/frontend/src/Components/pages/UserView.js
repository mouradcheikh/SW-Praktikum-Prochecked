import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";

/**
 * Es werden die verschiedenen Rollen dargestellt.
 * Der Nutzer kann sich seine  Rolle auswählen und wird dann auf die entsprechende Seite geleitet.
 */

class UserView extends Component {

    handleAdminButtonClicked = () => {
      this.props.setRole(3);
      this.viewRole()
    }

    handleStudentButtonClicked = () => {
      this.props.setRole(1);
      this.props.person.setBerechtigung(1)
      this.viewRole()
    }

    handleDozentButtonClicked = () => {
      this.props.setRole(2);
      this.viewRole()
    }

    viewRole= function() {
      // console.log("clicked")
    };
  

render () {

  const { classes } = this.props;
  console.log("UserView",this.props, this.state)

	return(
        <div>
          <Paper className={classes.paper}>
            <center>
                  <h1 style ={{color: "white"}} >Bitte wählen Sie Ihre Rolle:</h1>
                  <div>
                  <Link to={{
                  pathname: '/StudentLogin',
                  state: { person: this.props.person }
                  }} style={{ textDecoration: 'none' }}
                  >
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
                  pathname: '/DozentView' ,
                  state: { person: this.props.person }
                  }} style={{ textDecoration: 'none'}}>
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
                  <Link to='/AdminView' style={{ textDecoration: 'none' }}
>
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
        </Paper>
      </div>
    );
  }
}

const styles = (theme) => ({
  button: {
    margin: theme.spacing(2),
    width: 170,
    fontSize: 25,
    padding: "15x 0",
    backgroundColor: blueGrey[600],
    borderColor: blueGrey[500],
  },
  paper: {
    height: "80vh",

    backgroundColor: grey[900],
  },
});



export default withStyles(styles)(UserView);

