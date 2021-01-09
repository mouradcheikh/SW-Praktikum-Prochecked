import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Typography,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { AppApi } from "../../../AppApi";
import ContextErrorMessage from "../../dialogs/ContextErrorMessage";
import LoadingProgress from "../../dialogs/LoadingProgress";
import ChangeRoleEntry from "./ChangeRoleEntry";
import Paper from "@material-ui/core/Paper";

/**
 * Controlls a list of ProjectListEntrys to create a accordion for each project.
 *
 * @see See [ProjectListEntry](#projectlistentry)
 *
 */
class ChangeRole extends Component {
  constructor(props) {
    super(props);

    // // console.log(props);
    // let expandedID = null;

    // if (this.props.location.expandProject) {
    //   expandedID = this.props.location.expandProject.getID();
    // }

    // Init an empty state
    this.state = {
      persons: [],
      students: [],
      dozents: [],
      admins: [],
      error: null,
      loadingInProgress: false,
    };
  }

  getPersons() {
    var api = AppApi.getAPI();
    console.log(api);
    api.getPersons().then((person) => {
      console.log(person);
      this.setState({
        persons: persons,
      });
    });
  }

  filterPersons() {
    let students = [];
    let dozents = [];
    let admins = [];

    this.state.persons.map.map((p) => {
      if (p.role_id === 1) {
        students.append(p);
      } else if (p.role_id === 2) {
        dozents.append(p);
      } else {
        admins.append(p);
      }

      // set loading to true
      this.setState({
        students: students,
        dozents: dozents,
        admins: admins,
        loadingInProgress: true,
        error: null,
      });
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log("gerendert")
    this.getPersons();
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const {
      Admins,
      Students,
      Dozents,
      expandedPersonID,
      loadingInProgress,
      error,
    } = this.state;

    return (
      <div className={classes.root}>
        <h1>Studenten</h1>
        {
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          Students.map((person) => (
            <ChangeRoleEntry
              key={person.getID()}
              person={person}
              expandedState={expandedPersonID === person.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              getPersons={this.getPersons}
            />
          ))
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage
          error={error}
          contextErrorMsg={`The list of Studendts could not be loaded.`}
          onReload={this.getStudents}
        />
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h1>Dozenten</h1>
              <Paper className={classes.paper}>
                {
                  // Show the list of ProjectListEntry components
                  // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
                  Dozents.map((project) => (
                    <ChangeRoleEntry
                      key={person.getID()}
                      person={person}
                      expandedState={expandedPersonID === project.getID()}
                      onExpandedStateChange={this.onExpandedStateChange}
                      getStudents={this.getPersonsByRole(1)}
                      getDozents={this.getPersonsByRole(2)}
                      getAdmins={this.getPersonsByRole(3)}
                    />
                  ))
                }
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage
                  error={error}
                  contextErrorMsg={`The list of Dozents could not be loaded.`}
                  onReload={this.getDozents}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <h1>Admins</h1>
              <Paper className={classes.paper}>
                {
                  // Show the list of ProjectListEntry components
                  // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
                  Admins.map((person) => (
                    <ChangeRoleEntry
                      key={person.getID()}
                      person={person}
                      expandedState={expandedPersonID === project.getID()}
                      onExpandedStateChange={this.onExpandedStateChange}
                      getStudents={this.getPersonsByRole(1)}
                      getDozents={this.getPersonsByRole(2)}
                      getAdmins={this.getPersonsByRole(3)}
                    />
                  ))
                }
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage
                  error={error}
                  contextErrorMsg={`The list of Admins could not be loaded.`}
                  onReload={this.getAdmins}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>

        {/* <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByState} /> */}
        {/* <ProjectForm show={showProjectForm} onClose={this.projectFormClosed} /> */}
      </div>
    );
  }
}

/** Component specific styles */
const styles = (theme) => ({
  root: {
    width: "100%",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
});

/** PropTypes */
ChangeRole.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ChangeRole));
