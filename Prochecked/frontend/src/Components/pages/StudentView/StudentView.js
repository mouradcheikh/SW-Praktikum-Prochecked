import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { AppApi } from '../../../AppApi/AppApi'

class StudentView extends Component{
  constructor(props){
    super(props);

    
    let student = '';
    let person = '';
    let adminStudent = false;

    if (this.props.location.state.person){ //ohne .state. evtl?
      person = this.props.location.state.person
    }
    if (this.props.location.state.student){ //evtl state wieder rain ???
      student = this.props.location.state.student
    }
    if (this.props.location.state.adminStudent){
      adminStudent= this.props.location.state.adminStudent
    }

    this.state = {
      // person: this.props.location.state.person,
      // student: this.props.location.state.student
      person: person,
      student:student,
      adminStudent: adminStudent
    }
    
  }

  render() {
    const { classes } = this.props;

    const{ person, student, adminStudent} = this.state;
    console.log(this.state)

    return(

    

    <div className = { classes.root}>

      {adminStudent?

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
    :
    <div className={classes.view}>
      {/* <Container maxWidth = 'lg'> */}
      <Grid container spacing={1} justify = 'center'>
        
        <Grid alignContent = 'center' alignItems = 'center'>
          <Grid>
          <h1 align = 'center' style ={{color: "white"}} >Herzlich Willkommen</h1>
          <h2>Sie haben sich als Student eingeloggt</h2>
            
            </Grid>
         
          </Grid>
     
      </Grid>
   
    </div>
          }
    
  {/* </div> */}
  

  </div>
  
); 
}
}

const styles = (theme) => ({
  root: {
    height: 650
  },
  button: {
    margin: theme.spacing(2),
    width: 285,
    fontSize: 25,
    padding: "15x 0"
  },
})

  export default withStyles(styles)(StudentView);

