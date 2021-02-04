import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles,Grid} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {AppApi} from '../../../AppApi';
import ContextErrorMessage from '../../dialogs/ContextErrorMessage';
import LoadingProgress from '../../dialogs/LoadingProgress';
import ProjectListEntryNew from './ProjectListEntryNew';

/**
 * Zeigt die Projekt Liste in der Admin View.
 * Es werden alle neue, abgelehnte sowie akzeptierte Projekte angezeigt.
 * Des Weiteren können hier Projekte abgelehnt, akzeptiert sowie gelöscht werden.
 */

class ProjectListNew extends Component {

  constructor(props) {
    super(props);

    this.state = {
      projectsNew: [],
      projectsAccepted: [],
      projectsDeclined: [],
      error: null,
      loadingInProgress: false,
    };
  }

  getProjectsByStateNew = () => {
      var api = AppApi.getAPI()
      api.getProjectsByState(1) 
        .then(projectBOs =>
          this.setState({
          projectsNew: projectBOs,
          loadingInProgress: false,   
          error: null
        })).catch(e =>
          this.setState({            
            projectsNew: [],
            loadingInProgress: false,
            error: e
          })
        );

    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  getProjectsByStateAccepted = () => {
      var api = AppApi.getAPI()
      api.getProjectsByState(3) 
        .then(projectBOs =>
          this.setState({
          projectsAccepted: projectBOs,
          loadingInProgress: false,   
          error: null
        })).catch(e =>
          this.setState({             
            projectsAccepted: [],
            loadingInProgress: false, 
            error: e
          })
        );

    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  getProjectsByStateDeclined = () => {
      var api = AppApi.getAPI()
      api.getProjectsByState(2) 
        .then(projectBOs =>
          this.setState({
          projectsDeclined: projectBOs,
          loadingInProgress: false,  
          error: null
        })).catch(e =>
          this.setState({           
            loadingInProgress: false, 
            error: e
          })
        );

    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // console.log("gerendert")
    this.getProjectsByStateNew();
    this.getProjectsByStateDeclined();
    this.getProjectsByStateAccepted();
  }

   /** Lifecycle method, which is called when the component was updated */
   componentDidUpdate(prevProps) {
    if ((this.props.show !== prevProps.show)) { 
    this.getProjectsByStateNew();
    this.getProjectsByStateDeclined();
    this.getProjectsByStateAccepted();
    }
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { projectsNew, projectsAccepted, projectsDeclined,expandedProjectID, loadingInProgress, error} = this.state;

    return (
      <div className={classes.root}>
        <h1>Neue Projekte</h1>
        {
          // Show the list of ProjectListEntry components
          projectsNew.map(project => 
            <ProjectListEntryNew key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onProjectDeleted={this.projectDeleted} getProjectsByStateNew={this.getProjectsByStateNew} getProjectsByStateDeclined={this.getProjectsByStateDeclined} 
              getProjectsByStateAccepted={this.getProjectsByStateAccepted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByStateNew} />
        <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
        <h1>Freigegebene Projekte</h1>
          {
          // Show the list of ProjectListEntry components
          projectsAccepted.map(project =>
            <ProjectListEntryNew key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onProjectDeleted={this.projectDeleted} getProjectsByStateNew={this.getProjectsByStateNew} getProjectsByStateDeclined={this.getProjectsByStateDeclined} 
              getProjectsByStateAccepted={this.getProjectsByStateAccepted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByStateAccepted} />
        </Grid>
        <Grid item xs={6}>
        <h1>Abgelehnte Projekte</h1>
          {
          // Show the list of ProjectListEntry components
          projectsDeclined.map(project =>
            <ProjectListEntryNew key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onProjectDeleted={this.projectDeleted} getProjectsByStateNew={this.getProjectsByStateNew} getProjectsByStateDeclined={this.getProjectsByStateDeclined} 
              getProjectsByStateAccepted={this.getProjectsByStateAccepted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjectsByStateDeclined} /> 
        </Grid>
      </Grid>
        </div>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  projectFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,

  },
});

/** PropTypes */
ProjectListNew.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjectListNew));