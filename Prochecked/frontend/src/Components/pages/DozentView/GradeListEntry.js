import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AppAPI from '../../../AppApi/AppApi';
import GradeListParticipationEntry from './GradeListParicipationEntry'
import { Typography, Grid } from '@material-ui/core';
import LoadingProgress from '../../dialogs/LoadingProgress';

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
      sumOfGrades: 0,
      numberOfGrades: 0,
      average: 0,
      loadingInProgress: false
    };
  }

  /** Fetches ParticipationBOs for the current customer */
  getParticipationsByProject = () => {
    // console.log("vor fetch")

      var api = AppAPI.getAPI()
      console.log("getParticipations", this.props.project)
      api.getParticipationsByProject(this.props.project.getID())
        .then(participationBOs => 
          this.setState({               // Set new state when ParticipationBOs have been fetched
            participations: participationBOs,
            filteredParticipations: [...participationBOs], // store a copy
            loadingInProgress: false,   // disable loading indicator
            error: null
          }, () => this.getAverage())).catch(e =>
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

  
    getAverage = () => {
      console.log(this.state.participations)
      var number_grades = 0
      var sum = 0
      var average = 0
      var api = AppAPI.getAPI()
      this.state.participations.forEach((p)=> {
        api.getGradingById(p.getGrading()).then((grading) => {
          console.log(grading)
          let grade = grading.getGrade()
          let updated_grade = parseFloat(grade)
          console.log(updated_grade)
          number_grades += 1
          sum += updated_grade
          average = sum/number_grades
          console.log(average)
          this.setState({
            average: average,
            loadingInProgress: false
          })})
      })
      this.setState({
        loadingInProgress: true
      })
      
    }


  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log(this.props.participation.getStudent_id)
    this.getParticipationsByProject(); 
    console.log("Component GradeListEntryDidMount")
    }

  componentDidUpdate(prevProps){
    if (prevProps.project !== this.props.project)
    this.getParticipationsByProject(); 
    console.log("Component GradeListEntryDidUpdate")
  }
  
  /** Lifecycle method, which is called when the component was updated */
  // componentDidUpdate(prevProps) {
  //   // reload participations if shown state changed. 
  //   if ((this.props.show !== prevProps.show)) { 
  //     this.getParticipationsByProject();
  //     }
  //   }

  /** Renders the component */
  render() {
    const { classes, project } = this.props;
    // Use the states project
    const { participations } = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>
        <List className={classes.participationList}>
        <Grid item xs={12} fullwidth>
            <Typography variant='body1' className={classes.heading}>{this.props.project.name} 
            </Typography>
        </Grid>
        <ListItem>
        <LoadingProgress show={this.state.loadingInProgress}/>
        </ListItem>
          {
            participations.map(participation => <GradeListParticipationEntry key={participation.getID()} project={project} participation={participation} addGrade={this.addGrade}/>)
          }
        <br></br>
        <div>Durchschnitt: {this.state.average}</div>
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
