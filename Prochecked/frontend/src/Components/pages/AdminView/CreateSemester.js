import React from 'react';
import {TextField, withStyles, Button, List, ListItem, Link, Typography, Input, Grid } from '@material-ui/core';
import  {AppApi}  from '../../../AppApi';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';



class CreateSemester extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            semester: null, //für CreateSemester
            semesters: [], // für SemesterList 
            semesterValidationFailed: false, //prüft eingabe des semsters im Textfeld
            success: false, //r:nach eingabe des Semesters wird state auf true gesetzt --> status erfolgreich wird angezeigt
           
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

        
    textFieldValueChange = (event) => {
      const value = event.target.value;

      this.setState({
        [event.target.id]: value,
      });

      if(value.length > 5){ //eingabe des textfields muss mindestens 5 zeichen enthalten
      
        this.setState({
          semesterValidationFailed: false,
        })

      this.state.semesters.map(s => 
        {if(s.name === value){ //r:prüft ob semester bereits eingegeben wurde, wenn ja kann dieses nicht eingegeben werden
        this.setState({
          semesterValidationFailed: true,
          
      })
    }        
      })
    }
      else {
        this.setState({
          semesterValidationFailed: true,
        })
      }
    }
      
    handleSubmit = (event) => {
      event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
      if (this.state.semesterValidationFailed === false){ //r: wird bei click nur ausgeführt wenn validation auf false gesetzt wurde
        this.createSemester(this.state.semester)
        this.setState({
          success : true,
        })
      }
    }
      
  componentDidMount() {
    this.SemesterList();
  }
         
  render() { 
        const { classes  } = this.props;
        const { semester, semesters, semesterValidationFailed, success} = this.state; 
  return( 
    <div>
      <Grid container spacing={3}>
            <Grid item xs={6}>
            <h1>Neues Semester eintragen</h1>
            <Paper className={classes.paper}>
              <form onSubmit={this.handleSubmit}>
                <TextField 
                  className={classes.formControl}
                  autoFocus type='text' 
                  required 
                  fullWidth 
                  margin='normal' 
                  id='semester' 
                  label='semester:' 
                  value={semester} 
                  onChange={this.textFieldValueChange} 
                  error={semesterValidationFailed} 
                  // onInput={e=>this.setState({semester: (e.target.value)})}
                  helperText={semesterValidationFailed ? 'Bitte geben Sie ein Semester ein (z.B. WS-20/21)' : success ===true ? 'Semester erfolgreich eingetragen!' :''} 
                  />
                <Button 
                  type = "submit" 
                  className={classes.buttonMargin} 
                  variant='outlined' 
                  color='primary' 
                  size='small'
                >
                Eintragen
                </Button>
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
    )}
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



