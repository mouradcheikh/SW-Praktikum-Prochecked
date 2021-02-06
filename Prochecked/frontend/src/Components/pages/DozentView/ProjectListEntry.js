import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import { Button} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ParticipationList from './ParticipationList';
import CheckIcon from '@material-ui/icons/Check';
import {ProjectBO} from '../../../AppApi';
import  {AppApi}  from '../../../AppApi';
import Box from '@material-ui/core/Box';

/**
 * Ein ProjektListenEintrag enthält den Namen des Projekts und je nachdem in was für einem Bereich der jewilige
 * Eintrag sich befindet, werden dem Nutzer für den betreffenden Eintrag verschiedene Funktionen bereitgestellt.
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
    let updatedProject = Object.assign(new ProjectBO(), this.props.project);
    console.log(this.props.project)
    console.log(updatedProject)
    updatedProject.setProjectState(new_state);
    
   
    AppApi.getAPI().updateProject(updatedProject).then(project => {
      this.setState({
        project: project,
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null                     // no error message
      }, () => this.updateParentComponent());
      // keep the new state as base state
      // this.baseState.project = this.state.project;
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
    () => this.updateParentComponent()
    );
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }

  /** Handles onAccountDelete events from an AccountListEntry  */
  deleteAccountHandler = (deletedAccount) => {
    this.setState({
      accounts: this.state.accounts.filter(account => account.getID() !== deletedAccount.getID())
    })
  }

  // aktualisieren des status der elternkomponente, damit diese gerendert wird
  updateParentComponent = () => {
    this.props.updateComponent()
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
    return (
 
      project.project_state ===3?
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} 
        >
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
                
                <div>
                  <Box m={1}>
                  <Link to={{
                    pathname: '/updateProject',
                    state: { project: project, editButton: true }
                    }} style={{ textDecoration: 'none' }}
                    >
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                               edit
                        
                    </Button>
                  </Link>
                  </Box>
                </div>

               
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
