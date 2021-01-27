import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import { Link as RouterLink } from 'react-router-dom'
//import './App.css';
import React, { Component } from 'react';
// import RoleBO from '../../AppApi/RoleBO'
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ProjectList from './ProjectList';
import ProjektFormular from './ProjektErstellen'
import UserView from './UserView'
import { AppApi } from '../../AppApi';


// function DozentenView(props) {
class DozentenView extends Component{
  constructor(props){
    super(props);

    let person = '';
    let adminProf = '';

    if (this.props.location.state.person){
      person = this.props.location.state.person
    }
    if (this.props.location.state.adminProf){
      person = this.props.location.state.adminProf
    }

    this.state = {
      DozentList : null,
      person: person,
      adminProf: adminProf
  };
  }

  render() {
    const { classes } = this.props;
    const { person, adminProf} =this.state;
    // const person = this.props.location.state.person
    // const adminProf = this.props.location.state.prof
    // console.log(this.props.location.state.person)
    // console.log(this.props.location.state.prof)
    console.log(this.state, this.props)

    return(<div>
      <center>
        <div>
            <h1>Wählen Sie einen der folgenden Optionen aus:</h1>
            <Link to={{
            pathname: '/CreateProject',
            state: { linkState: person, adminProf: adminProf},
            }} style={{ textDecoration: 'none' }}>
            <Button
                size="large"
                variant="contained"
                color="primary"
                className={classes.button}
            >
                        Projekt erstellen
                
            </Button>
            </Link>
        </div>
            <div>            
            <Link to={{
            pathname: '/ProjectList',
            state: { linkState: person, adminProf: adminProf},
            }} style={{ textDecoration: 'none' }}>
           <Button
                size="large"
                variant="contained"
                color="primary"
                algin="center"
                className={classes.button}
                > 
                    Bewertung und Teilnehmerpflege
            </Button>
            </Link>
            </div>
            <div>            
            <Link to={{
              
            pathname: '/GradeList',
            state: { person: person},
            }} style={{ textDecoration: 'none' }}>
           <Button
                size="large"
                variant="contained"
                color="primary"
                algin="center"
                className={classes.button}
    
                > 
                    Notenliste
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

  export default withStyles(styles)(DozentenView);

