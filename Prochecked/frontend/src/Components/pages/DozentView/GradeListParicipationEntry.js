import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid, ListItem } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GradeList from './GradeList'
import AppAPI from '../../../AppApi/AppApi'
import Paper from '@material-ui/core/Paper';
import LoadingProgress from '../../dialogs/LoadingProgress';


/**
 * Renders a ProjectBO object in the GradeList by selected filter (semester filter)
 * 
 * @see See [GradeList](#GradeList)
 * 
 */
class GradeListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      project: this.props.project,
      grading: null,
      participation: this.props.participation,
      student: null,
    };
  }

  getGrading = () => {
    var api = AppAPI.getAPI()
    api.getGradingById(this.props.participation.getGrading()).then((grading) =>
            {console.log(grading)
            this.setState({
                grading: grading,

            }, )}
            )
  }

  getStudent = () => {
    var api = AppAPI.getAPI()
    api.getStudent(this.props.participation.getStudent()).then((student) =>
            {console.log(student)
            this.setState({
                student: student,

            })}
            )
  }

  getGradeofGrading = () => {
    if(this.props.project.getProjectState() != 5){
      console.log(this.props.project)
      return "In Bewertung"
    }
    else if (this.state.grading === null){
      return "Loading..."
    }
    else {
      console.log(this.props.project)
      return this.state.grading.grade
    }
  }

  componentDidMount(){
    this.getGrading()
    this.getStudent()
  }


  
  /** Renders the component */
  render() {
    const { classes } = this.props;
    const {loadingInProgress} = this.state

    return (
    this.state.student != null?
      <div>
        <LoadingProgress show={loadingInProgress}/>
        <Grid container spacing={1} justify='flex-start' alignItems='center'>
            <Grid item xs={6}>{this.state.student.matr_nr + " - " + this.state.student.name}</Grid>
            <Grid item xs={6}>Note: {this.getGradeofGrading()}</Grid>
        </Grid>
      </div>
    : <div></div>
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
GradeListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be rendered */
  project: PropTypes.object.isRequired,
  /** The state of this SemesterberichtEntry. If true the project is shown with its accounts */
  student: PropTypes.object.isRequired,
}

export default withStyles(styles)(GradeListEntry);