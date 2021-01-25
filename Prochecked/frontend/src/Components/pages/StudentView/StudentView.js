import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import { Link as RouterLink } from 'react-router-dom'
//import './App.css';
import React, { Component } from 'react';
// import RoleBO from '../../AppApi/RoleBO'
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ProjectList from '../ProjectList';
import ProjektFormular from '../ProjektErstellen'
import UserView from '../UserView'
import StudentLogin from './StudentLogin'
import ProjectListStudent from './ProjectListStudent'
import { AppApi } from '../../../AppApi/AppApi'
// import Sidebar from '../../../Components/layout/Sidebar';


// function StudentView(props) {
class StudentView extends Component{
  constructor(props){
    super(props);

    
    let student = '';
    let person = '';

    if (this.props.location.state.person){ //ohne .state. evtl?
      person = this.props.location.state.person
    }
    if (this.props.location.state.student){ //evtl state wieder rain ???
      student = this.props.location.state.student
    }

    this.state = {
      // person: this.props.location.state.person,
      // student: this.props.location.state.student
      person: person,
      student:student,
    }
    
  }

  render() {
    const { classes } = this.props;
    // const person = this.props.location.state.person
    // const student = this.props.location.state.student
    const{ person, student} = this.state;
    // console.log(this.state)

    return(
    <div>
      <center>
        <div>
            <h1>Wählen Sie einen der folgenden Optionen aus:</h1>
            
            <Link to={{
            pathname: '/ProjectListStudent',
            state: { linkState: person, student: student}
            }} style={{ textDecoration: 'none' }}>
            <Button
                size="large"
                variant="contained"
                color="primary"
                className={classes.button}
            >
                        Für Projekte registrieren
                        /abmelden
                
            </Button>
            </Link>
  </div>
            <div>            
            <Link to={{
            pathname: '/Semesterbericht',
            state: { linkState: person, student: student }
            }} style={{ textDecoration: 'none' }}>
           <Button
                size="large"
                variant="contained"
                color="primary"
                algin="center"
                className={classes.button}
                > 
                    Semesterbericht einsehen
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
    width: 285,
    fontSize: 25,
    padding: "15x 0"
  },
})

  export default withStyles(styles)(StudentView);

