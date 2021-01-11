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

class CreatePerson extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            name: '',
            googleid: '',
            email:'',
            role: '',
            person: '',
            persons: [],
            student: '',
            matrNr: '',
            studiengang: '',
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
      
    handleChange(e) { 
    this.setState({ [e.target.name]: e.target.value });
    // console.log({ [e.target.name]: e.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
        
        this.createPerson(
            this.state.name, 
            this.state.email, 
            this.state.googleid, 
            this.state.role,
            this.state.validationSuccedPerson = false,
          )
          // if (this.state.role===1){
          // // this.createStudent(this.state.matrNr, this.state.studiengang, this.state.person.id)
          // this.setState({
            
          // })
        // }
        }

    handleSubmitStudent = (event) => { console.log("handleSubmitStudent")
      event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
      
      this.createStudent(
          this.state.matrNr, 
          this.state.studiengang, 
          this.state.person.id, 
          this.state.validationSuccedStudent = false,
        )}
  
        componentDidMount() {
          this.PersonList();
        }
      
   
    render() {
        const { classes } = this.props;
        const { person, persons, student, validationSuccedPerson, validationSuccedStudent} = this.state; 
        console.log(this.state)

        return (
        
        <div>
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
                        <Select
                            labelId="Rolle"
                            id="Rolle"
                            name= 'role'
                            required
                            onChange={this.handleChange}>
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
            </form>
            </div>
            <div>
            {persons.map(p => 
               <ListItem>
                {p.name}
                <IconButton aria-label="delete" onClick={() => this.deletePersons(p)}>
                 <DeleteIcon />
                </IconButton>
                </ListItem>)}
            </div>
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
                Student anlegen
              </Button>
              </form>
              : <div></div>
             
              }
            
            </div>
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
      button: {
        margin: theme.spacing(1),
      },
    }, 
  });

export default withStyles(styles)(CreatePerson);
