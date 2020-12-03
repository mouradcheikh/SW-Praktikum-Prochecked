import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AdminView from './AdminView';
// import StudentView from './Components/pages/StudentView';
// import DozentView from './Components/pages/DozentView';
// import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


class UserView extends Component {

    constructor(props) {
      super(props);
    }
    
    handleAdminButtonClicked = () => {
     // this.props.onAdmin();
        
    }

    handleStudentButtonClicked = () => {
      //this.props.onStudent();

    }

    handleDozentButtonClicked = () => {
      //this.props.onDozent();
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
                <Button  onClick={this.handleAdminButtonClicked}
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
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