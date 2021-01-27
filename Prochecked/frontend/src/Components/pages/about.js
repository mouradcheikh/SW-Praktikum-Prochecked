import React from 'react'
import { makeStyles, Paper, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '89vh',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
  }
}));

//zeigt die About Seite

function About() {

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.content}>
        <Typography variant='h6'>
          ProjeChecked-Team09
        </Typography>
        <br />
        <Typography>
          React Frontend written by <Link href='https://github.com/mariusff'>Marius Fechter</Link>
        </Typography>
        <br />
        <Typography variant='body2'>
          © Hochschule der Medien 2021, all rights reserved.
        </Typography>
      </div>
    </Paper>
  )
}

export default About;