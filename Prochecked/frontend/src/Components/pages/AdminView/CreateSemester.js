import React from 'react';
import {makeStyles, withStyles, Button, List, ListItem, ListItemSecondaryAction, Link, Typography, Input, Grid } from '@material-ui/core';
import  {AppApi}  from '../../../AppApi';
import Paper from '@material-ui/core/Paper';



class CreateSemester extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();

        this.state = {
            semester: null, //für CreateSemester das State 
            semesters: [], // für SemesterList das State 
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
        },
        this.SemesterList()
        )}
        )
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
            <form >
              <input placeholder= "Semester" type="text" ref={this.textInput} className= "form-control"/>
              <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' onClick={this.handleSubmit} >
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
            {semesters.map(s => <ListItem>{s.name}</ListItem >)}
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
         <form >
           <input placeholder= "Semester" type="text" ref={this.textInput} className= "form-control"/>
           <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' onClick={this.handleSubmit} >
           Eintragen
           </Button>
           {/* <Typography variant='body2' color={'textSecondary'}>
           Semester noch nicht eingetragen
           </Typography> */}
         </form>
         </Paper>
         </Grid>
         <Grid item xs={6}>
         <h1>Bestehende Semester</h1>
           <Paper className={classes.paper}>
           <div>
            {semesters.map(s => <ListItem>{s.name}</ListItem >)}
            </div>
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
      marginRight: theme.spacing(2),
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

//endIcon={<SendIcon/>}

