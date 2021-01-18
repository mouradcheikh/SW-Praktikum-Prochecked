import React from 'react';
import {makeStyles, withStyles, IconButton, Button, List, ListItem, ListItemSecondaryAction, Link, Typography, Input, Grid } from '@material-ui/core';
import  {AppApi}  from '../../../AppApi';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';


class CreateModule extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();

        this.state = {
            module: null, //für CreateModule das State 
            moduleList: [], // für ModuleList das State 
            moduleValidationFailed: false, //prüft eingabe des module im Textfeld
            success: false, //r:nach eingabe des Module wird state auf true gesetzt --> status erfolgreich wird angezeigt
            textField: false,
            updateS: '',
            editButton: false,
            edv_nr: ''
        }
    }

    /** Create module */
    createModule(module, edv_nr){
    var api = AppApi.getAPI()
    // console.log(api)
    api.createModule(module, edv_nr).then((module) =>
        {
          // console.log(modudle)
        this.setState({
            module: module
        },
        this.ModuleList()
        )}
        )
      }
    
   /** Delete module */
   deleteModule = (m) => { console.log(m.getID()) 
    var api = AppApi.getAPI()
    api.deleteModule(m.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched ???
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

  
    ModuleList(){
      var api = AppApi.getAPI()
      api.getModule().then((modules) =>
      {
          this.setState({
            moduleList:modules
          })}
          )
        }
      
        textFieldValueChange = (event) => {
          const value = event.target.value;
    
          this.setState({
            [event.target.id]: value,
          });
    
          if(value.length > 2){ //eingabe des textfields muss mindestens 2 zeichen enthalten
          
            this.setState({
              moduleValidationFailed: false,
            })
    
          this.state.module.map(s => 
            {if(s.name === value){ //r:prüft ob modul bereits eingegeben wurde, wenn ja kann dieses nicht eingegeben werden
            this.setState({
              moduleValidationFailed: true,
              
          })
        }        
          })
        }
          else {
            this.setState({
              moduleValidationFailed: true,
            })
          }
        }
          
        handleSubmit = (event) => {
          event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
          if (this.state.editButton === false){
            if (this.state.module === false){ //r: wird bei click nur ausgeführt wenn validation auf false gesetzt wurde
            this.createModule(this.state.module)
            this.setState({
              success : true,
            })
            }
          }
          else {
            if (this.state.moduleValidationFailed === false){ //r: wird bei click nur ausgeführt wenn validation auf false gesetzt wurde
              this.updateModule(this.state.module)
              this.setState({
                success : true,
              })
            }
          }
        }

    
      /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log("gerendert")
    this.ModuleList();
  }
         
    render() { 
        const { classes  } = this.props;
        const { module, moduleList, updateS, editButton, moduleValidationFailed, success, textField } = this.state; 
        return (
        module !== null? 
        <div>
      <Grid container spacing={3}>
            <Grid item xs={6}>
            <h1>Neues Modul eintragen</h1>
            <Paper className={classes.paper}>
            <form onSubmit={this.handleSubmit}>
                <TextField 
                  className={classes.formControl}
                  autoFocus type='text' 
                  required 
                  fullWidth 
                  margin='normal' 
                  id='module' 
                  label='module:' 
                  onChange={this.textFieldValueChange} 
                  error={moduleValidationFailed} 
                  helperText={moduleValidationFailed ? 'Bitte geben Sie ein Module ein (z.B. ADS)' : success ===true ? 'Module erfolgreich eingetragen!' :''} 
                  />
                <TextField id="outlined-basic" label="EDV-Nummer" variant="outlined" name='edv_nr' required onChange={this.handleChange}  />
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
            <h1>Bestehende Module</h1>
           <Paper className={classes.paper}>
           <div>
             {moduleList.map(m => <ListItem>
              {m.name}
             <IconButton aria-label="delete" onClick={() => this.deleteModule(m)}>
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
        <h1>Neues Modul eintragen</h1>
         <Paper className={classes.paper}>
         <form className={classes.root} noValidate autoComplete='off'>
           <input placeholder= "Module" type="text" ref={this.textInput} className= "form-control"/>
           <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' onClick={this.handleSubmit}  >
           Eintragen
           </Button>
         </form>
         </Paper>
         </Grid>
         <Grid item xs={6}>
         <h1>Bestehende Module</h1>
           <Paper className={classes.paper}>
            {moduleList.map(m => <ListItem>
              {m.name}
          <IconButton aria-label="delete" onClick={() => this.deleteModule(m)}>
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
 
  export default withStyles(styles)(CreateModule); 



