import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import { Link as RouterLink } from 'react-router-dom'
import React, { Component } from 'react';
import RoleBO from '../../AppApi/RoleBO'
import {Link} from 'react-router-dom';

class StudentView extends Component {

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
                <h1>Was möchten Sie tun?:</h1>
                <div>
                <Link to='./AvailableProjects'>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick = {this.handleStudentButtonClicked}
                >
                            Projekte Anmelden/Abmelden
                    
                </Button>
                </Link>
                </div>
                <div>
                <Link to='./RegisterProject'>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    algin="center"
                    className={classes.button}
                    onClick = {this.handleDozentButtonClicked}
                    
                >
                   RegisterProject            
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
    width: 300,
    fontSize: 25,
    padding: "15x 0"
  },
})

  export default  withStyles(styles)(StudentView);