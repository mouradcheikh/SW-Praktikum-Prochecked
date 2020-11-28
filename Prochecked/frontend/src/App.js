import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
          margin: theme.spacing(2),
          padding: "10px 35px"
    },
  }),
);

function App() {
    const classes = useStyles();

	return(
        <div>
                <h1>Ich bin ein ...</h1>
                <div>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                            Student
                </Button>
                </div>
                <div>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    algin="center"
                    className={classes.button}
                
                >
                            Dozent
                </Button>
                </div>
                <div>
                <Button
                     size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                 >
                            Admin
                </Button>
                </div>
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