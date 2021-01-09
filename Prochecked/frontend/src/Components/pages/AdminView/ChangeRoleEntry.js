import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@material-ui/core";
import { Button, ButtonGroup } from "@material-ui/core";
import { AppApi } from "../../../AppApi";
import { PersonBO } from "../../../AppApi";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddIcon from "@material-ui/icons/Add";
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";
import CheckIcon from "@material-ui/icons/Check";
import App from "../../../App";

class ChangeRoleEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: props.role,
      updateRole: null,
    };
  }

  updateRole = (new_role) => {
    console.log(new_role);
    let updateRole = Object.assign(new PersonBO(), this.props.role);
    updateRole.setRole(new_role);

    AppApi.getAPI()
      .updateRole(updateRole)
      .then((role) => {
        this.setRole(
          {
            updatingInProgress: false, // disable loading indicator
            updatingError: null,
            updatedRole: updatedRole, // no error message
          },
          () => this.updateParentComponent()
        );
        // keep the new state as base state
        this.baseState.role = this.state.role;
        this.props.onClose(updatedRole); // call the parent with the new project
      })
      .catch((e) =>
        this.setRole({
          updatingInProgress: false, // disable loading indicator
          updatingError: e, // show error message
        })
      );

    // set loading to true
    this.setRole({
      updatingInProgress: true, // show loading indicator
      updatingError: null, // disable error message
    });
  };

  updateParentComponent = () => {
    this.props.getPersonByRole(role_id);
  };

  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { role } = this.state;

    // console.log(this.state);
    return role.role_id === 1 ? (
      <div>
        <Accordion
          defaultExpanded={false}
          expanded={expandedState}
          onChange={this.expansionPanelStateChanged}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            id={`role${role.getPersonByRole(role_id)}accountpanel-header`}
          >
            <Grid
              container
              spacing={1}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" className={classes.heading}>
                  {"Role:" + " " + role.getName()}
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.buttonFreigeben}
                    startIcon={<CheckIcon />}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => this.updateRole(2)}
                  >
                    Dozent
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.buttonAblehnen}
                    startIcon={<HighlightOffIcon />}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => this.updateRole(3)}
                  >
                    Admin
                  </Button>
                </Typography>
                <Typography variant="body1" className={classes.heading}>
                  {"Beschreibung:" + " "()}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </div>
    ) : role.role_id === 2 ? (
      <div>
        <Accordion
          defaultExpanded={false}
          expanded={expandedState}
          onChange={this.expansionPanelStateChanged}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            id={`role${role.getPersonByRole(role_id)}accountpanel-header`}
          >
            <Grid
              container
              spacing={1}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" className={classes.heading}>
                  {"Role:" + " " + role.getName()}
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<CheckIcon />}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => this.updateRole(1)}
                  >
                    Student
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<ReplyRoundedIcon />}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => this.updateRole(3)}
                  >
                    Admin
                  </Button>
                </Typography>
                <Typography variant="body1" className={classes.heading}>
                  {"Beschreibung:" + " "}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </div>
    ) : (
      <div>
        <Accordion
          defaultExpanded={false}
          expanded={expandedState}
          onChange={this.expansionPanelStateChanged}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            id={`role${role.getPersonByRole(role_id)}accountpanel-header`}
          >
            <Grid
              container
              spacing={1}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" className={classes.heading}>
                  {"Role:" + " " + role.getName()}
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<HighlightOffIcon />}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => this.updateRole(1)}
                  >
                    Student
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<ReplyRoundedIcon />}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => this.updateRole(2)}
                  >
                    Dozent
                  </Button>
                </Typography>
                <Typography variant="body1" className={classes.heading}>
                  {"Beschreibung:" + " "}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

/** Component specific styles */
const styles = (theme) => ({
  root: {
    width: "100%",
  },
  buttonFreigeben: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(65),
  },
  buttonAblehnen: {
    marginRight: theme.spacing(0),
  },
});

/** PropTypes */
ChangeRoleEntry.propTypes = {
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
  onProjectDeleted: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChangeRoleEntry);
