import React from 'react'
import { makeStyles, Paper, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
  }
}));

//Zeigt die "About" Seite der ProChecked-App

function About() {

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.content}>
        <Typography variant='h6'>
          ProChecked-Team09
        </Typography>
        <br />
        <Typography>
          React single page application written by: <Link href='https://github.com/mariusff'>Marius Fechter</Link>
                                                    <Link href='https://github.com/RobinRingelberg'>Robin Ringelberg</Link>
                                                    <Link href='https://github.com/KaiKustermann'>Kai Kustermann</Link>
                                                    <Link href='https://github.com/Perry-Dettke'>Perry Dettke</Link>
                                                    <Link href='https://github.com/MertcanCinar'>Mertcan Cinar</Link>
                                                    <Link href='https://github.com/mouradcheikh'>Mourad Cheikh</Link>
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