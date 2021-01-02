import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import  {AppApi}  from '../../../AppApi';
import ContextErrorMessage from '../../dialogs/ContextErrorMessage';
import LoadingProgress from '../../dialogs/LoadingProgress';
import ProjectListEntryNew from './ProjectListEntryNew';
import Paper from '@material-ui/core/Paper';

/**
 * Controlls a list of ProjectListEntrys to create a accordion for each project.
 *
 * @see See [ProjectListEntry](#projectlistentry)
 *
 */
class ProjectListNew extends Component {

  constructor(props) {
    super(props);

    // // console.log(props);
    // let expandedID = null;

    // if (this.props.location.expandProject) {
    //   expandedID = this.props.location.expandProject.getID();
    // }

    // Init an empty state
    this.state = {
      // projectNew: [],
      projectsNew: [],
      projectsAccepted: [],
      projectsDeclined: [],
      error: null,
      loadingInProgress: false,
      // expandedProjectID: expandedID,
    };
  }

  getProjectsByStateNew = () => {
    // console.log("vor fetch")
      var api = AppApi.getAPI()
      api.getProjectsByState(1) //evtl. Objekt von API vorher anlegen
        .then(projectBOs =>
          this.setState({
          projectsNew: projectBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
            projectsNew: [],
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

  getProjectsByStateAccepted = () => {
    // console.log("vor fetch")
      var api = AppApi.getAPI()
      api.getProjectsByState(3) //evtl. Objekt von API vorher anlegen
        .then(projectBOs =>
          this.setState({
          projectsAccepted: projectBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
            projectsAccepted: [],
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

  getProjectsByStateDeclined = () => {
    // console.log("vor fetch")
      var api = AppApi.getAPI()
      api.getProjectsByState(2) //evtl. Objekt von API vorher anlegen
        .then(projectBOs =>
          this.setState({
          projectsDeclined: projectBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
            projectsDeclined: [],
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


  // /**
  //  * Handles onExpandedStateChange events from the ProjectListEntry component. Toggels the expanded state of
  //  * the ProjectListEntry of the given ProjectBO.
  //  *
  //  * @param {project} ProjectBO of the ProjectListEntry to be toggeled
  //  */
  // onExpandedStateChange = project => {
  //   // console.log(projectID);
  //   // Set expandend project entry to null by default
  //   let newID = null;

  //   // If same project entry is clicked, collapse it else expand a new one
  //   if (project.getID() !== this.state.expandedProjectID) {
  //     // Expand the project entry with projectID
  //     newID = project.getID();
  //   }
  //   // console.log(newID);
  //   this.setState({
  //     expandedProjectID: newID,
  //   });
  // }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log("gerendert")
    this.getProjectsByStateNew();
    this.getProjectsByStateDeclined();
    this.getProjectsByStateAccepted();
  }

   /** Lifecycle method, which is called when the component was updated */
   componentDidUpdate(prevProps) {
    // reload participations if shown state changed. Occures if the ProjectListEntrys ExpansionPanel was expanded
    if ((this.props.show !== prevProps.show)) { 
      this.getProjectsByStateNew();
    this.getProjectsByStateDeclined();
    this.getProjectsByStateAccepted();
      }
    }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredProjects, projectsNew, projectsAccepted, projectsDeclined,  projectFilter, expandedProjectID, loadingInProgress, error, showProjectForm } = this.state;

    return (
      <div className={classes.root}>
        <h1>Neue Projekte</h1>
        {
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          projectsNew.map(project => 
            <ProjectListEntryNew key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onProjectDeleted={this.projectDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByStateNew} />
        <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
        <h1>Freigegebene Projekte</h1>
          <Paper className={classes.paper}>
          {
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          projectsAccepted.map(project =>
            <ProjectListEntryNew key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onProjectDeleted={this.projectDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByStateAccepted} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
        <h1>Abgelehnte Projekte</h1>
          <Paper className={classes.paper}>
          {
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          projectsDeclined.map(project =>
            <ProjectListEntryNew key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onProjectDeleted={this.projectDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByStateDeclined} /> 
          </Paper>
        </Grid>
      </Grid>
        </div>
        
        {/* <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByState} /> */}
        {/* <ProjectForm show={showProjectForm} onClose={this.projectFormClosed} /> */}
      </div>
    );
  }
}


/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
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
ProjectListNew.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjectListNew));