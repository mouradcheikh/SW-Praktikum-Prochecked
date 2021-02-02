import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Grid} from '@material-ui/core';


/**
 * Startseite für den eingeloggten Dozenten.
 * Falls sich ein Admin als Dozent einwählt, werden Buttons zur Dozenten-Funktionen bereitgestellt.
 */

class DozentenView extends Component{
  constructor(props){
    super(props);

    let person = '';
    let adminProf = false

    if (this.props.location.state.person){
      person = this.props.location.state.person
    }
    if (this.props.location.state.adminProf){
      adminProf= this.props.location.state.adminProf
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
    console.log("DozentView",this.state, this.props)
   

    return(
    
    
    <div className = {classes.root}>
      
      {adminProf?
      
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
    :
    <div className={classes.view}>
      {/* <Container maxWidth = 'lg'> */}
      <Grid container spacing={1} justify = 'center'>
        
        <Grid alignContent = 'center' alignItems = 'center'>
          <Grid>
          <h1 align = 'center' style ={{color: "white"}} >Herzlich Willkommen</h1>
          <h2>Sie haben sich als Dozent eingeloggt</h2>
            
            </Grid>
         
          </Grid>
     
      </Grid>
    </div>
          }
    
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

  export default withStyles(styles)(DozentenView);

