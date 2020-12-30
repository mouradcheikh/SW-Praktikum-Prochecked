// import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';
// // import { Link as RouterLink } from 'react-router-dom'
// //import './App.css';
// import React, { Component } from 'react';
// // import RoleBO from '../../AppApi/RoleBO'
// import {Link} from 'react-router-dom';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import ProjectList from './ProjectList';
// import ProjektFormular from './ProjektErstellen'
// import UserView from './UserView'
// import { AppApi } from '../../AppApi';


// // function DozentenView(props) {
// class DozentenView extends Component{
//   constructor(props){
//     super(props);
    
//   }

//   render() {
//     const { classes } = this.props;
//     const person = this.props.location.state.person

//     return(<div>
//       <center>
//         <div>
//             <h1>Wählen Sie einen der folgenden Optionen aus:</h1>
//             <Link to={{
//             pathname: '',
//             state: { linkState: person }
//             }}>
//             <Button
//                 size="large"
//                 variant="contained"
//                 color="primary"
//                 className={classes.button}
//             >
//                         Für Projekte registrieren/abmelden
                
//             </Button>
//             </Link>
//   </div>
//             <div>            
//             <Link to={{
//             pathname: '',
//             state: { linkState: person }
//             }}>
//            <Button
//                 size="large"
//                 variant="contained"
//                 color="primary"
//                 algin="center"
//                 className={classes.button}
//                 > 
//                     Semesterbericht einsehen
//             </Button>
//             </Link>
//             </div>
//     </center>
//   </div>
// ); 
// }
// }

// const styles = (theme) => ({
//   button: {
//     margin: theme.spacing(2),
//     width: 285,
//     fontSize: 25,
//     padding: "15x 0"
//   },
// })

//   export default withStyles(styles)(DozentenView);

