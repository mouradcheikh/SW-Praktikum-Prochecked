import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
          margin: theme.spacing(1),
    },
  }),
);

function App() {
    const classes = useStyles();

	return(
        <div>
                <h1>Ich bin ein...</h1>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                            Student
                </Button>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                            Dozent
                </Button>
                <Button
                     size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                 >
                            Admin
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                >
                        Bestätigen
                </Button>
      </div>
    );
  }

export default App;