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


  /** Adds an participation for the current customer */
  addParticipation = () => {
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
      })
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

        }, () => this.countParticipations()
        
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

  countParticipations(){
    let capacity = this.state.project.capacity
    let amountPart = this.state.participations.length
    console.log( capacity, amountPart)
    this.setState({
      participationsCounter: capacity-amountPart,
    })
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log("gerendert")
    this.getParticipationsByProject();
  
  }

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
    const { project, showProjectForm, showProjectDeleteDialog, participations, participationsCounter, participation } = this.state;

    // console.log(this.state);
    return (
    //   project.project_state ===1?
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}accountpanel-header`}
          >
            
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
                  
                  <Button                
                          color="secondary"
                          className={classes.buttonFreigeben}
                          startIcon={<CheckIcon/>}
                          variant="contained" color='primary' size='small'  onClick={this.addParticipation}>
                  Anmelden
                  </Button>
                  {/* <Button variant="contained"
                          color="secondary"
                          className={classes.buttonAblehnen}
                          startIcon={<HighlightOffIcon/>}
                          variant='outlined' color='primary' size='small' onClick={() => this.deleteParticipation}>
                  Abmelden
                  </Button> */}
                </Typography>
                <Typography variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
                </Typography>
                
                <Typography variant='body1' className={classes.heading}>{"verfügbare Plätze:"+ " "+ participationsCounter + "/" + project.capacity} 
                </Typography>

              
              </Grid>
            </Grid>
          </AccordionSummary>
         {/* <AccordionDetails> 
          </AccordionDetails> */}
        </Accordion> 
      </div>
//       : project.project_state ===2?
//       <div>
//       <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
//         <AccordionSummary
//           // expandIcon={<ExpandMoreIcon />}
//           id={`project${project.getID()}accountpanel-header`}
//         >
          
//           <Grid container spacing={1} justify='flex-start' alignItems='center'>
//             <Grid item>
//               <Typography variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
//                 <Button variant="contained"
//                         color="secondary"
//                         className={classes.button}
//                         startIcon={<CheckIcon/>}
//                 className={classes.button} variant='outlined' color='primary' size='small'  onClick={() => this.updateProject(3)}>
//                 Freigeben
//                 </Button>
//                 <Button variant="contained"
//                         color="secondary"
//                         className={classes.button}
//                         startIcon={<ReplyRoundedIcon/>}
//                 className={classes.button} variant='outlined' color='primary' size='small' onClick={() => this.updateProject(1)}>
//                 Rückgängig
//                 </Button>
//               </Typography>
//               <Typography variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
//               </Typography>
//             </Grid>
//           </Grid>
//         </AccordionSummary>
//        <AccordionDetails> 
//         </AccordionDetails>
//       </Accordion> 
//     </div>
//     : 
//     <div>
//     <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
//       <AccordionSummary
//         // expandIcon={<ExpandMoreIcon />}
//         id={`project${project.getID()}accountpanel-header`}
//       >
        
//         <Grid container spacing={1} justify='flex-start' alignItems='center'>
//           <Grid item>
//             <Typography variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()} 
//               <Button variant="contained"
//                       color="secondary"
//                       className={classes.button}
//                       startIcon={<HighlightOffIcon/>}
//               className={classes.button} variant='outlined' color='primary' size='small' onClick={() => this.updateProject(2)}>
//               Ablehnen
//               </Button>
//               <Button variant="contained"
//                       color="secondary"
//                       className={classes.button}
//                       startIcon={<ReplyRoundedIcon/>}
//               className={classes.button} variant='outlined' color='primary' size='small'  onClick={() => this.updateProject(1)}>
//               Rückgängig
//               </Button>
//             </Typography>
//             <Typography variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()} 
//             </Typography>
//           </Grid>
//         </Grid>
//       </AccordionSummary>
//      <AccordionDetails> 
//       </AccordionDetails>
//     </Accordion> 
//   </div>
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



