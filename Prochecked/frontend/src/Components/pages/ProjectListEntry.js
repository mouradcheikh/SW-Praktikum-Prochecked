import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ProjectForm from '../dialogs/ParticipationForm';
// import ProjectDeleteDialog from '../../Components/dialogs/ProjectDeleteDialog';
import ParticipationList from './ParticipationList';
import CheckIcon from '@material-ui/icons/Check';
import {ProjectBO} from '../../AppApi';
import  {AppApi}  from '../../AppApi';

/**
 * Renders a ProjectBO object within a expandable/collapsible ProjectListEntry with the project manipulation
 * functions. If expanded, it renders a AccountList.
 * 
 * @see See [ProjectList](#projectlist)
 * 
 */
class ProjectListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      project: props.project,
      showProjectForm: false,
      showProjectDeleteDialog: false,
      updatingInProgress: false,
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
        project: project,
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null                     // no error message
      }, () => this.updateParentComponent());
      // keep the new state as base state
      // this.baseState.project = this.state.project;
      // this.props.onClose(updatedProject);      // call the parent with the new project
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
    }, 
    () => this.parentCall()
    );
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }

  /** Handles onAccountDelete events from an AccountListEntry  */
  deleteAccountHandler = (deletedAccount) => {
    // console.log(deletedAccount.getID());
    this.setState({
      accounts: this.state.accounts.filter(account => account.getID() !== deletedAccount.getID())
    })
  }

  // aktualisieren des status der elternkomponente, damit diese gerendert wird
  updateParentComponent = () => {
    this.props.getProjectsByDozentAccepted(this.props.person.id)
    this.props.getProjectsByDozentInReview(this.props.person.id)
    this.props.getProjectsByDozentReviewed(this.props.person.id)
  }

  evaluate(){
    let zustand = this.state.project.project_state
    // console.log(passed)
    // if (passed !== undefined){
      if (zustand == 4){
        return "In Bewertung"
      }      
      else if (zustand == 5){
        return "Bewertung abgeschlossen"
      }   
      
    // }
  }

  parentCall = (() => {
    if (this.props.adminProf === undefined){
     
      this.props.getProjectsByDozentNew(this.props.person.id)
      this.props.getProjectsByDozentAccepted(this.props.person.id)
      this.props.getProjectsByDozentInReview(this.props.person.id)
      this.props.getProjectsByDozentReviewed(this.props.person.id)
     
    }
    else{
      
      this.props.getProjectsByDozentNew(this.props.adminProf.id)
      this.props.getProjectsByDozentAccepted(this.props.adminProf.id)
      this.props.getProjectsByDozentInReview(this.props.adminProf.id)
      this.props.getProjectsByDozentReviewed(this.props.adminProf.id)
    }

    
  });

  /** Renders the component */
  render() {
    const { classes, expandedState} = this.props;
    // Use the states project
    const { project} = this.state;

    // console.log(this.state);
    return (
 
      project.project_state ===3?
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center' >
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{project.getName()}
                </Typography>
                </Grid>
                <Grid direction="row"
                      alignItems="center"
                      justify="flex-end">
                <Button variant="contained"
                          color="secondary"
                          className={classes.buttonFreigeben}
                          startIcon={<CheckIcon/>}
                          variant='outlined'
                          color='primary' 
                          size='small'  
                          onClick={() => this.updateProject(4)}>
                  Bewerten
                </Button>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of Participations</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ParticipationList show={expandedState} project={project} /> 
          </AccordionDetails>
        </Accordion>
      </div>

      :project.project_state ===1?
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{project.getName()}
                </Typography>
              </Grid>
                {/* <Grid item>
                <Typography variant='body2' color={'textSecondary'}>Status: {this.evaluate()}</Typography>
              </Grid> */}

              <Grid>
                
              </Grid>
              <Grid item xs />
              <Grid item>
                
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
             Dieses Projekt wird momentan noch geprüft und ist noch nicht freigegeben!
          </AccordionDetails>
        </Accordion>
      </div>

      :project.project_state ===4?
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{project.getName()}
                </Typography>
              </Grid>
                {/* <Grid item>
                <Typography variant='body2' color={'textSecondary'}>Status: {this.evaluate()}</Typography>
              </Grid> */}

              <Grid>
                <Button variant="contained"
                          color="secondary"
                          className={classes.buttonFreigeben}
                          startIcon={<CheckIcon/>}
                          variant='outlined' color='primary' size='small'  onClick={() => this.updateProject(5)}>
                  Bewertung abschließen
                </Button>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of Participations</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ParticipationList show={expandedState} project={project} /> 
          </AccordionDetails>
        </Accordion>
      </div>
      :
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{project.getName()}
                </Typography>
                {/* <Grid item>
                <Typography variant='body2' color={'textSecondary'}>Status: {this.evaluate()}</Typography>
                </Grid> */}
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of Participations</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ParticipationList show={expandedState} project={project} /> 
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
  }
});

/** PropTypes */
ProjectListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be rendered */
  project: PropTypes.object.isRequired,
  /** The state of this ProjectListEntry. If true the project is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjectListEntry 
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

export default withStyles(styles)(ProjectListEntry);
