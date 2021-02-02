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
 * Die Seite zeigt den Semesterbericht des Studenten an.
 * Er sieht hier welche Projekte in Bewertung sich befinden und welche schon bewertet wurden.
 */

class Semesterbericht extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      filteredProjects: [],
      projectFilter: '',
      error: null,
      loadingInProgress: false,
      semesters: [],
      semester: null,
      student: null
    };
  }

  /** Fetches ProjectBOsbyMatrNr from the backend */
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


  semesterList = () => {
    var api = AppAPI.getAPI()
    api.getSemesters().then((semesters) =>
    
    this.setState({
        semesters : semesters
    })
  )
  }

  handleSemFilter = (event) => {
      console.log(event.target.value)
      if (event.target.value === "all"){
        this.setState({
          semester : "all",
          filteredProjects : this.state.projects,
        })
      }
      else{
      this.setState({
        semester : event.target.value
      }, () => {this.updateFilteredSemesters()})
    }
  }

  updateFilteredSemesters = () => {
      let semester = this.state.semester
      let semester_id = semester.id
      let filtered_projects = []
      this.state.projects.forEach((project) => {
        if (project.getSemester() === semester_id) {
            console.log(project)
            filtered_projects.push(project)
        }
      }
      )
      this.setState({
          filteredProjects: filtered_projects
      }, () => {console.log(this.state.filteredProjects)})  
  }


  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    let person = this.props.location.state.student
    this.setState({
      student: this.props.location.state.student
    })
    this.getProjectsByStudent(person.matr_nr)
    // Im backend wird dann zuerst die id des studenten objekts rausgefunden mithilfe der matrikelnummer, dann mit der id die participations rausgeholt und dann mit der projekt id in den participations die projekte hochgeholt
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { projectFilter, expandedProjectID, loadingInProgress, error, showProjectForm } = this.state;

    return (
      <div className={classes.root}>
        <h1>Sehen Sie ihren Semesterbericht ein:</h1>
        <FormControl className={classes.formControl} fullWidth margin='normal'>
            <InputLabel id="semester">Semester</InputLabel>
              <Select
                labelId="semester"
                id="semester"
                value={this.state.semester}
                onChange={this.handleSemFilter} 
                onOpen={this.semesterList}
              >
              <MenuItem value = "all">alle Projekte</MenuItem>
              {
              this.state.semesters.map((semester) => <MenuItem value = {semester}> {semester.name} </MenuItem>)
              }
              </Select>
        </FormControl>
        {
          // Show the list of SemesterListEntry components
          this.state.filteredProjects.map((project) =>
            <SemesterberichtEntry project_id={project.id} project={project} student={this.state.student}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByStudent} />
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
Semesterbericht.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Semesterbericht));