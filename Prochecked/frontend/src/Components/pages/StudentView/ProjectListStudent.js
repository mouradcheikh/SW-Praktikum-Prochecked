import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import  {AppApi}  from '../../../AppApi';
import ContextErrorMessage from '../../dialogs/ContextErrorMessage';
import LoadingProgress from '../../dialogs/LoadingProgress';
import ProjectListEntryStudent from './ProjectListEntryStudent';
import Paper from '@material-ui/core/Paper';

/**
 * Controlls a list of ProjectListEntrys to create a accordion for each project.
 *
 * @see See [ProjectListEntry](#projectlistentry)
 *
 */
class ProjectListStudent extends Component {

  constructor(props) {
    super(props);

    let student = '';

    if(this.props.location.state.student){
      student = this.props.location.state.student
    }

    // Init an empty state
    this.state = {
      // projectNew: [],
      projectsAvailable: [],
      projectsSignedIn: [],
      error: null,
      loadingInProgress: false,
      student: student,
      // expandedProjectID: expandedID,
    };
  }


  getProjectsByStateAccepted = () => {
    // console.log("vor fetch")
      var api = AppApi.getAPI()
      api.getProjectsByState(3) //evtl. Objekt von API vorher anlegen
        .then(projectBOs =>
          this.setState({
          projectsAvailable: projectBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
            projectsAvailable: [],
            loadingInProgress: false, // disable loading indicator
            error: e
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    }, () =>{this.getProjectsByStudent(this.state.student.matr_nr)}
    );
  }

   /** Fetches ProjectBOsbyMatrNr from the backend */
   getProjectsByStudent = (matr_nr) => {
      var api = AppApi.getAPI()
      api.getProjectsByStudent(matr_nr) //evtl. Objekt von API vorher anlegen
        .then(projectBOs =>
          this.setState({               // Set new state when ProjectBOs have been fetched
            projectsSignedIn: projectBOs,
            filteredProjects: [...projectBOs], // store a copy
            loadingInProgress: false,   // disable loading indicator
            error: null
          })).catch(e =>
            this.setState({             // Reset state with error from catch
              projectsSignedIn: [],
              loadingInProgress: false, // disable loading indicator
              error: e
            })
          );
  
      // set loading to true
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

    stateAsString(s){ //wandelt zahl des projektstatus in einen string um
      if (s ===3){
        return "freigegeben"
      }
      else if (s ===4){
        return "in Bewertung"
      }
      else{
        return "Bewertung abgeschlossen"
      }
    }
    

  // parentCall(){
  //   this.getProjectsByStudent(this.state.student.matr_nr);
  // }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log("gerendert")
    this.getProjectsByStateAccepted();
    // this.getProjectsByStudent(this.props.location.state.student.matr_nr);
    // console.log(this.state.student)
    // this.setState({
    //   student: this.props.location.state.student
    // }, () =>{this.getProjectsByStudent(this.state.student.matr_nr);

    // }
    // )
    
    // this.getProjectsByStudent(this.props.location.state.student.matr_nr)
   
  }

   /** Lifecycle method, which is called when the component was updated */
   componentDidUpdate(prevProps) {
    // reload participations if shown state changed. Occures if the ProjectListEntrys ExpansionPanel was expanded
    if ((this.props.show !== prevProps.show)) { 
    this.getProjectsByStateAccepted();
      }
    }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { projectsAvailable, projectsSignedIn, expandedProjectID, loadingInProgress, error, student} = this.state;
    // const student = this.props.location.state.student
    console.log(this.state)
  
    
    return (
        <div >
          <Grid className={classes.root} container spacing={3}>
            <Grid item xs={6}>
              <h1>Verfügbare Projekte</h1>
              
                {
                  projectsAvailable.map(project =>
                  <ProjectListEntryStudent 
                    key={project.getID()} 
                    project={project} 
                    expandedState={expandedProjectID === project.getID()}
                    onExpandedStateChange={this.onExpandedStateChange} 
                    student = {student}
                    onProjectDeleted={this.projectDeleted}
                    getProjects = {this.getProjectsByStudent}
                    getProjectsByStateAccepted = {this.getProjectsByStateAccepted}
                  />)
                }
                
                <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByStateAccepted} />
              
            </Grid>

            <Grid item xs={6}>

              <h1>Angemeldete Projekte</h1>
              <Paper className={classes.paper}>
                <div>
                  {projectsSignedIn.map(p => <ListItem>{"Projektname:" + " " + p.name + " - " + "Projektstatus:" + " " + this.stateAsString(p.project_state)}</ListItem >)}
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
    width: '100%',
    height: 650
  },
  projectFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
});

/** PropTypes */
ProjectListStudent.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjectListStudent));