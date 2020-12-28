import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from '../../dialogs/ContextErrorMessage';
import LoadingProgress from '../../dialogs/LoadingProgress';
import SemesterberichtEntry from './SemesterberichtEntry'
import AppAPI from '../../../AppApi/AppApi';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
/**
 * Controlls a list of SemesterberichtEntrys 
 *
 * @see See [SemesterberichtEntrys](#Semesterbericht)
 *
 */
class Semesterbericht extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      projects: [],
      filteredProjects: [],
      projectFilter: '',
      error: null,
      loadingInProgress: false,
      showProjectForm: false, //evtl.nicht 
      semesters: [],
      semester: null,
    };
  }

  /** Fetches all ProjectBOs from the backend */
  getProjectsByStudent = (person_id) => {
  // console.log("vor fetch")
    var api = AppAPI.getAPI()
    api.getProjectsByStudent(person_id) //evtl. Objekt von API vorher anlegen
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

//   /**
//    * Handles onExpandedStateChange events from the ProjectListEntry component. Toggels the expanded state of
//    * the ProjectListEntry of the given ProjectBO.
//    *
//    * @param {project} ProjectBO of the ProjectListEntry to be toggeled
//    */
//   onExpandedStateChange = project => {
//     // console.log(projectID);
//     // Set expandend project entry to null by default
//     let newID = null;

//     // If same project entry is clicked, collapse it else expand a new one
//     if (project.getID() !== this.state.expandedProjectID) {
//       // Expand the project entry with projectID
//       newID = project.getID();
//     }
//     // console.log(newID);
//     this.setState({
//       expandedProjectID: newID,
//     });
//   }

  /** Handels onChange events of the project filter text field */
//   filterFieldValueChange = event => {
//     const value = event.target.value.toLowerCase();
//     this.setState({
//       filteredProjects: this.state.projects.filter(project => {
//         let nameContainsValue = project.getName().toLowerCase().includes(value);

//         return nameContainsValue
//       }),
//       projectFilter: value
//     });
//   }

//   /** Handles the onClose event of the clear filter button */
//   clearFilterFieldButtonClicked = () => {
//     // Reset the filter
//     this.setState({
//       filteredProjects: [...this.state.projects],
//       projectFilter: ''
//     });
//   }


  semesterList(){
    var api = AppAPI.getAPI()
    api.getSemesters().then((semesters) =>
    {console.log(semesters)
    this.setState({
        semesters : semesters
    })})
  }

  handleSemFilter(event){
      this.setState({
        semester : event.target.value
      })
      let semester = this.state.semester
      let semester_id = semester.id
      let filtered_projects = []
      this.state.projects.forEach((project) => {
        if (project.getSemester() == semester_id) {
            filtered_projects.push(project)
        }
      }
      )
      this.setState({
          filteredProjects: filtered_projects
      })
  }


  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log("gerendert")
    let person = this.props.location.state.student
    this.getProjectsByStudent(12345); 
    // this.getProjectsByStudent(person.getMatrNr()); richtig
    // Im backend wird dann zuerst die id des studenten objekts rausgefunden mithilfe der matrikelnummer, dann mit der id die participations rausgeholt und dann mit der projekt id in den participations die projekte hochgeholt
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredProjects, projectFilter, expandedProjectID, loadingInProgress, error, showProjectForm } = this.state;

    return (
      <div className={classes.root}>
        <h1>Sehen Sie ihren Semesterbericht ein:</h1>
        {/* <Grid className={classes.projectFilter} container spacing={1} justify='flex-start' alignItems='center'>
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
        </Grid> */}
        <FormControl className={classes.formControl}>
            <InputLabel id="semester">Semester</InputLabel>
              <Select
                labelId="semester"
                id="semester"
                value={this.state.semester}
                onChange={this.handleSemFilter} 
                onOpen={this.semesterList}
              >
              {
              this.state.semesters.map((semester) => <MenuItem value = {semester}> {semester.name} </MenuItem>)
              }
              </Select>
        </FormControl>
        {
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          filteredProjects.map(project =>
            <SemesterberichtEntry key={project.id} project={project} 
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByStudent} />
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
  }
});

/** PropTypes */
Semesterbericht.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Semesterbericht));