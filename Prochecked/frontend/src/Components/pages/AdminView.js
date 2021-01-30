import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, createMuiTheme, Theme } from '@material-ui/core/styles';
import {withStyles, Button, List, ListItem, ListItemSecondaryAction, Typography, Input, Grid, Container } from '@material-ui/core';
import {Link} from 'react-router-dom';
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 660 ,
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: 'gray'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
      backgroundColor: 'white',
    },
  })
);

export default function AdminView(props) {
  const classes = useStyles();
  console.log("AdminView",this.props, this.state)

  return (
    <div className={classes.root}>
      {/* <Container maxWidth = 'lg'> */}
      <Grid container spacing={1} justify = 'center'>
        
        <Grid alignContent = 'center' alignItems = 'center'>
          <Grid>
          <h1 align = 'center' style ={{color: "white"}} >Herzlich Willkommen</h1>
          <h2>Sie haben sich als Admin eingeloggt</h2>
            
            </Grid>
         
          </Grid>
     
      </Grid>
    {/* </Container> */}
    </div>
  );
}
