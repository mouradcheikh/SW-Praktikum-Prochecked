import React from 'react';
import {TextField, withStyles, Button, List, ListItem, Link, Typography, Input, Grid } from '@material-ui/core';
import  {AppApi}  from '../../../AppApi';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import SemesterBO from '../../../AppApi/SemesterBO';
import AddIcon from '@material-ui/icons/Add';


class CreateSemester extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            semester: null, //für CreateSemester
            semesters: [], // für SemesterList 
            semesterValidationFailed: false, //prüft eingabe des semsters im Textfeld
            success: false, //r:nach eingabe des Semesters wird state auf true gesetzt --> status erfolgreich wird angezeigt
            textField: false,
            updateS: '',
            editButton: false
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
        deletingError: null,
      }, () => this.SemesterList()
      )
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        deletingInProgress: false,
        deletingError: e
      })
    );
    // // set loading to true
    // this.setState({
    //   deletingInProgress: true,
    //   deletingError: null
    // });
  }


  /** Updates the semester */
  updateSemester = () => {
    // console.log(s)
    // s.preventDefault();
    // clone the original participation, in case the backend call fails
    let updatedSemester = Object.assign(new SemesterBO(), this.state.updateS);
    updatedSemester.setName(this.state.semester)
    console.log(updatedSemester)
    
    AppApi.getAPI().updateSemster(updatedSemester).then(semester => {
      this.setState({
        semester: semester,
        success: true
      },() => this.SemesterList()
      );
              
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
      if (this.state.editButton === false){
        if (this.state.semesterValidationFailed === false){ //r: wird bei click nur ausgeführt wenn validation auf false gesetzt wurde
        this.createSemester(this.state.semester)
        this.setState({
          success : true,
        })
        }
      }
      else {
        if (this.state.semesterValidationFailed === false){ //r: wird bei click nur ausgeführt wenn validation auf false gesetzt wurde
          this.updateSemester(this.state.semester)
          this.setState({
            success : true,
          })
        }
      }
    }

    // handleSubmitTextfield = (event, s) => {
    //   console.log(s)
    //   event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
    //   if (this.state.semesterValidationFailed === false){ //r: wird bei click nur ausgeführt wenn validation auf false gesetzt wurde
    //     this.updateSemester(s)
    //     this.setState({
    //       success : true,
    //     })
    //   }
    // }

    // handleStateTextField(){
    //   this.setState({
    //     textField: true
    //   })
    // }
      
  componentDidMount() {
    this.SemesterList();
  }
         
  render() { 
        const { classes  } = this.props;
        const { semester, semesters, updateS, editButton, semesterValidationFailed, success, textField} = this.state; 
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
                  label='Semester:' 
                  // value={semester} 
                  onChange={this.textFieldValueChange} 
                  error={semesterValidationFailed} 
                  // onInput={e=>this.setState({semester: (e.target.value)})}
                  helperText={semesterValidationFailed ? 'Bitte geben Sie ein Semester ein (z.B. WS-20/21)' : success ===true ? 'Semester erfolgreich eingetragen!' :''} 
                  />
                <Grid>
                <Button 
                  type = "submit" 
                  className={classes.buttonMargin} 
                  variant='contained' 
                  color='primary' 
                  size='small'
                  startIcon = {< AddIcon/>}
                >
                Eintragen
                </Button>
                </Grid>
                <Grid>
                { editButton? 
                  <Button 
                    type = "submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.buttonMargin}
                    startIcon={<SaveIcon />}>                
                    überschreiben
                  </Button>
                :<div></div> }
                </Grid>
                    
              </form>

            </Paper>
            </Grid>
            <Grid item xs={6}>
            <h1>Bestehende Semester</h1>
            <Paper className={classes.paper}>
            <div>

               {semesters.map(s => 
               
               <ListItem>
                {s.name}

                <IconButton aria-label="delete" onClick={() => this.deleteSemester(s)}>
                 <DeleteIcon />
                </IconButton>

                <Button color='primary' onClick= {() => { this.setState({ updateS: s, editButton: true })}}> {/* neuer State wird gesetzt, PersonBO ist in p und wird in updateP als State gesetzt, update Putton wird auf True gesetzt und angezeigt*/  }
                   edit
                </Button>


                {/* <Button color='primary' onClick={this.handleStateTextField.bind(this)}>
                   edit
                </Button>
                {textField? 
                  <form onSubmit = {(event, s) => this.handleSubmitTextfield(event, s)}> 
                      <TextField 
                        className={classes.formControl}
                        autoFocus type='text' 
                        required 
                        fullWidth 
                        margin='normal' 
                        id='semester' 
                        label='semester:' 
                        // value={semester} 
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
                       Semester ändern
                      </Button>
                  </form>
                :<div></div>} */}


              </ListItem >)}

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



