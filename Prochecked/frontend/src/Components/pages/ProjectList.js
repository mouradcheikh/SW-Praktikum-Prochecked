import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { AppApi } from '../../AppApi';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';
import ProjectForm from '../dialogs/ProjectForm';
import ProjectListEntry from '../ProjectListEntry';

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
    let expandedID = null;

    if (this.props.location.expandProject) {
      expandedID = this.props.location.expandProject.getID();
    }

    // Init an empty state
    this.state = {
      projects: [],
      filteredProjects: [],
      projectFilter: '',
      error: null,
      loadingInProgress: false,
      expandedProjectID: expandedID,
      showProjectForm: false //evtl.nicht 
    };
  }

  /** Fetches all ProjectBOs from the backend */
  getProjectsByDozent = (person_id) => {
  console.log("vor fetch")

    AppApi.getAPI().getProjectsByDozent(person_id)
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

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getProjectsByDozent(this.props.person.getID);
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

  /**
   * Handles onProjectDeleted events from the ProjectListEntry component
   *
   * @param {project} ProjectBO of the ProjectListEntry to be deleted
   */
  projectDeleted = project => {
    const newProjectList = this.state.projects.filter(projectFromState => projectFromState.getID() !== project.getID());
    this.setState({
      projects: newProjectList,
      filteredProjects: [...newProjectList],
      showProjectForm: false
    });
  }

  /** Handles the onClick event of the add project button */
  addProjectButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the CustmerForm
    this.setState({
      showProjectForm: true
    });
  }

  /** Handles the onClose event of the ProjectForm */
  projectFormClosed = project => {
    // project is not null and therefore created
    if (project) {
      const newProjectList = [...this.state.projects, project];
      this.setState({
        projects: newProjectList,
        filteredProjects: [...newProjectList],
        showProjectForm: false
      });
    } else {
      this.setState({
        showProjectForm: false
      });
    }
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

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredProjects, projectFilter, expandedProjectID, loadingInProgress, error, showProjectForm } = this.state;

    return (
      <div className={classes.root}>
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
          /*<Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addProjectButtonClicked}>
              Add Project
          </Button>
          </Grid>
        </Grid>*/
        {
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          filteredProjects.map(project =>
            <ProjectListEntry key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onProjectDeleted={this.projectDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByDozent} />
        <ProjectForm show={showProjectForm} onClose={this.projectFormClosed} />
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