import React from 'react';
import {makeStyles, withStyles, Button, ListItem, ListItemSecondaryAction, Link, Typography, Input } from '@material-ui/core';

class CreateSemester extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            semester: null,
        }
    }

    createSemester(semester){
    var api = AppApi.getAPI()
    // console.log(api)
    api.createSemester(semester).then((semester) =>
        {
          // console.log(semester)
        this.setState({
            semester: semester
        })}
        )
      }
    
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ semester:
          this.textInput.current.value})
          // console.log(this.textInput.current.value)
          this.createSemester(this.textInput.current.value)
        }
         
    render() { 
        const { classes  } = this.props;
        const { semester } = this.state; 
        return (
        semester !== null? 
        <div>
            <h1>Neues Semester eintragen</h1>
            <form >
              <input placeholder= "Semester" type="text" ref={this.textInput} className= "form-control"/>
              <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' onClick={this.handleSubmit} >
              Eintragen
              </Button>
              <Typography variant='body2' color={'textSecondary'}>
              Semester erfolgreich eingetragen: {semester.semester}
              </Typography>
            </form>
        </div>
        :
         <div>
         <h1>Neues Semester eintragen</h1>
         <form >
           <input placeholder= "Semester" type="text" ref={this.textInput} className= "form-control"/>
           <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' onClick={this.handleSubmit} >
           Eintragen
           </Button>
           <Typography variant='body2' color={'textSecondary'}>
           Semester noch nicht eingetragen
           </Typography>
         </form>
     </div>
         );
        }
}


/** Component specific styles */
const styles = theme => ({
    root: {
      width: '100%'
    }, 
    buttonMargin: {
      marginRight: theme.spacing(2),
    },
    participationEntry: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    }
  });
 
  export default withStyles(styles)(CreateSemester); 

//endIcon={<SendIcon/>}

