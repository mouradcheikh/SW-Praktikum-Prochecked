import React from 'react';
import {makeStyles, withStyles, IconButton, Button, List, ListItem, ListItemSecondaryAction, Link, Typography, Input, Grid } from '@material-ui/core';
import  {AppApi}  from '../../../AppApi';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';



class CreateModule extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();

        this.state = {
            module: null, //für CreateModule das State 
            moduleList: [], // für ModuleList das State 
        }
    }

    /** Create module */
    createModule(module){
    var api = AppApi.getAPI()
    // console.log(api)
    api.createModule(module).then((module) =>
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
      
        handleSubmit = e => { console.log(this.textInput.current.value)
          e.preventDefault();
          this.setState({ 
            module: this.textInput.current.value},
            () => {this.createModule(this.textInput.current.value)})
        }


    
      /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log("gerendert")
    this.ModuleList();
  }
         
    render() { 
        const { classes  } = this.props;
        const { module, moduleList } = this.state; 
        return (
        module !== null? 
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
              <Typography variant='body2' color={'textSecondary'}>
              Modul erfolgreich eingetragen!
              </Typography>
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



