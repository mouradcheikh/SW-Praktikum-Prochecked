import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button,ButtonGroup } from '@material-ui/core';
import  {AppApi, ParticipationBO}  from '../../../AppApi';
import {ProjectBO} from '../../../AppApi';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from '@material-ui/icons/Add';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import CheckIcon from '@material-ui/icons/Check';

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
      project: this.props.project,
      showProjectForm: false,
      showProjectDeleteDialog: false,
      participation: null,
      participations: [],
      participatonsCounter: 0,
    };
  }


  updateParent = () => {
    this.props.getProjects()
  }


  /** Adds an participation for the current customer */
  addParticipation = () => {

    if(this.state.participationsCounter > 0){
      const participation = new ParticipationBO
    //   participation.setModule(this.state.project.getModule())
      console.log(this.props.student.id)
      participation.setStudent(this.props.student.id)
      participation.setProject(this.state.project.id)
      console.log(participation)
    AppApi.getAPI().createParticipation(participation).then(participationBO => {
      console.log(participationBO)
      this.setState({  // Set new state when ParticipationBOs have been fetched
        participation: participationBO,
        loadingInProgress: false, // loading indicator 
        addingParticipationError: null
      }, ()=> this.updateParent())
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        participation: null,
        loadingInProgress: false,
        addingParticipationError: e
      })
    );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      addingParticipationError: null
    });
  }
  else{
    alert("Sorry, Projekt ist bereits voll belegt");
  }
    }
      

/** Fetches ParticipationBOs for the current customer */
  getParticipationsByProject = () => {
  // console.log("vor fetch")

    var api = AppApi.getAPI()
    api.getParticipationsByProject(this.state.project.getID())
      .then(participationBOs => 
        this.setState({               // Set new state when ParticipationBOs have been fetched
          participations: participationBOs,
          // filteredParticipations: [...participationBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null,

        }, () => { this.countParticipations(); this.identPar()}
        
        )).catch(e =>
          this.setState({             // Reset state with error from catch
            participations: [],
            loadingInProgress: false, // disable loading indicator
            error: e
          }) 
        ); 
    // set loading to true
    // let capacity = this.state.project.capacity
    // let amountPart = this.state.participations.length
  
    this.setState({
      loadingInProgress: true,
      error: null,
      // participationsCounter: capacity-amountPart, 
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
      }, () => this.updateParent())
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
    this.state.participations.map(par =>  { console.log(par)
      if(par.student_id === this.props.student.id){
        this.setState({
          participation: par,
        })
    }
  }) 
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
    
  
  }
  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { project, showProjectForm, showProjectDeleteDialog, participations, participationsCounter, participation } = this.state;

    // console.log(this.state);
    // console.log(participation)
    return (
      
      participation !==null?

      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}accountpanel-header`}
          >
            
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item xs={7}>
                <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
                </Typography>
                <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
                </Typography>
                <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Verfügbare Plätze:"+ " "+ participationsCounter + "/" + project.capacity} 
                </Typography>
              </Grid>
                <Grid item xs={5}>
                <Button variant="contained"
                          color="secondary"
                          className={classes.buttonAblehnen}
                          startIcon={<HighlightOffIcon/>}
                          variant='outlined' color='primary' size='small' onClick={this.deleteParticipation}>
                  Abmelden
                </Button>

              
              </Grid>
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
          
          <Grid container wrap="nowrap" spacing={1} justify='flex-start' alignItems='center'>
            <Grid item zeroMinWidth xs={7}>
              <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
              </Typography>
              <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
              </Typography>
              <Typography style={{'overflowWrap': 'break-word'}} variant='body1' className={classes.heading}>{"Verfügbare Plätze:"+ " "+ participationsCounter + "/" + project.capacity} 
              </Typography>
            </Grid>
            <Grid item zeroMinWidth xs={5}>
              <Button                
                        color="secondary"
                        className={classes.buttonFreigeben}
                        startIcon={<CheckIcon/>}
                        variant="contained" color='primary' size='small'  onClick={this.addParticipation}>
                Anmelden
              </Button>

            
            </Grid>
          </Grid>
        </AccordionSummary>
       {/* <AccordionDetails> 
        </AccordionDetails> */}
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




