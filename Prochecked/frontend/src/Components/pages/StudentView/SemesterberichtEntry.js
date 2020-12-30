import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Semesterbericht from './Semesterbericht'
import AppAPI from '../../../AppApi/AppApi'
import Paper from '@material-ui/core/Paper';
import LoadingProgress from '../../dialogs/LoadingProgress';


/**
 * Renders a ProjectBO object in the Semesterbericht by selected filter (semester filter)
 * 
 * @see See [Semesterbericht](#semesterbericht)
 * 
 */
class SemesterberichtEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      project: this.props.project,
      student: this.props.student,
      grading: null
    };
  }

  getGrade = () => {
    var api = AppAPI.getAPI()
    api.getGradingByProjectandMatr(1, 12345).then((grading) =>
            {console.log(grading)
            this.setState({
                grading: grading
            })}
            )
  }

  getGradeofGrading = () => {
    if(this.props.project.getCurrentState() != 5){
      return "In Bewertung"
    }
    else if (this.state.grading === null){
      return "loading"
    }
    else {
      return this.state.grading.grade
    }
  }

  componentDidMount(){
    this.getGrade()
  }
  
  /** Renders the component */
  render() {
    const { classes } = this.props;
    // Use the states project

    // console.log(this.state);
    return (
 
      <div>
        <Grid container spacing={1} justify='flex-start' alignItems='center'>
        <Grid item xs={8}>
            <Typography variant='body1' className={classes.heading}>{this.props.project.name} 
            </Typography>
          {/* <Paper className={classes.paper}>{this.props.project.name, "Note:", "2.0"}</Paper> */}
        </Grid>
        <Grid item xs={4}>
            <Typography variant='body1' className={classes.heading}>Note: {this.getGradeofGrading()}
            </Typography>
          {/* <Paper className={classes.paper}>{this.props.project.name, "Note:", "2.0"}</Paper> */}
        </Grid>
        </Grid>
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
SemesterberichtEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be rendered */
  project: PropTypes.object.isRequired,
  /** The state of this SemesterberichtEntry. If true the project is shown with its accounts */
}

export default withStyles(styles)(SemesterberichtEntry);