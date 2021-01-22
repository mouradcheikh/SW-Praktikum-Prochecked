import React from 'react';
import {makeStyles, withStyles, IconButton, Button, List, ListItem, ListItemSecondaryAction, Link, Typography, Input, Grid } from '@material-ui/core';
import  {AppApi}  from '../../../AppApi';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { Alert, AlertTitle } from '@material-ui/lab';

class CreateModule extends React.Component {
    constructor(props) {
        super(props);
        // this.textInput = React.createRef();

        this.state = {
            module: null, //für CreateModule das State 
            moduleList: [], // für ModuleList das State 
            moduleValidationFailed: false, //prüft eingabe des module im Textfeld
            success: false, //r:nach eingabe des Module wird state auf true gesetzt --> status erfolgreich wird angezeigt
            textField: false,
            updateS: '',
            editButton: false,
            edv_nr: '',
            projects: [],
            alert: false,
        };
   this.handleChange = this.handleChange.bind(this);
    }

    /** Create module */
    createModule(name, edv_nr){
    var api = AppApi.getAPI()
    // console.log(name, edv_nr)
  console.info(typeof edv_nr)
    api.createModule(name, edv_nr).then((module) =>
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
    let module_used = false
    console.log(this.state.projects)
    this.state.projects.forEach((p) => {
      if (p.getModule() === m.getID()){
        module_used = true
      }
    })
    if (module_used === false){
    var api = AppApi.getAPI()
    api.deleteModule(m.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched ???
        deletingInProgress: false, // loading indicator 
        deletingError: null,
        alert: false
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        deletingInProgress: false,
        deletingError: e,
        alert: false
      })
    );
    // set loading to true
    this.setState({
      deletingInProgress: true,
      deletingError: null
    },()=> {this.ModuleList()}
    );
  }
  else{
    this.setState({
      alert: true
    })
  }
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

  
  ProjectList(){
      var api = AppApi.getAPI()
        api.getProjects().then((projects) =>
        {
        this.setState({
          projects:projects
        })}
        )
    }
      
          
        handleSubmit = (event) => {
          event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
          this.createModule(
            this.state.module, 
            this.state.edv_nr, 
          )}

        handleChange(e) { 
            this.setState({ [e.target.name]: e.target.value });
            // console.log({ [e.target.name]: e.target.value })
            }
      /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.ModuleList();
    this.ProjectList()
  }
         
    render() { 
        const { classes  } = this.props;
        const { module, moduleList, edv_nr, editButton, moduleValidationFailed, success, alert} = this.state; 
        return (

        <div>
     <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div>
                <h1>Neues Modul eintragen</h1>
              </div>
              <div>
                  <form className={classes.root}  onSubmit= {this.handleSubmit}>
                    <Grid container>
                    <Grid xs="4" item>
                    <TextField id="outlined-basic" label="Modul" variant="outlined" name='module' required onChange={this.handleChange}  />  
                    </Grid>
                    <Grid xs="4" item>
                    <TextField id="outlined-basic" label="EDV-Nummer" variant="outlined" name='edv_nr' required onChange={this.handleChange}  />
                    </Grid>
                    <Grid xs="4" item>
                    <Button
                      type = "submit"
                      variant="contained"
                      color="default"
                      size="large"
                      className={classes.button}
                      startIcon={<SaveIcon />}>                
                          Modul anlegen
                    </Button>
                    </Grid>
                    </Grid>
                  </form>
              </div>
            </Paper>
            {alert ? 
                <Alert variant="outlined" severity="warning">
                Es können keine Module gelöscht werden, welche in einem Projekt als Modul eingetragen sind!
                </Alert> :
                <div></div>
                }
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



