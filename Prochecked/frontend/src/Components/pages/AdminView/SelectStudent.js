import React from 'react';
import  {AppApi}  from '../../../AppApi';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, Typography } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Input from '@material-ui/core/Input';
import {Link, useHistory} from 'react-router-dom';


class SelectStudent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          matr_nrValidationFailed: false,
          student: '',
          matr_nr: '',

        }
    }

    getStudentByMatrikelNummer = (matr_nr) => {
      var api = AppApi.getAPI()
      api.getStudentByMatrikelNummer(matr_nr).then(student =>
        this.setState({
          student: student,
          matr_nr: student.matr_nr,
          loadingInProgress: false, // loading indicator 
          loadingError: null
        })).catch(e =>
          this.setState({ // Reset state with error from catch 
            student: null,
            loadingInProgress: false,
            loadingError: e,
          })
        );
  
      // set loading to true
      this.setState({
        balance: 'loading',
        loadingInProgress: true,
        loadingError: null
      });
    }

  /** Handles value changes of the forms textfields and validates them */
  textFieldValueChange = (event) => {
    const value = event.target.value;

    this.setState({
      [event.target.id]: event.target.value,
    });

    if(value.length === 5){
      this.getStudentByMatrikelNummer(event.target.value)
    
      this.setState({
        matr_nrValidationFailed: false,
      })
    }

    else if(value.length <5) {
      this.setState({
        matr_nrValidationFailed: true,
      })
    }
  }

  // handleClick(){
  //   console.log(this.state.student)
  //   // event.preventDefault();
  //   if (this.state.student === null){
  //     alert("Sorry, diesen Studenten kennen wir nicht")
  //   }
  // }

  
    render() { 
        const { classes  } = this.props;
        const { student,matr_nr, matr_nrValidationFailed } = this.state; 

        return ( 
    <div>
        <div>
            <h1> Wählen Sie den Studenten </h1>
        </div>
      <div>
        <form className={classes.root} 
        // Validate ={this.handleClick} // validation funktioniert noch nicht.. nöchste seite kann ohne student aufgerufen werden
        autoComplete='off' >

            <Link to={{
                    pathname: "/StudentView",
                    state: { student: student }
                    }}>
              <TextField autoFocus type='text' required fullWidth margin='normal' id='matr_nr' label='Matrikelnummer:' value={matr_nr} 
                onChange={this.textFieldValueChange} error={matr_nrValidationFailed} 
                helperText={matr_nrValidationFailed ? 'Bitte geben Sie 5 Zeichen ein' : ' '} />
              
              <Button
                 type="submit"
                 variant="contained"
                 color="primary" 
              >
                Auswählen
              </Button>
            </Link>

        </form>
      </div>
      <div>
      <Typography className={classes.participationEntry}>      
      
        {"Ausgewählter Student:" +" "} {this.state.student.name}
      
          </Typography>
      </div>
    </div>
         );
}}

const styles = theme => ({
    root: {
      width: '100%'
    }, 
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
      },
      participationEntry: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
      }

});
 
export default withStyles(styles)(SelectStudent); 
