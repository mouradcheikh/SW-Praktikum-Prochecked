import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

import { Link } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown.js';

// import blueGrey from '@material-ui/core/colors/blueGrey'

import grey from '@material-ui/core/colors/grey'
import blueGrey from '@material-ui/core/colors/blueGrey'


class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const person = this.props;
    const classes = this.props
    return (
      <div className={classes.root}>
        <AppBar style={{backgroundColor: 
          grey[900]
      }}
           className={classes.appBarDesign} position="static">
        
          <Toolbar>
            
            <IconButton edge="start" className={classes.menuButton} aria-label="menu">
              {/* <Link to=''> */}
                <HomeIcon fontSize="large" style={{color: blueGrey[400]}} />
              {/* </Link> */}
            </IconButton>
            
            <Typography variant="h5" className={classes.title}>
              <div>ProChecked - Hochschule der Medien</div>
                       
            </Typography>
            
            <Button color="inherit"></Button>
            
          </Toolbar>
          <ProfileDropDown person={person} />
        </AppBar>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    type: "dark"
  },
  menuButton: {
    marginRight: theme.spacing(25),
  },
  title: {
    flexGrow: 1,
  },
 
})


export default withStyles(styles)(Header);
