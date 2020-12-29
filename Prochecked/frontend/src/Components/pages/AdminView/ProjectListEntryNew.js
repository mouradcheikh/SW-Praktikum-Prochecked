import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';




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
      project: props.project,
      showProjectForm: false,
      showProjectDeleteDialog: false,
    };
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

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { project, showProjectForm, showProjectDeleteDialog } = this.state;

    // console.log(this.state);
    return (
 
      <div>

        <Grid className={classes.projectFilter} container spacing={1} justify='flex-start' alignItems='center'>
        <List>
            <ListItem>
                <Typography variant='body1' className={classes.heading}>{project.getName()}
                </Typography>
            </ListItem>
        </List>
        </Grid>
        {/* <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{project.getName()}
                </Typography>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of Participations</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
         <AccordionDetails>
            <ParticipationList show={expandedState} project={project} /> 
          </AccordionDetails>
        </Accordion>  */}
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
