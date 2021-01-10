import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AppAPI from '../../../AppApi/AppApi';
import GradeListParticipationEntry from './GradeListParicipationEntry'

/**
 * Renders a list of GradeListParticipationEntry objects.
 * 
 * @see See [GradeListParticipationEntry](#GradeListParticipationEntry)
 * 
 */
class GradeListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      participations: [],
    };
  }

  /** Fetches ParticipationBOs for the current customer */
  getParticipationsByProject = () => {
    // console.log("vor fetch")

      var api = AppAPI.getAPI()
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
    const { participations } = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>
        <List className={classes.participationList}>
          {
            participations.map(participation => <GradeListParticipationEntry key={participation.getID()} project={project} participation={participation}/>)
          }
        </List>
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
GradeListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO of this ParticipationList */
  project: PropTypes.object.isRequired,
}

export default withStyles(styles)(GradeListEntry);
