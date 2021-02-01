import React from 'react'
import { makeStyles, Paper, Typography, Link , ListItem, List} from '@material-ui/core';

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

/**
 * Zeigt die "About" Seite der Anwendung und wer sie entwickelt hat mit 
 * den entsprechenden Links zu den GitHub-Profilen der Entwickler.
 */

function About() {

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.content}>
          <br />
            <Typography>
                <h3>"ProChecked" ist eine React Single-Page Application welche den Benutzern dabei hilft ihre Projekte erfolgreich zu managen. </h3> 
              <List>
                <h4>Entwickelt im WS-2020/2021 von:</h4>
                  <ListItem><Link href='https://github.com/mariusff'>Marius Fechter</Link></ListItem>
                  <ListItem><Link href='https://github.com/RobinRingelberg'>Robin Ringelberg</Link></ListItem>
                  <ListItem> <Link href='https://github.com/KaiKustermann'>Kai Kustermann</Link></ListItem>
                  <ListItem><Link href='https://github.com/Perry-Dettke'>Perry Dettke</Link></ListItem>
                  <ListItem><Link href='https://github.com/MertcanCinar'>Mertcan Cinar</Link></ListItem>
                  <ListItem><Link href='https://github.com/mouradcheikh'>Mourad Cheikh</Link></ListItem>
               </List>
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