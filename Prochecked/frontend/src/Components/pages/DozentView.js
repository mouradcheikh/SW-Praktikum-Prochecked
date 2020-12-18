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
    this.state = {
      DozentList : null
  };
  }


  render() {
    const { classes } = this.props;
    const person = this.props.location.state.person

    return(<div>
      <center>
        <div>
            <h1>Wählen Sie einen der folgenden Optionen aus:</h1>
            <Link to={{
            pathname: '/CreateProject',
            state: { linkState: person }
            }}>
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

            <Link to={{
            pathname: '/ProjectList',
            state: { linkState: person }
            }}>
           <Button
                size="large"
                variant="contained"
                color="primary"
                algin="center"
                className={classes.button}
                // person={classes.person}
                
                // person={this.props.person}
                // onClick = {this.viewTest2()}
                > 
                    Bewertung und Teilnehmerpflege
            </Button>
            </Link>
            
            
            </div>
    </center>
  </div>
); 

}
}





  // const { classes } = props;

//   if (this.state.redirect === "projekterstellen"){
//       return(
//             <> 
//             <Route path='/CreateProject' render={ProjektFormular}>
//             </Route>
//             </> 
//       )
//   }
//   else if (this.state.redirect === "bewertung"){
//       return(
//         <> 
//             <Redirect from='/' to='ProjectList'/>
//             <Route exact path='/ProjectList'>
//             <ProjectList person = {this.props.person}/>
//             </Route>
//             </>
//       )
//   }
// }

	// return(
  //       <div>
  //         <center>
  //           <div>
  //               <h1>Wählen Sie einen der folgenden Optionen aus:</h1>
  //               <Link to = '/CreateProject'>
  //               <Button
  //                   size="large"
  //                   variant="contained"
  //                   color="primary"
  //                   className={classes.button}
  //                   // onClick = {this.handleProjektErstellen}
  //               >
  //                           Projekt erstellen
                    
  //               </Button>
  //               </Link>
  //           </div>
                
  //               <div>


  //               <Link to = '/ProjectList'>
  //               <Button
  //                   size="large"
  //                   variant="contained"
  //                   color="primary"
  //                   algin="center"
  //                   className={classes.button}
  //                   // person={classes.person}
                    
  //                   // person={this.props.person}
  //                   // onClick = {this.handleBewertung}
  //                   onClick = {props.viewTest2()}
  //               >
  //                           Bewertung und Teilnehmerpflege
  //               </Button>
  //               </Link>
  //               </div>
  //       </center>
  //     </div>
  //   );
  // }


const styles = (theme) => ({
  button: {
    margin: theme.spacing(2),
    width: 285,
    fontSize: 25,
    padding: "15x 0"
  },
})

  export default withStyles(styles)(DozentenView);

