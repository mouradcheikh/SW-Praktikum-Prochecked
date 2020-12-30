import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AppApi } from '../../AppApi';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';
import ParticipationListEntry from './ParticipationListEntry';

/**
 * Renders a list of ParticipationListEntry objects.
 * 
 * @see See [ParticipationListEntry](#participationlistentry)
 * 
 */
class ParticipationList extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      participations: [],
      loadingInProgress: false,
      loadingParticipationError: null,
      addingParticipationError: null,
    };
  }

  /** Fetches ParticipationBOs for the current customer */
  getParticipationsByProject = () => {
    // console.log("vor fetch")

      var api = AppApi.getAPI()
      api.getParticipationsByProject(this.props.project.getID())
        .then(participationBOs => 
          this.setState({               // Set new state when ParticipationBOs have been fetched
            participations: participationBOs,
            filteredParticipations: [...participationBOs], // store a copy
            loadingInProgress: false,   // disable loading indicator
            error: null
          })).catch(e =>
            this.setState({             // Reset state with error from catch
              participations: [],
              loadingInProgress: false, // disable loading indicator
              error: e
            }) 
          ); 
          // console.log(this.state.participations)
  
      // set loading to true
      this.setState({
        loadingInProgress: true,
        error: null
      });
    }

  /** Adds an participation for the current customer */
  addParticipation = () => {
    AppApi.getAPI().addParticipationForProject(this.props.project.getID()).then(participationBO => {
      // console.log(participationBO)
      this.setState({  // Set new state when ParticipationBOs have been fetched
        participations: [...this.state.participations, participationBO],
        loadingInProgress: false, // loading indicator 
        addingParticipationError: null
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        participations: [],
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

  /** Handles onParticipationDelete events from an ParticipationListEntry  */
  deleteParticipationHandler = (deletedParticipation) => {
    // console.log(deletedParticipation.getID());
    this.setState({
      participations: this.state.participations.filter(participation => participation.getID() !== deletedParticipation.getID())
    })
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log(this.props.participation.getStudent_id)
    this.getParticipationsByProject(); //props richtig ??
    }
  
  /** Lifecycle method, which is called when the component was updated */
  componentDidUpdate(prevProps) {
    // reload participations if shown state changed. Occures if the ProjectListEntrys ExpansionPanel was expanded
    if ((this.props.show !== prevProps.show)) { 
      this.getParticipationsByProject();
      }
    }

  /** Renders the component */
  render() {
    const { classes, project } = this.props;
    // Use the states project
    const { participations, loadingInProgress, loadingParticipationError, addingParticipationError } = this.state;

    // console.log(this.props);
    return (
      project.project_state === 5?
      <div className={classes.root}>
        <List className={classes.participationList}>
          {
            participations.map(participation => <ParticipationListEntry key={participation.getID()} project={project} participation={participation} onParticipationDeleted={this.deleteParticipationHandler}
              show={this.props.show} />)
          }
          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={loadingParticipationError} contextErrorMsg={`List of participations for project ${project.getID()} could not be loaded.`} onReload={this.getParticipationsByProject} />
            <ContextErrorMessage error={addingParticipationError} contextErrorMsg={`Participation for project ${project.getID()} could not be added.`} onReload={this.addParticipation} />
          </ListItem>
        </List>
      </div>
      :
      <div className={classes.root}>
        <List className={classes.participationList}>
          {
            participations.map(participation => <ParticipationListEntry key={participation.getID()} project={project} participation={participation} onParticipationDeleted={this.deleteParticipationHandler}
              show={this.props.show} />)
          }
          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={loadingParticipationError} contextErrorMsg={`List of participations for project ${project.getID()} could not be loaded.`} onReload={this.getParticipationsByProject} />
            <ContextErrorMessage error={addingParticipationError} contextErrorMsg={`Participation for project ${project.getID()} could not be added.`} onReload={this.addParticipation} />
          </ListItem>
        </List>
        <Button className={classes.addParticipationButton} variant='contained' color='primary' startIcon={<AddIcon/>} onClick={this.addParticipation}>
          Teilnahme hinzufügen
        </Button>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  participationList: {
    marginBottom: theme.spacing(2),
  },
});

/** PropTypes */
ParticipationList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO of this ParticipationList */
  project: PropTypes.object.isRequired,
  /** If true, participations are (re)loaded */
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(ParticipationList);
