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
import {withStyles, Button, List, ListItem, ListItemSecondaryAction, Typography, Input, Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'gray'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function MenuListComposition() {
  const classes = useStyles();

  return (
    
    <div className={classes.root}>
        <Grid container spacing={3}>
        <MenuList>
        <Grid item xs={12}>
        <h3>Admin-Aktionen</h3>
          <Paper className={classes.paper}>
          <Link to='/CreateSemester'>
          <MenuItem>Semester erstellen</MenuItem>
          </Link >
          <Link to='/ProjectListNew'>
          <MenuItem>Projekte freigeben</MenuItem>
          </Link>
          </Paper>
          </Grid>
          <Grid item xs={12}>
          <h3>Dozent-Aktionen</h3>
          <Paper className={classes.paper}>
          <Link to='/DropDown_Dozent' >
          <MenuItem>Projekte erstellen/Bewertung-Teilnehmerpflege von Projekten </MenuItem>
          </Link>
          </Paper>
          </Grid>
          <Grid item xs={12}>
          <h3>Student-Aktionen</h3>
          <Paper className={classes.paper}>
          {/* <Link to='/CreateProject' > */}
          <MenuItem>Student für Projekte registieren</MenuItem>
          {/* <Link to='/CreateProject' > */}
          <MenuItem>Semesterbericht von Student einsehen</MenuItem>
          </Paper>
          </Grid>
        </MenuList>
      </Grid> 
    </div>
  );
}


