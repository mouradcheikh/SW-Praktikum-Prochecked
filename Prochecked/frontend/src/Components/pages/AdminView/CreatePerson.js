import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import  {AppApi, PersonBO}  from '../../../AppApi';
import StudentBO from '../../../AppApi/StudentBO';
import {TextField, Button, List, ListItem, Link, Typography, Input, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';


class CreatePerson extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            name: '',
            googleid: '',
            email:'',
            role: '',
            person: '',
            persons: [], //für get Persons, um alle Personen aus der Datenbank zu holen 
            student: '',
            matrNr: '',
            studiengang: '',
            updateP:'',
            updateS: '',
            editButton: false,
            validationSuccedPerson: true, 
            validationSuccedStudent: true, 
    };
    this.handleChange = this.handleChange.bind(this);
    }

     /** Create Person */
     createPerson(name, googleid, email, role){
        var api = AppApi.getAPI()
        // console.log(api)
        api.createPerson(name, googleid, email, role).then((person) =>
            {
              // console.log(person)
            this.setState({
                person: person
            },
            )}
            )
            console.log(this.state.person)
          }

        /** Create Student */
     createStudent(matrNr, studiengang, person){

       var student = new StudentBO
       student.setMatrNr(matrNr)
       student.setStudiengang(studiengang)
       student.setPerson(person)
       console.log(student)
      var api = AppApi.getAPI()
      // console.log(api)
      api.createStudent(student).then((student) =>
          {
          console.log(student)
          this.setState({
              student: student
          },
          )}
          )
          console.log(this.state.student)
        }

    getStudentByPersonId(person_id){
      console.log("getStudent...")
      if (this.state.updateP.berechtigung ===1){
      console.log("if")
      var api = AppApi.getAPI()
      api.getStudentByPersonId(person_id).then((student) =>
        {
            this.setState({
              updateS:student
              })
            }
      ) 
    }    console.log("updateS", this.state.updateS)
    }

    PersonList(){
      var api = AppApi.getAPI()
      api.getPersons().then((persons) =>
        {
            this.setState({
              persons:persons
              })}
              )
            }

   /** Delete Persons */
   deletePersons = (p) => { console.log(p.getID()) 
    var api = AppApi.getAPI()
    api.deletePerson(p.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null,
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

    /** Updates the person */
    updatePerson = () => {
      // clone the original PersonBO, in case the backend call fails
      let updatedPerson = Object.assign(new PersonBO(), this.state.updateP);
      updatedPerson.setName(this.state.name)
      updatedPerson.setGoogleId(this.state.googleid)
      updatedPerson.setEmail(this.state.email)
      updatedPerson.setBerechtigung(this.state.role)
      console.log(updatedPerson)
      
      AppApi.getAPI().updatePersonAdmin(updatedPerson).then(person => {
        this.setState({
          person: person,
          success: true
        });      
      });
    }

    /** Updates the student */
    updateStudent = () => { //FEHLER IM BACKEND, mysql.connector.errors.ProgrammingError: Not enough parameters for the SQL statement??? siehe print in der main
      // clone the original StudentBO, in case the backend call fails
      console.log("updateS:", this.state.updateS)
      // let updatedStudent = new StudentBO()
      // updatedStudent.setMatrNr(this.state.matrNr)
      // updatedStudent.setStudiengang(this.state.studiengang)
      // updatedStudent.setPerson(this.state.updateP.getID())
      // updatedStudent.setName(this.state.updateP.getName())
      let updatedStudent = Object.assign(new StudentBO(), this.state.updateS);
      updatedStudent.setMatrNr(this.state.matrNr)
      updatedStudent.setStudiengang(this.state.studiengang)
      console.log(updatedStudent)
      
      AppApi.getAPI().updateStudentAdmin(updatedStudent).then(student => {
        this.setState({
          student: student,
          success: true
        });      
      });
    }

      
    handleChange(e) { 
    this.setState({ [e.target.name]: e.target.value });
    // console.log({ [e.target.name]: e.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
        if (this.state.editButton === false){
        this.createPerson(
            this.state.name, 
            this.state.email, 
            this.state.googleid, 
            this.state.role,
            this.state.validationSuccedPerson = false,
          )
        }else {
          this.updatePerson()         
        }
      }
        
    handleSubmitStudent = (event) => { console.log("handleSubmitStudent")
      event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
      if (this.state.editButton === false){
      this.createStudent(
          this.state.matrNr, 
          this.state.studiengang, 
          this.state.person.id, 
          this.state.validationSuccedStudent = false,
        )
      }else {
        this.updateStudent()      
      }
    }

    berechtigung(p){
        if(p.berechtigung ===1){
          return "Student"
        }
        else if(p.berechtigung ===2){
          return "Dozent"
        }
        else{
        return "Admin"
        } 
    }

    componentDidMount() {
      this.PersonList();}
      
    render() {
        const { classes } = this.props;
        const { person, persons, student, editButton, validationSuccedPerson, validationSuccedStudent} = this.state; 
        console.log(this.state)
      
    return (
    <div className={classes.roott}>
      <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div>
                <h1>Eine neue Person erstellen</h1>
              </div>
              <div>
                  <form className={classes.root}  onSubmit= {this.handleSubmit}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" name='name' required  onChange={this.handleChange}
                          helperText={ validationSuccedPerson? '' : person !==null ? 'Person ' + person.name+ ' ' + 'erfolgreich eingetragen!' :''} /> {/*neuer State wird gesetzt welcher identisch ist mit den name-Tag, über onChange + bind.this unter dem Konstruktor   */  }
                    <TextField id="outlined-basic" label="Google-ID" variant="outlined" name='googleid' required onChange={this.handleChange}  />
                    <TextField id="outlined-basic" label="E-Mail" variant="outlined" name='email' required onChange={this.handleChange}/>
                    <FormControl className={classes.formControl}>

                    <InputLabel id="artProjekt">Rolle der Person</InputLabel>
                      <Select labelId="Rolle" id="Rolle" name= 'role' required onChange={this.handleChange}>
                          <MenuItem value={1}>Student</MenuItem>
                          <MenuItem value={2}>Dozent</MenuItem>
                          <MenuItem value={3}>Admin</MenuItem>
                      </Select>
                          </FormControl>
                    <Button
                      type = "submit"
                      variant="contained"
                      color="default"
                      size="large"
                      className={classes.button}
                      startIcon={<SaveIcon />}>                
                          Person anlegen
                    </Button>
                  {editButton? 
                    <Button 
                      type = "submit"
                      variant="contained"
                      color="default"
                      size="large"
                      className={classes.button}
                      startIcon={<SaveIcon />}>                
                          Person Updaten
                    </Button>
                    :<div></div> }
                  </form>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <div>
              {person.berechtigung ===1?
              <form className={classes.root}  onSubmit= {this.handleSubmitStudent}>
                  <div>
                      <h3>Matrikelnummer und Studiengang bitte noch angeben</h3>
                      <TextField id="outlined-basic" label="MatrikelNummer" variant="outlined" name='matrNr' required onChange={this.handleChange} />
                      <TextField id="outlined-basic" label="Studiengang" variant="outlined" name='studiengang' required onChange={this.handleChange}
                      helperText={ validationSuccedStudent? '' : person !==null ? 'Student ' + person.name+ ' '+ 'mit der Matrikelnummer'+ ' '+ this.state.matrNr + ' '+ 'erfolgreich eingetragen!' :''}/>
                  </div>
                  <Button
                    type = "submit"
                    variant="contained"
                    color="default"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}> 
                    {editButton? <>Student anlegen</>:<>Student anlegen</>}
                  </Button>
                {/* {editButton? 
                  <Button
                    type = "submit"
                    variant="contained"
                    color="default"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}>                
                        Student Updaten
                   
                  </Button>
                :<div></div>} */}
              </form>
              : <div></div>
                }
              </div>
            </Paper>
         </Grid>
         <Grid item xs={6}>
          <h1>Angelegte Personen</h1>
          <Paper className={classes.paper} style={{maxHeight: 200, overflow: 'auto'}}>
            <div>
            {persons.map(p => 
               <ListItem>
                { this.berechtigung(p) + ": "+ p.name}
                <IconButton aria-label="delete" onClick={() => this.deletePersons(p)}>
                 <DeleteIcon />
                </IconButton>
                <Button color='primary' onClick= {() => { this.setState({ updateP: p, editButton: true }, () => this.getStudentByPersonId(p.getID()) )
                
                // ; person.berechtigung ===1? this.getStudentByPersonId(p.getID()):'' 
                }}> {/* neuer State wird gesetzt, PersonBO ist in p und wird in updateP als State gesetzt, update Putton wird auf True gesetzt und angezeigt*/  }
                   edit
                </Button>
                </ListItem>)}
            </div>
          </Paper>
         </Grid>
      </Grid>
    </div>
        )
    }
}

const styles = theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      roott: {
        flexGrow: 1,
      },
      button: {
        margin: theme.spacing(1),
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }, 
  });

export default withStyles(styles)(CreatePerson);

