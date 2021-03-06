import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, Grid } from '@material-ui/core';
import { Button,Box} from '@material-ui/core';
import {AppApi, ParticipationBO}  from '../../../AppApi';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import LoadingProgress from '../../dialogs/LoadingProgress';

/**
 * Zeigt die ProjektList Entry von ProjectList
 */

class ProjectListEntryNew extends Component {

  constructor(props) {
    super(props);
    
    // Init the state
    this.state = {
      project: this.props.project,
      showProjectForm: false,
      showProjectDeleteDialog: false,
      participation: null,
      participations: [],
      participatonsCounter: 0,
      loadingInProgress: false,
      deletingInProgress: false
    };
  }

  updateParent = () => {
    this.props.getProjects(this.props.student.matr_nr)
    this.props.getProjectsByStateAccepted()
  }

  addParticipation = () => {

    if(this.state.participationsCounter > 0){
      const participation = new ParticipationBO
      participation.setStudent(this.props.student.id)
      participation.setProject(this.state.project.id)
    AppApi.getAPI().createParticipation(participation).then(participationBO => {
      this.setState({  
        participation: participationBO,
        loadingInProgress: false, 
        addingParticipationError: null
      }, ()=> {this.updateParent(); this.getParticipationsByProject()})
    }).catch(e =>
      this.setState({ 
        participation: null,
        loadingInProgress: false,
        addingParticipationError: e
      })
    );

    this.setState({
      loadingInProgress: true,
      addingParticipationError: null
    });
  }
  else{
    alert("Sorry, dass Projekt ist bereits voll belegt");
  }
    }
      
  getParticipationsByProject = () => {
    var api = AppApi.getAPI()
    api.getParticipationsByProject(this.state.project.getID())
      .then(participationBOs => 
        this.setState({              
          participations: participationBOs,
          loadingInProgress: false,   
          error: null,

        }, () => { console.log("nach state");this.countParticipations(); this.identPar()}
        
        )).catch(e =>
          this.setState({             
            participations: [],
            loadingInProgress: false, 
            error: e
          }) 
        ); 
  
    this.setState({
      loadingInProgress: true,
      error: null,
    },
   );
  }

   /** Deletes this participation */
   deleteParticipation = () => { console.log(this.state.participation, this.state.participation.getID())
    var api = AppApi.getAPI()
    api.deleteParticipation(this.state.participation.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      }, () => {this.updateParent(); this.getParticipationsByProject()})
      // console.log(participation);
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
    }, () => this.updateParent());
  }

  identPar(){ //identifiziert die Teilnahme des angemeldetetn studenten innerhalb der particiationListe(state) und setzt sie in das eigene state
    console.log(this.state.participations)
    if(this.state.participations.length === 0){
      console.log("else keine par")
      this.setState({
        participation: null,
      })
    }
    else{
      this.state.participations.forEach((par) =>  { console.log("ident", par)
        if(par.student_id === this.props.student.id){
          console.log("if")
          this.setState({
            participation: par,
          })
        }
      })}
    }

  countParticipations(){ //zählt die Teilnahmen und subtrahiert das Ergebnis mit der Kapazität des Projekts
    let capacity = this.state.project.capacity
    let amountPart = this.state.participations.length
    this.setState({
      participationsCounter: capacity-amountPart,
    })
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log("gerendert")
    this.getParticipationsByProject();
    console.log("Entry did miunt")
  }

  componentDidUpdate(){
    console.log("entryupdate")
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { project, participationsCounter, participation, loadingInProgress, deletingInProgress} = this.state;

    return (
      
      participation !==null?

      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            id={`project${project.getID()}accountpanel-header`}
          >
            
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item xs={8}>
              <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>
              <Box fontWeight="fontWeightBold">
              Projekt:
              </Box>
              <Box fontWeight="fontWeightLight">
              {" " + project.getName()} 
              </Box>
              </Typography>
              <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>
              <Box fontWeight="fontWeightBold">
              Beschreibung:
              </Box>
              <Box fontWeight="fontWeightLight">
              {" "+ project.getShortDescription()} 
              </Box>
              </Typography>
              <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>
              <Box fontWeight="fontWeightBold">
              Verfügbare Plätze:
              </Box>
              <Box fontWeight="fontWeightLight">
              {" "+ participationsCounter + "/" + project.capacity} 
              </Box>
              </Typography>
              </Grid>
                <Grid item xs={4}>
                <Button variant="contained"
                          color="secondary"
                          className={classes.buttonAblehnen}
                          startIcon={<HighlightOffIcon/>}
                          size='small' onClick={this.deleteParticipation}>
                  Abmelden
                </Button>

              
              </Grid>
              <LoadingProgress show={deletingInProgress} />
            </Grid>
            
          </AccordionSummary>
         {/* <AccordionDetails> 
          </AccordionDetails> */}
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
            <Grid item xs={8}>
              <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>
              <Box fontWeight="fontWeightBold">
              Projekt:
              </Box>
              <Box fontWeight="fontWeightLight">
              {" " + project.getName()} 
              </Box>
              </Typography>
              <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>
              <Box fontWeight="fontWeightBold">
              Beschreibung:
              </Box>
              <Box fontWeight="fontWeightLight">
              {" "+ project.getShortDescription()} 
              </Box>
              </Typography>
              <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>
              <Box fontWeight="fontWeightBold">
              Verfügbare Plätze:
              </Box>
              <Box fontWeight="fontWeightLight">
              {" "+ participationsCounter + "/" + project.capacity} 
              </Box>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button   
                        className={classes.buttonFreigeben}
                        startIcon={<CheckIcon/>}
                        variant="contained" color='primary' size='small'  onClick={this.addParticipation}>
                Anmelden
              </Button>
            </Grid>
            <LoadingProgress show={loadingInProgress} />
          </Grid>
        </AccordionSummary>
      </Accordion> 
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
  // buttonFreigeben: {
  //   marginRight: theme.spacing(0),
  //   marginLeft: theme.spacing(65)
  // },
  // buttonAblehnen:{
  //   marginRight: theme.spacing(0),
  // }

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




