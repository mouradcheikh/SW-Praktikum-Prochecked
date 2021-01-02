// import React, { Component } from 'react';
// function AdminView(){
//     return( 
//         <div>
//             <h1> AdminView </h1>
//         </div>
//     );
// }
// export default AdminView;

// class AdminView extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() { 
//         return ( 
//         <div>
//             <h1> AdminView </h1>
//         </div>
//          );
//     }npm install react-theme-loader --save
// }
 
// export default AdminView; 


import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, createMuiTheme, Theme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'gray'
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }),
);

export default function MenuListComposition() {
  const classes = useStyles();

  return (
    
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h1>Was möchten Sie tun?</h1>
        <MenuList>
          <Link to='/ProjectListNew'>
          <MenuItem>Projekte freigeben</MenuItem>
          </Link>
          <Link to='/CreateProject' >
          <MenuItem>Projekte erstellen</MenuItem>
          </Link>
          <Link>
          <MenuItem>X</MenuItem>
          </Link>
        </MenuList>
      </Paper>   
    </div>
  );
}


