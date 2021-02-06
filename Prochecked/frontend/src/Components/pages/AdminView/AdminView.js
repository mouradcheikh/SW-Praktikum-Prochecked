import React from 'react';
import { makeStyles, createStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';

/**
 * Zeigt die Startseite in der AdminView,
 * wenn man sich als Admin im System anmeldet.
 */

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 660 ,
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
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
  
  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify = 'center'>
        
        <Grid alignContent = 'center' alignItems = 'center'>
          <Grid>
          <h1 align = 'center' style ={{color: "white"}} >Herzlich Willkommen</h1>
          <h2>Sie haben sich als Admin eingeloggt</h2>
            </Grid>
          </Grid>
      </Grid>
    </div>
  );
}
