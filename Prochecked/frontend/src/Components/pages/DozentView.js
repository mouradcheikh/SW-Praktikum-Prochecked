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





function DozentenView(props) {



    // handleProjektErstellen = () => {
    //   this.props.setRole(1);
    //   this.viewRole()
    // }
    // handleProjektErstellen = () => {
    //   this.setState({redirect : "projekterstellen"})
    // }

    // handleBewertung = () => {
    //   this.setState({redirect : "bewertung"})
    // }

    // teilnehmerPflege = () => {
    //   // this.props.person;
    //   // this.viewDozentAction()
    //                 <> 
    //                 <Redirect from='/' to='ProjectList'/>
    //                 <Route exact path='/ProjectList'>
    //                 <ProjectList person = {this.props.person}/>
    //                 </Route>
    //                 </>
    // }

    // viewDozenttAction= function() {
    //   console.log("clicked")
    // };


  const { classes } = props;

  // if (this.state.redirect === "projekterstellen"){
  //     return(
  //           <> 
  //           <Route path='/CreateProject' render={ProjektFormular}>
  //           </Route>
  //           </> 
  //     )
  // }
  // else if (this.state.redirect === "bewertung"){
  //     return(
  //       <> 
  //           <Redirect from='/' to='ProjectList'/>
  //           <Route exact path='/ProjectList'>
  //           <ProjectList person = {this.props.person}/>
  //           </Route>
  //           </>
  //     )
  // }

	return(
        <div>
          <center>
            <div>
                <h1>Wählen Sie einen der folgenden Optionen aus:</h1>
                <Link to = '/CreateProject'>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    // onClick = {this.handleProjektErstellen}
                >
                            Projekt erstellen
                    
                </Button>
                </Link>
            </div>
                
                <div>


                <Link to = '/ProjectList'>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    algin="center"
                    className={classes.button}
                    // onClick = {this.handleBewertung}
                    
                >
                            Bewertung und Teilnehmerpflege
                </Button>
                </Link>
                </div>
        </center>
      </div>
    );
  }


const styles = (theme) => ({
  button: {
    margin: theme.spacing(2),
    width: 285,
    fontSize: 25,
    padding: "15x 0"
  },
})

  export default  withStyles(styles)(DozentenView);

