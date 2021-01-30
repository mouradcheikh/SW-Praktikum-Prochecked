import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import  {AppApi}  from '../../AppApi';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';
import ProjectForm from '../dialogs/ParticipationForm';
import ProjectListEntry from './ProjectListEntry';

/**
 * Controlls a list of ProjectListEntrys to create a accordion for each project.
 *
 * @see See [ProjectListEntry](#projectlistentry)
 *
 */
class ProjectList extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    // this.projectsFromEntry = this.projectsFromEntry.bind(this)

    let expandedID = null;

    if (this.props.location.expandProject) {
      expandedID = this.props.location.expandProject.getID();
    }


    let person = '';
    let adminProf = ''

    if (this.props.location.state !== undefined){

    if (this.props.location.state.linkState){
      person = this.props.location.state.linkState
    }
    if (this.props.location.state.adminProf){
      adminProf = this.props.location.state.adminProf
    }}
    


   
   

    // Init an empty state
    this.state = {
      person: null,
      projects: [],
      newProjects: [],
      projectsInReview: [],
      projectsReviewed: [],
      filteredProjects: [],
      projectFilter: '',
      error: null,
      loadingInProgress: false,
      expandedProjectID: expandedID,
      showProjectForm: false, //evtl.nicht 
      
      // adminProf:  this.props.location.state.adminProf, 
      // person: this.props.location.state.linkState 
      adminProf:  adminProf, 
      person: person 
    
    };
    console.log(this.state, this.props)
  }

  
  // projectsFromEntry(){
  //   this.setState({
  //     projectsInReview: this.projectsFromEntry
  //   })
  // }
  getProjectsByDozentNew = (person_id) => {
    // console.log("vor fetch")
      var api = AppApi.getAPI()
      api.getProjectsByDozentNew(person_id) //evtl. Objekt von API vorher anlegen
        .then(projectBOs =>
          this.setState({               // Set new state when ProjectBOs have been fetched
            projects: projectBOs,
            newProjects: [...projectBOs], // store a copy
            loadingInProgress: false,   // disable loading indicator
            error: null
          })).catch(e =>
            this.setState({             // Reset state with error from catch
              projects: [],
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

  /** Fetches all ProjectBOs from the backend */
  getProjectsByDozentAccepted = (person_id) => {
  // console.log("vor fetch")
    var api = AppApi.getAPI()
    api.getProjectsByDozentAccepted(person_id) //evtl. Objekt von API vorher anlegen
      .then(projectBOs =>
        this.setState({               // Set new state when ProjectBOs have been fetched
          projects: projectBOs,
          filteredProjects: [...projectBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
            projects: [],
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

   /** Fetches all ProjectBOs from the backend */
   getProjectsByDozentInReview = (person_id) => {
    //  console.log(person_id)
    // console.log("vor fetch")
      var api = AppApi.getAPI()
      api.getProjectsByDozentInReview(person_id) //evtl. Objekt von API vorher anlegen
        .then(projectBOs =>
          this.setState({               // Set new state when ProjectBOs have been fetched
            projectsInReview: projectBOs,
            // filteredProjects: [...projectBOs], // store a copy
            loadingInProgress: false,   // disable loading indicator
            error: null
          })).catch(e =>
            this.setState({             // Reset state with error from catch
              projectsInReview: [],
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

    
     /** Fetches all ProjectBOs from the backend */
     getProjectsByDozentReviewed = (person_id) => {
    // console.log("vor fetch")
      var api = AppApi.getAPI()
      api.getProjectsByDozentReviewed(person_id) //evtl. Objekt von API vorher anlegen
        .then(projectBOs =>
          this.setState({               // Set new state when ProjectBOs have been fetched
            projectsReviewed: projectBOs,
            // filteredProjects: [...projectBOs], // store a copy
            loadingInProgress: false,   // disable loading indicator
            error: null
          })).catch(e =>
            this.setState({             // Reset state with error from catch
              projectsReviewed: [],
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
 

  updateComponent = () => {
      this.getProjectsByDozentAccepted(this.state.person.id)
      this.getProjectsByDozentInReview(this.state.person.id)
      this.getProjectsByDozentNew(this.state.person.id)
      this.getProjectsByDozentReviewed(this.state.person.id)
    }
  
    
  /**
   * Handles onExpandedStateChange events from the ProjectListEntry component. Toggels the expanded state of
   * the ProjectListEntry of the given ProjectBO.
   *
   * @param {project} ProjectBO of the ProjectListEntry to be toggeled
   */
  onExpandedStateChange = project => {
    // console.log(projectID);
    // Set expandend project entry to null by default
    let newID = null;

    // If same project entry is clicked, collapse it else expand a new one
    if (project.getID() !== this.state.expandedProjectID) {
      // Expand the project entry with projectID
      newID = project.getID();
    }
    // console.log(newID);
    this.setState({
      expandedProjectID: newID,
    });
  }

  /** Handels onChange events of the project filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredProjects: this.state.projects.filter(project => {
        let nameContainsValue = project.getName().toLowerCase().includes(value);

        return nameContainsValue
      }),
      projectFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredProjects: [...this.state.projects],
      projectFilter: ''
    });
  }
  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // let adminProf = this.props.location.state.adminProf
    // let person = this.props.location.state.linkState  
    let adminProf =this.state.adminProf;
    let person = this.state.person
    if (person === undefined){
      this.getProjectsByDozentNew(adminProf.id);
      this.getProjectsByDozentAccepted(adminProf.id);
      this.getProjectsByDozentInReview(adminProf.id);
      this.getProjectsByDozentReviewed(adminProf.id);
    }
    else{
    console.log("else")
    let person = this.props.location.state.linkState
    console.log(person)
    this.setState({
      person: person
    })
    this.getProjectsByDozentNew(person.id);
    this.getProjectsByDozentAccepted(person.id);
    this.getProjectsByDozentInReview(person.id);
    this.getProjectsByDozentReviewed(person.id);
    } 
  }

  /** Renders the component */
  render() {
    const { classes, } = this.props;
    const { adminProf, person, newProjects, filteredProjects, projectsInReview, projectsReviewed, projectFilter, expandedProjectID, loadingInProgress, error} = this.state;
    console.log(this.state, this.props)
    return (
      <div className={classes.root}>
        <div >
          <h1>Pflegen Sie Ihre Projekte und bewerten Sie die Teilnehmer:</h1>
          <Grid className={classes.projectFilter} container spacing={1} justify='flex-start' alignItems='center'>
            <Grid item>
              <Typography>
                Projektfilter:
                </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                fullWidth
                id='projectFilter'
                type='text'
                value={projectFilter}
                onChange={this.filterFieldValueChange}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>
                    <IconButton onClick={this.clearFilterFieldButtonClicked}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>,
                }}
              />
            </Grid>
          </Grid>

        </div>

        <div>

      <h2>Projekte zur Freigabe übergeben</h2>
        {
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          newProjects.map(project =>
            <ProjectListEntry 
              key={project.getID()}
              project={project}
              expandedState={expandedProjectID === project.getID()}
              // projectsFromEntry={this.projectsFromEntry}
              onProjectDeleted={this.projectDeleted}
              onExpandedStateChange={this.onExpandedStateChange}
              person ={person} adminProf ={adminProf}
              updateComponent = {this.updateComponent}
            />)
        }
        
        <h2>Akzeptierte Projekte</h2>
        {
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          filteredProjects.map(project =>
            <ProjectListEntry key={project.getID()}
              project={project}
              expandedState={expandedProjectID === project.getID()}
              // projectsFromEntry={this.projectsFromEntry}
              onExpandedStateChange={this.onExpandedStateChange}
              onProjectDeleted={this.projectDeleted}
              person ={person} adminProf ={adminProf}
              updateComponent = {this.updateComponent}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByDozentAccepted} />
        {/* <ProjectForm show={showProjectForm} onClose={this.projectFormClosed} /> */}
        
        <h2>Projekte in Bewertung</h2>
        {
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          projectsInReview.map(project =>
            <ProjectListEntry key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onProjectDeleted={this.projectDeleted}
              person ={person} adminProf ={adminProf}
              updateComponent = {this.updateComponent}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByDozentInReview} />
        {/* <ProjectForm show={showProjectForm} onClose={this.projectFormClosed} /> */}
      </div>
      
      <div>
        <h2> Bewertete Projekte</h2>
          {
            // Show the list of ProjectListEntry components
            // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
            newProjects.map(project =>
              <ProjectListEntry 
                key={project.getID()}
                project={project}
                expandedState={expandedProjectID === project.getID()}
                // projectsFromEntry={this.projectsFromEntry}
                onProjectDeleted={this.projectDeleted}
                onExpandedStateChange={this.onExpandedStateChange}
                person ={person} adminProf ={adminProf}
                getProjectsByDozentNew = {this.getProjectsByDozentNew}
                getProjectsByDozentInReview = {this.getProjectsByDozentInReview}
                getProjectsByDozentReviewed = {this.getProjectsByDozentReviewed}
                getProjectsByDozentAccepted = {this.getProjectsByDozentAccepted}
              />)
          }
          
          <h2>Akzeptierte Projekte</h2>
          {
            // Show the list of ProjectListEntry components
            // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
            filteredProjects.map(project =>
              <ProjectListEntry key={project.getID()}
                project={project}
                expandedState={expandedProjectID === project.getID()}
                // projectsFromEntry={this.projectsFromEntry}
                onExpandedStateChange={this.onExpandedStateChange}
                onProjectDeleted={this.projectDeleted}
                person ={person} adminProf ={adminProf}
                updateComponent = {this.updateComponent}
              />)
          }
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByDozentAccepted} />
          {/* <ProjectForm show={showProjectForm} onClose={this.projectFormClosed} /> */}
          
          <h2>Projekte in Bewertung</h2>
          {
            // Show the list of ProjectListEntry components
            // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
            projectsInReview.map(project =>
              <ProjectListEntry key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
                onExpandedStateChange={this.onExpandedStateChange}
                onProjectDeleted={this.projectDeleted}
                person ={person} adminProf ={adminProf}
                getProjectsByDozentNew = {this.getProjectsByDozentNew}
                getProjectsByDozentInReview = {this.getProjectsByDozentInReview}
                getProjectsByDozentReviewed = {this.getProjectsByDozentReviewed}
                getProjectsByDozentAccepted = {this.getProjectsByDozentAccepted}
              />)
          }
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByDozentInReview} />
          {/* <ProjectForm show={showProjectForm} onClose={this.projectFormClosed} /> */}
        </div>
        
        <div>
          <h2> Bewertete Projekte</h2>
            {
              // Show the list of ProjectListEntry components
              // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
              projectsReviewed.map(project =>
                <ProjectListEntry key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
                  onExpandedStateChange={this.onExpandedStateChange}
                  onProjectDeleted={this.projectDeleted}
                  person ={person} adminProf ={adminProf}
                  getProjectsByDozentNew = {this.getProjectsByDozentNew}
                  getProjectsByDozentInReview = {this.getProjectsByDozentInReview}
                  getProjectsByDozentReviewed = {this.getProjectsByDozentReviewed}
                  getProjectsByDozentAccepted = {this.getProjectsByDozentAccepted}
                />)
            }
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByDozentReviewed} />
            {/* <ProjectForm show={showProjectForm} onClose={this.projectFormClosed} /> */}
            
        </div>

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
  }
});

/** PropTypes */
ProjectList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjectList));