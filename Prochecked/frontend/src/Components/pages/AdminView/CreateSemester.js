import React from 'react';
import {makeStyles, withStyles, IconButton, Button, List, ListItem, ListItemSecondaryAction, Link, Typography, Input, Grid } from '@material-ui/core';
import  {AppApi}  from '../../../AppApi';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';



class CreateSemester extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();

        this.state = {
            semester: null, //für CreateSemester das State 
            semesters: [], // für SemesterList das State 
        }
    }

    /** Create semester */
    createSemester(semester){
    var api = AppApi.getAPI()
    // console.log(api)
    api.createSemester(semester).then((semester) =>
        {
          // console.log(semester)
        this.setState({
            semester: semester
        },
        this.SemesterList()
        )}
        )
      }
    
   /** Delete semester */
   deleteSemester = (s) => { console.log(s.getID()) 
    var api = AppApi.getAPI()
    api.deleteSemester(s.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        deletingInProgress: false,
        deletingError: e
      })
    );
    // set loading to true
    this.setState({
      deletingInProgress: true,
      deletingError: null
    });
  }

  
    SemesterList(){
      var api = AppApi.getAPI()
      api.getSemesters().then((semesters) =>
      {
          this.setState({
            semesters:semesters
          })}
          )
        }
      
        handleSubmit = e => { console.log(this.textInput.current.value)
          e.preventDefault();
          this.setState({ 
            semester: this.textInput.current.value},
            () => {this.createSemester(this.textInput.current.value)})
          // console.log(this.textInput.current.value)
          // this.createSemester(this.textInput.current.value),
          // this.SemesterList()
        }


    
      /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log("gerendert")
    this.SemesterList();
  }
         
    render() { 
        const { classes  } = this.props;
        const { semester, semesters } = this.state; 
        return (
        semester !== null? 
        <div>
      <Grid container spacing={3}>
            <Grid item xs={6}>
            <h1>Neues Semester eintragen</h1>
            <Paper className={classes.paper}>
              <form className={classes.root} noValidate autoComplete='off'>
          <input placeholder= "Semester" type="text" ref={this.textInput} className= "form-control"/>
           <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' onClick={this.handleSubmit}  >
           Eintragen
           </Button>
              <Typography variant='body2' color={'textSecondary'}>
              Semester erfolgreich eingetragen!
              </Typography>
            </form>
            </Paper>
            </Grid>
            <Grid item xs={6}>
            <h1>Bestehende Semester</h1>
           <Paper className={classes.paper}>
           <div>
             {semesters.map(s => <ListItem>
              {s.name}
             <IconButton aria-label="delete" onClick={() => this.deleteSemester(s)}>
              <DeleteIcon />
             </IconButton>
              </ListItem >)}
          </div>
           </Paper>
         </Grid>
      </Grid>
        </div>

        :

        <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
        <h1>Neues Semester eintragen</h1>
         <Paper className={classes.paper}>
         <form className={classes.root} noValidate autoComplete='off'>
           <input placeholder= "Semester" type="text" ref={this.textInput} className= "form-control"/>
           <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' onClick={this.handleSubmit}  >
           Eintragen
           </Button>
         </form>
         </Paper>
         </Grid>
         <Grid item xs={6}>
         <h1>Bestehende Semester</h1>
           <Paper className={classes.paper}>
            {semesters.map(s => <ListItem>
              {s.name}
          <IconButton aria-label="delete" onClick={() => this.deleteSemester(s)}>
            <DeleteIcon />
          </IconButton>
            </ListItem >)}
           </Paper>
         </Grid>
        </Grid>
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
      marginLeft: theme.spacing(11),
      size: 'small',
    },
    participationEntry: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  });
 
  export default withStyles(styles)(CreateSemester); 



