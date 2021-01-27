import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from '../../dialogs/ContextErrorMessage';
import LoadingProgress from '../../dialogs/LoadingProgress';
import GradeListEntry from './GradeListEntry'
import AppAPI from '../../../AppApi/AppApi';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import ModuleBO from '../../../AppApi/ModuleBO'
/**
 * Controlls a list of GradeListEntrys
 *
 * @see See [GradeListEntrys](#gradeList)
 *
 */
class GradeList extends Component {

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
      semesterId: null,
      person: null,
      modules: [],
      module: null,
      moduleId: null,
    };
  }

  /** Fetches ProjectBOsbyState from the backend */
  getProjectsByState = (state) => {
    console.log(this.props.location.state.person)
    var api = AppAPI.getAPI()
    api.getProjectsByState(state) 
      .then((projectBOs) => {
        let projectsOfPersonLoggedIn = []
        projectBOs.forEach((p) => {
            if (p.getDozent() === this.state.person.id){
                projectsOfPersonLoggedIn.push(p)
            }
        })
        this.setState({               // Set new state when ProjectBOs have been fetched
          projects: projectsOfPersonLoggedIn,
          loadingInProgress: false,   // disable loading indicator
          error: null
        }, () => console.log(this.state.projects))}).catch(e =>
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

  /** Ruft eine Methode aus der AppAPI auf, um Semester aus dem Backend zu fetchen*/
  semesterList = () => {
    var api = AppAPI.getAPI()
    api.getSemesters().then((semesters) =>
    
    this.setState({
        semesters : semesters,
    })
  )
  }

  /** Ruft eine Methode aus der AppAPI auf, um Module aus dem Backend zu fetchen*/
  moduleList = () => {
    var api = AppAPI.getAPI()
    api.getAllModules().then((modules) => {
    console.log(modules)
    this.setState({
        modules : modules,
    })
    })
  }

  handleSemFilter = (event) => {
      event.preventDefault();
      console.log(event.target.value)
      this.setState({
        semester : event.target.value,
        semesterId : event.target.value.id
      }, () => {this.updateFilteredProjects()})
    
  }

  handleModFilter = (event) => {
    event.preventDefault();
    console.info("handlemod")
    this.setState({
      module : event.target.value,
      moduleId : event.target.value.id
    }, () => {this.updateFilteredProjects()})
  
}

  updateFilteredProjects = () => {
    if (this.state.semester != null && this.state.module != null){
      let semester_id = this.state.semester.id
      let module_id = this.state.module.id
      let filtered_projects = []
      console.log(this.state.projects)
      this.state.projects.forEach((project) => {
        if (project.getSemester() === semester_id && project.getModule() === module_id) {
            console.log(project)
            filtered_projects.push(project)
        }
      }
      )
      this.setState({
          filteredProjects: filtered_projects
      }) 
    } 
  }


  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.setState({
        person: this.props.location.state.person
    }, () => {this.getProjectsByState(5)})
    this.semesterList()
  }


  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { projectFilter, expandedProjectID, loadingInProgress, error, showProjectForm } = this.state;

    return (
      <div className={classes.root}>
        <h1>Notenliste:</h1>
        <FormControl className={classes.formControl} fullWidth margin='normal'>
            <InputLabel shrink id="semester">Semester</InputLabel>
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
        <FormControl className={classes.formControl} fullWidth margin='normal'>
            <InputLabel shrink id="module">Modul (Edv Nummer)</InputLabel>
              <Select
                labelId="module"
                id="module"
                value={this.state.module}
                onChange={this.handleModFilter} 
                onOpen={this.moduleList}
              >
              {
              this.state.modules.map((module) => <MenuItem value = {module}> {module.getedv()} </MenuItem>)
              }
              </Select>
        </FormControl>
        {
          // Show the list of SemesterListEntry components
          this.state.filteredProjects.map((project) =>
            <GradeListEntry project_id={project.id} project={project} person={this.state.person} 
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
GradeList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(GradeList));