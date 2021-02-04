import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography,Grid} from '@material-ui/core';
import { Button} from '@material-ui/core';
import {AppApi}  from '../../../AppApi';
import {ProjectBO} from '../../../AppApi';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import CheckIcon from '@material-ui/icons/Check';
import ModuleForm from'../../dialogs/DropdownModule'
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

/**
 * Zeigt die Entry Komponente der ProjectListNew
 * 
 */

class ProjectListEntryNew extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      project: props.project,
      projecttypes: [],
      projecttype: null,
      showProjectForm: false,
      showProjectDeleteDialog: false,
      updatedProject: null,
    };
  }

  updateModule = (new_module, new_state) => {
    console.log("updatemodule")
    let updated_project = this.state.project
    updated_project.setModule(new_module)
    this.setState({
      project: updated_project
    }, () => {this.updateProject(new_state); console.log(this.state.project)})
  }

  updateProject = (new_state) => {
    // clone the original cutomer, in case the backend call fails
    console.log(new_state)
    let updatedProject = Object.assign(new ProjectBO(), this.state.project);
    // set the new attributes from our dialog
    
    updatedProject.setProjectState(new_state);
   
    AppApi.getAPI().updateProject(updatedProject).then(project => {
      this.setState({
        // project: project,
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null,
        updatedProject: updatedProject,                 // no error message
      }, () => this.updateParentComponent());
      // keep the new state as base state
      this.baseState.project = this.state.project;
      this.props.onClose(updatedProject);      // call the parent with the new project
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // disable loading indicator 
        updatingError: e                        // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,                 // show loading indicator
      updatingError: null                       // disable error message
    });
  }

  FreigabeButtonClicked = (event) => {
    this.setState({
      showProjectForm: true
    });
  }

  updateModuleOfProject = (project) => {
    this.setState({
      project: project
    }, () => console.log(this.state.project))
    
  }
  /** Delete accepted Project */
  deleteProject = (project) => {
    var api = AppApi.getAPI()
    api.deleteProject(project.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      }, () => this.updateParentComponent());
      // console.log(participation);
      this.props.onProjectDeleted(project);
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


  updateParentComponent = (() => {
    this.props.getProjectsByStateNew()
    this.props.getProjectsByStateDeclined()
    this.props.getProjectsByStateAccepted()
    console.log("else if state 3")
})

// retrns the name of the projecttypeid of the current project
  getProjectType = () => {
    let projecttype = null
    let projecttypes = this.state.projecttypes
    projecttypes.forEach(p => {
      console.log(p.id)
      if(p.id == this.state.project.getProjectType()){
        projecttype = p.getName()
        console.log(p)
      }
    })
    this.setState({
      projecttype: projecttype
    }, () => this.state.projecttype)
  }


getAllProjectTypes = () => {
  var api = AppApi.getAPI()
    api.getAllProjectTypes().then(projecttypes => {
      this.setState({
        projecttypes: projecttypes
      }, () => this.getProjectType())
    })
}

ProjectFormClosed = (project) => {
  // participation is not null and therefor changed
  if (project) {
    this.setState({
      project: project,
      showProjectForm: false
    });
  } else {
    this.setState({
      showProjectForm: false
    });
  }
}


componentDidMount(){
  this.getAllProjectTypes()
}

/** Handles click events from the transfer money button */

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { project, showProjectForm, showProjectDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      project.project_state ===1?
      <div>
          <Box m="0,5rem" p={2}>
          <Paper>
          <Box p={2}>
            <Grid container wrap="nowrap" spacing={1} justify='flex-start' alignItems='center'>
              <Grid zeroMinWidth item xs = {9}>
                <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
                </Typography>
                <Typography style={{'overflowWrap': 'break-word'}} variant='body1' 
                >{"Beschreibung:"+ " "+ project.getShortDescription()} 
                </Typography>
                <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Projektart:"+ " "+ this.state.projecttype} 
                </Typography>
                </Grid>
                <Grid zeroMinWidth item xs={3}>
                  <Button fullWidth
                          color='primary'
                          startIcon={<CheckIcon/>}
                          variant='contained'  size='small'  onClick={() => this.updateProject(3),() => this.FreigabeButtonClicked()}>
                  Freigeben
                  </Button>
                  
                  <Button variant="contained"
                          color="secondary"
                          fullWidth
                          startIcon={<HighlightOffIcon/>}
                          size='small' onClick={() => this.updateProject(2)}>
                  Ablehnen  
                  </Button>
                  </Grid>
                <ModuleForm show={showProjectForm} project={project} onClose={this.ProjectFormClosed} updateProject ={this.updateProject} updateModuleOfProject={this.updateModuleOfProject}/>
            </Grid>
            </Box>
            </Paper>
            </Box>
      </div>
      : project.project_state ===2?
      <div>
          <Box m="0,5rem" p={2}>
          <Paper>
          <Box p={2}>
          <Grid container wrap="nowrap" spacing={1} justify='flex-start' alignItems='center'>
            <Grid item zeroMinWidth  xs={7}>
              <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
              </Typography>
              <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
              </Typography>
            </Grid>
            <Grid item zeroMinWidth xs={5}>
                <Button 
                        startIcon={<CheckIcon/>}
                        variant='contained' 
                        color='primary' 
                        size='small' 
                        fullWidth 
                        onClick={() => this.updateProject(3)}>
                Freigeben
                </Button>
                <Button 
                        color="default"
                        startIcon={<ReplyRoundedIcon/>}
                        variant='text' 
                        color='default' 
                        size='small' 
                        fullWidth
                        onClick={() => this.updateModule(0, 1)}>
                Rückgängig
                </Button>
                <Button fullWidth variant= "text" color='secondary' size='small' endIcon={<DeleteIcon/>} onClick={() => this.deleteProject(project)}>
                Löschen
                </Button>  
            </Grid>       
          </Grid>
          </Box>
          </Paper>
          </Box>
    </div>
    : 
    <div>
      <Box m="0,5rem" p={2}>
        <Paper>
        <Box p={2}>
        <Grid wrap="nowrap" container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item zeroMinWidth xs={7}>
            <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
            </Typography>
            <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
            </Typography>
            </Grid>
          <Grid item zeroMinWidth xs={5}>
              <Button 
                      fullWidth
                      startIcon={<HighlightOffIcon/>}
                      variant='contained' 
                      color='secondary' 
                      size='small' 
                      onClick={() => this.updateModule(0, 2)}>
              Ablehnen
              </Button>
              <Button 
                      color="default"
                      fullWidth
                      startIcon={<ReplyRoundedIcon/>}
                      variant='text' 
                      size='small'  
                      onClick={() => this.updateModule(0, 1)}>
              Rückgängig
              </Button>
              <Button fullWidth variant= "text" color='secondary' size='small' endIcon={<DeleteIcon/>} onClick={() => this.deleteProject(project)}>
             Löschen
            </Button> 
          </Grid>
        </Grid>
        </Box>
        </Paper>
        </Box>
  </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  buttonFreigeben: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(65)
  },
  buttonAblehnen:{
    marginRight: theme.spacing(0),
  }

});
 
/** PropTypes */
ProjectListEntryNew.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be rendered */
  project: PropTypes.object.isRequired,
  /** The state of this ProjectListEntryNew. If true the project is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjectListEntryNew 
   * 
   * Signature: onExpandedStateChange(ProjectBO project)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /** 
   *  Event Handler function which is called after a sucessfull delete of this project.
   * 
   * Signature: onProjectDelete(ProjectBO project)
   */
  onProjectDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ProjectListEntryNew);




