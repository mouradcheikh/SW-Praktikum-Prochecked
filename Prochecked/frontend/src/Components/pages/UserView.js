import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import { Link as RouterLink } from 'react-router-dom'
// import './App.css';
import React, { Component } from 'react';

class UserView extends Component {

    constructor(props) {
      super(props);
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
                    onClick = {this.setRole(new RoleBO("Admin"))}
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