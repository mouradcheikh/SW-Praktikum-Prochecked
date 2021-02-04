import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem,Grid} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import  {AppApi}  from '../../../AppApi';
import ContextErrorMessage from '../../dialogs/ContextErrorMessage';
import ProjectListEntryStudent from './ProjectListEntryStudent';
import Paper from '@material-ui/core/Paper';

/**
 * Zeigt die Projekt anmelden Seite in der Studenten View.
 * Der Student kann sich hier für die angebotenen Projekte anmelden und abmelden.
 */

class ProjectListStudent extends Component {

  constructor(props) {
    super(props);

    let student = '';

    if(this.props.location.state.student){
      student = this.props.location.state.student
    }

    this.state = {
      projectsAvailable: [],
      projectsSignedIn: [],
      error: null,
      loadingInProgress: false,
      student: student,
    };
  }


  getProjectsByStateAccepted = () => {
      var api = AppApi.getAPI()
      api.getProjectsByState(3) 
        .then(projectBOs =>
          this.setState({
          projectsAvailable: projectBOs,
          loadingInProgress: false,   
          error: null
        })).catch(e =>
          this.setState({           
            projectsAvailable: [],
            loadingInProgress: false, 
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
      api.getProjectsByStudent(matr_nr) 
        .then(projectBOs =>
          this.setState({             
            projectsSignedIn: projectBOs,
            filteredProjects: [...projectBOs], 
            loadingInProgress: false,   
            error: null
          })).catch(e =>
            this.setState({            
              projectsSignedIn: [],
              loadingInProgress: false, 
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
    
  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getProjectsByStateAccepted();
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