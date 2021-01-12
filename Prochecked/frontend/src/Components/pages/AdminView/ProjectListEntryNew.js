import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button,ButtonGroup } from '@material-ui/core';
import  {AppApi}  from '../../../AppApi';
import {ProjectBO} from '../../../AppApi';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from '@material-ui/icons/Add';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';




/**
 * Renders a ProjectBO object within a expandable/collapsible ProjectListEntryNew with the project manipulation
 * functions. If expanded, it renders a AccountList.
 * 
 * @see See [ProjectListNew](#projectlist)
 * 
 */
class ProjectListEntryNew extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      project: props.project,
      showProjectForm: false,
      showProjectDeleteDialog: false,
      updatedProject: null
    };
  }

  updateProject = (new_state) => {
    // clone the original cutomer, in case the backend call fails
    console.log(new_state)
    let updatedProject = Object.assign(new ProjectBO(), this.props.project);
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

  /** Delete accepted Project */
  deleteProject = () => {
    const { project } = this.props;
    var api = AppApi.getAPI()
    api.deleteProject(project.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      })
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

//   /** Handles onChange events of the underlying ExpansionPanel */
//   expansionPanelStateChanged = () => {
//     this.props.onExpandedStateChange(this.props.project);
//   }

//   /** Handles onAccountDelete events from an AccountListEntry  */
//   deleteAccountHandler = (deletedAccount) => {
//     // console.log(deletedAccount.getID());
//     this.setState({
//       accounts: this.state.accounts.filter(account => account.getID() !== deletedAccount.getID())
//     })
//   }

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
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}accountpanel-header`}
          >
            
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
                  <Button variant="contained"
                          color="secondary"
                          className={classes.buttonFreigeben}
                          startIcon={<CheckIcon/>}
                          variant='outlined' color='primary' size='small'  onClick={() => this.updateProject(3)}>
                  Freigeben
                  </Button>
                  <Button variant="contained"
                          color="secondary"
                          className={classes.buttonAblehnen}
                          startIcon={<HighlightOffIcon/>}
                          variant='outlined' color='primary' size='small' onClick={() => this.updateProject(2)}>
                  Ablehnen
                  </Button>
                </Typography>
                <Typography variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
         <AccordionDetails> 
          </AccordionDetails>
        </Accordion> 
      </div>
      : project.project_state ===2?
      <div>
      <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          id={`project${project.getID()}accountpanel-header`}
        >
          
          <Grid container spacing={1} justify='flex-start' alignItems='center'>
            <Grid item>
              <Typography variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
                <Button variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<CheckIcon/>}
                className={classes.button} variant='outlined' color='primary' size='small'  onClick={() => this.updateProject(3)}>
                Freigeben
                </Button>
                <Button variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<ReplyRoundedIcon/>}
                className={classes.button} variant='outlined' color='primary' size='small' onClick={() => this.updateProject(1)}>
                Rückgängig
                </Button>
                       
              
              </Typography>
              <Typography variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
       <AccordionDetails> 
        </AccordionDetails>
      </Accordion> 
    </div>
    : 
    <div>
    <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        id={`project${project.getID()}accountpanel-header`}
      >
        
        <Grid container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
              <Button variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<HighlightOffIcon/>}
              className={classes.button} variant='outlined' color='primary' size='small' onClick={() => this.updateProject(2)}>
              Ablehnen
              </Button>
              <Button variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<ReplyRoundedIcon/>}
              className={classes.button} variant='outlined' color='primary' size='small'  onClick={() => this.updateProject(1)}>
              Rückgängig
              </Button>
              <Button variant= "contained" color='secondary' size='small' endIcon={<DeleteIcon/>} onClick={() => this.updateProject(0)}>
             Löschen
            </Button> 
            </Typography>
            <Typography variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
     <AccordionDetails> 
      </AccordionDetails>
    </Accordion> 
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




