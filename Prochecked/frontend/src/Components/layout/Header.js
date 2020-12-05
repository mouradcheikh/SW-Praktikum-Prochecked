import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SubjectIcon from '@material-ui/icons/Subject';

class Header extends React.Component {
    constructor (props) {
        super (props)
}

render () {

    const {user,classes} = this.props;

    return (
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="gray" aria-label="menu">
            <SubjectIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
              ProChecked - Hochschule der Medien
          </Typography>
          <Button color="inherit"></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}}

const styles = (theme) => ({
    root: {
      flexGrow: 1,
      width: "100%"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })

export default withStyles(styles) (Header);
