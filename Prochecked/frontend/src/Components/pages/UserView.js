// // import React, { Component } from 'react';
// // import PropTypes from 'prop-types';
// // import { withStyles, Typography, Paper } from '@material-ui/core';
// // import { BankAPI } from '../api';
// // import ContextErrorMessage from '../dialogs/ContextErrorMessage';
// // import LoadingProgress from '../dialogs/LoadingProgress';

// import React from 'react';

// function UserView() {
//   return (
//   <div>
//     <h1>UserView</h1>
//   </div>
//   );

// }

// export default UserView;


// // class UserView extends Component {

// //     constructor(props) {
// //       super(props);

// //       // Init state
// //       this.state = {
// //         loadingInProgress: false,
// //         loadingError: null,
// //       };
// //     }
// // }

import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import './App.css';

render () {
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
                    className={classes.submitButton}
                >
                        Bestätigen
                </Button>
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    width: 170,
    fontSize: 25,
    padding: "15x 0"
  },
  submitButton: {
    marginLeft: theme.spacing(50),
    margin: theme.spacing(5)
  },
}));

//       // Init state
//       this.state = {
//         loadingInProgress: false,
//         loadingError: null,
//       };
//     }

function UserView()

render () {
    const { classes } = useStyles();

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
                    className={classes.submitButton}
                >
                        Bestätigen
                </Button>
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    width: 170,
    fontSize: 25,
    padding: "15x 0"
  },
  submitButton: {
    marginLeft: theme.spacing(50),
    margin: theme.spacing(5)
  },
}));

  export default makeStyles(useStyles)(UserView);
