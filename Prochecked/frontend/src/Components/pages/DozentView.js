import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
//import './App.css';
import React, { Component } from 'react';
// import RoleBO from '../../AppApi/RoleBO'
// import {Link} from 'react-router-dom';

class DozentenView extends Component {

    constructor(props) {
      super(props);
    }

    handleProjektErstellen = () => {
      this.props.setRole(1);
      this.viewRole()
    }

    handleBewertungPflege = () => {
      this.props.setRole(2);
      this.viewRole()
    }

    viewRole= function() {
      console.log("clicked")
    };

render () {
  const { classes } = this.props;

	return(
        <div>
          <center>
                <h1>Wählen Sie einen der folgenden Optionen aus:</h1>
                <div>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick = {this.handleProjektErstellen}
                >
                            Projekt erstellen
                    
                </Button>
                </div>
                <div>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    algin="center"
                    className={classes.button}
                    onClick = {this.handleBewertungPflege}
                    
                >
                            Bewertung und Teilnehmerpflege
                </Button>
                </div>
        </center>
      </div>
    );
  }
}

const styles = (theme) => ({
  button: {
    margin: theme.spacing(2),
    width: 285,
    fontSize: 25,
    padding: "15x 0"
  },
})

  export default  withStyles(styles)(DozentenView);

