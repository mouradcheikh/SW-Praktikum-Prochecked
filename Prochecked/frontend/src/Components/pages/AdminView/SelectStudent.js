import React from 'react';
import  {AppApi}  from '../../../AppApi';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import {Link, Prompt} from 'react-router-dom';

/**
 * Zeigt die Seite um den entsprechenden Studenten via Matrikelnummer in der AdminView auszuwählen.
 * Nach Auswahl des entsprechenden Studenten wird man auf seine View weitergeleitet.
 */

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
          loadingInProgress: false, 
          loadingError: null
        })).catch(e =>
          this.setState({ 
            student: null,
            loadingInProgress: false,
            loadingError: e,
          })
        );
  
      this.setState({
        loadingInProgress: true,
        loadingError: null
      });
    }

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

  handleSubmit(event){
    event.preventDefault();
    if (this.state.matr_nrValidationFailed === false){
      throw "Sorry, diesen Studenten kennen wir nicht";
    }
      
  }

    render() { 
        const { classes  } = this.props;
        const { student, matr_nr, matr_nrValidationFailed } = this.state; 

        return ( 
    <div className={classes.root} >
        <div>
            <h1> Wählen Sie den Studenten </h1>
        </div>
      <div>
        <form >
          {/* <Prompt when={matr_nrValidationFailed == true || student === '' }
         ></Prompt> */}
              <TextField 
                autoFocus type='text'
                required 
                fullWidth 
                margin='normal' 
                id='matr_nr' 
                label='Matrikelnummer:' 
                value={matr_nr} 
                onChange={this.textFieldValueChange} error={matr_nrValidationFailed} 
                helperText={matr_nrValidationFailed ? 'Bitte geben Sie 5 Zeichen ein' : ' '} 
              />
              <Link onAbort to={{
                pathname: "/StudentView",
                state: { student: student, adminStudent: true }
                }}style={{ textDecoration: 'none'}}>
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
        {"Ausgewählter Student:" +" "} {student != null? student.name:'Student ist nicht bekannt'}
        </Typography>
      </div>
    </div>
         );
}}

const styles = theme => ({
    root: {
      width: '100%',
      height: 650
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
