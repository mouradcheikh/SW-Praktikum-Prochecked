import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AppApi, ProjectBO } from '../../AppApi';
import ParticipationBO from '../../AppApi/ParticipationBO';
// import AppAPI  from '../../AppApi/AppApi';
import StudentBO from '../../AppApi/StudentBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


/**
 * Shows a modal form dialog for a ParticipationBO in prop participation. If the participation is set, the dialog is configured 
 * as an edit dialog and the text fields of the form are filled from the given ParticipationBO object. 
 * If the participation is null, the dialog is configured as a new participation dialog and the textfields are empty.
 * In dependency of the edit/new state, the respective backend calls are made to update or create a participation. 
 * After that, the function of the onClose prop is called with the created/update ParticipationBO object as parameter.  
 * When the dialog is canceled, onClose is called with null.
 * 
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 * @see See Material-UIs [TextField](https://material-ui.com/components/text-fields//)
 */
class ModuleForm extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            project: null,
            module: null,
            modules: [],
            addingInProgress: false,
            updatingInProgress: false,
            addingError: null,
            updatingError: null,
        };
        // save this state for canceling
        this.baseState = this.state;
    }

    //   getAllModules = () => {
    //     var api = AppApi.getAPI()
    //     api.getAllModules().then(modules =>
    //       this.setState({
    //         modules: modules,
    //         loadingInProgress: false, // loading indicator 
    //         loadingError: null
    //       })).catch(e =>
    //         this.setState({ // Reset state with error from catch 
    //           modules: null,
    //           loadingInProgress: false,
    //           loadingError: e,
    //         })
    //       );

    //     // set loading to true
    //     this.setState({
    //       balance: 'loading',
    //       loadingInProgress: true,
    //       loadingError: null
    //     });
    //   }

    /** Updates the project */
    updateProject = () => {
        let updatedProject = Object.assign(new ProjectBO(), this.props.project);
        
        // set the new attributes from our dialog
        // console.log(this.state.module)
        updatedProject.setModule(this.state.module.id);
        this.updateModuleOfProject(updatedProject)
        // console.log(updatedProject)

        AppApi.getAPI().updateProject(updatedProject).then(project => {
            this.setState({
                updatingInProgress: false,              // disable loading indicator  
                updatingError: null                     // no error message
            }, () => this.updateProjects());
            // keep the new state as base state
            this.baseState.module = this.state.module;
        }).catch(e =>
            this.setState({
                updatingInProgress: false,              // disable loading indicator 
                updatingError: e                        // show error message
            })
        );

        // set loading to true
        this.setState({
            updatingInProgress: true,                 // show loading indicator
            updatingError: null                       // disable error message
        });
    }


    /** Handles the close / cancel button click event */
    handleClose = () => {
        // Reset the state
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    handleModule = (event) => {
        event.preventDefault();
        // console.log(event.target.value)
        this.setState({
            module: event.target.value
        })
    }

    getModuleList(){
        // console.log("getmodulelist")
        var api = AppApi.getAPI()
        api.getAllModules().then(modules => 
            this.setState({
                modules: modules,
                loadingInProgress: false, // loading indicator 
                loadingError: null
            })).catch(e =>
                this.setState({ // Reset state with error from catch 
                    modules: null,
                    loadingInProgress: false,
                    loadingError: e,
                })
            );
            
        // set loading to true
        this.setState({
            balance: 'loading',
            loadingInProgress: true,
            loadingError: null
        });
    }

    // getModulesByProjectType = (modules) => {
    //     let allprojecttypes = []
    //     var api = AppApi.getAPI()
    //     api.getAllProjectTypes().then((projecttypes) =>
    //     {projecttypes.forEach((p) => {allprojecttypes.push(p)})})

    //     let updated_modules = []
    //     modules.forEach(m => {
    //         if (this.state.project.getProjectType() === m.getProjectType()){
    //             updated_modules.push(m)
    //         }
    //     });
    //     return updated_modules
    // }

    updateProjects = () => {
        this.handleClose()
        this.props.updateProject(3)
        // console.log('aktualisiert alle akzeptierten projekte')
    }

    updateModuleOfProject = (project) => {
        this.props.updateModuleOfProject(project)
        // console.log("updated das modul der elternkomponente")
    }

    componentDidMount(){
        this.setState({
            project: this.props.project
        })
    }

    /** Renders the component */
    render() {
        const { classes, participation, show } = this.props;
        const { addingInProgress, addingError, updatingInProgress, updatingError, modules, module, project } = this.state;

        let title = '';
        let header = '';

        return (
            show ?
                <Dialog open={show} onClose={this.handleClose} fullWidth>
                    <DialogTitle id='form-dialog-title'>{title}
                        <IconButton className={classes.closeButton} onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="module">Modul</InputLabel>
                            <Select
                                labelId="module"
                                id="module"
                                value={module}
                                onChange={this.handleModule}
                                onOpen={this.getModuleList.bind(this)} //react benötigt "bind" das es in der Componente ankommt 
                            >
                                {modules.map((mod) => <MenuItem value={mod}> {mod.getedv()} {mod.getName()}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <LoadingProgress show={addingInProgress || updatingInProgress} />
                        {
                            // Show error message in dependency of participation prop
                            // project ?
                            <ContextErrorMessage error={updatingError} contextErrorMsg={`The project could not be updated.`} onReload={this.updateProject} />
                            // :
                            // <ContextErrorMessage error={addingError} contextErrorMsg={`The project could not be added.`} onReload={this.addParticipation} />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>
                            Cancel
                        </Button>
                                <Button variant='contained' onClick={this.updateProject} color='primary'>
                                    Zuweisen
                                </Button>
                    </DialogActions>
                </Dialog>
                : null
        );
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

/** PropTypes */
ModuleForm.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** The ParticipationBO to be edited */
    project: PropTypes.object,
    /** If true, the form is rendered */
    show: PropTypes.bool.isRequired,
    /**  
     * Handler function which is called, when the dialog is closed.
     * Sends the edited or created ParticipationBO as parameter or null, if cancel was pressed.
     *  
     * Signature: onClose(ParticipationBO participation);
     */
    onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ModuleForm);
