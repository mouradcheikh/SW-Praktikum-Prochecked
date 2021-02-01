import React from "react";
import {
  TextField,
  withStyles,
  Button,
  List,
  ListItem,
  Link,
  Typography,
  Input,
  Grid,
} from "@material-ui/core";
import { AppApi } from "../../../AppApi";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from '@material-ui/icons/Save';
import ProjectTypeBO from "../../../AppApi/ProjectTypeBO";


/**
 * Zeigt die Seite um einen Projekttyp zu erstellen.
 * Es können Projekttypen erstellt, editiert und gelöscht werden.
 */

class CreateProjectType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '', //für CreateProjectType
      ects:'',
      sws:'',
      type: '',
      updateT: '',
      allTypes: [], // für alle Projekttypen 
      typeValidationFailed: false, //prüft eingabe des projectType im Textfeld
      success: false, //r:nach eingabe der Rolle wird state auf true gesetzt --> status erfolgreich wird angezeigt
      editButton: false
    };
    this.handleChange = this.handleChange.bind(this);
  }



  /** Create projecType */
  createProjectType(name, ects, sws){
      var api = AppApi.getAPI()
      console.log(name, ects, sws)
      api.createProjectType(name, ects, sws).then((type) =>
          {
            // console.log(projecType)
          this.setState({
              type: type
          },
          this.ProjectTypeList()
          )}
          )
        }


  /** Delete Type */
  deleteProjectType = (t) => {
    console.log(t.getID());
    var api = AppApi.getAPI();
    api.deleteProjectType(t.getID())
      .then(() => {
        this.setState({
          // Set new state when ParticipationBOs have been fetched
          deletingInProgress: false, // loading indicator
          deletingError: null,
        });
      })
      .catch((e) =>
        this.setState({
          // Reset state with error from catch
          deletingInProgress: false,
          deletingError: e,
        })
      );
    // set loading to true
    this.setState({
      deletingInProgress: true,
      deletingError: null,
    }, ()=> {this.ProjectTypeList()});
  };

    /** Updates the projecttype */
    updateProjectType = () => {
      // console.log(s)
      // s.preventDefault();
      // clone the original participation, in case the backend call fails
      let updatedProjectType = Object.assign(new ProjectTypeBO(), this.state.updateT);
      updatedProjectType.setName(this.state.name)
      updatedProjectType.setSws(this.state.sws)
      updatedProjectType.setEcts(this.state.ects)
      console.log(updatedProjectType)
      AppApi.getAPI().updateProjectType(updatedProjectType).then(type => {
        this.setState({
          type: type,
          success: true
        },() => this.ProjectTypeList()
        );
                
      });
    }

  ProjectTypeList(){
    var api = AppApi.getAPI()
    api.getProjectType().then((allTypes) =>
      {
          this.setState({
            allTypes: allTypes
            })}
            )
          }

  
  

  handleSubmit = (event) => {
    event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
    if (this.state.editButton === false){
      this.createProjectType(
        this.state.name, 
        this.state.sws,
        this.state.ects,
            )}
    else {this.updateProjectType(this.state.semester)
          }}
  
  handleChange(e) { 
    this.setState({ [e.target.name]: e.target.value });
        // console.log({ [e.target.name]: e.target.value })
      }





/** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
    componentDidMount() {
      this.ProjectTypeList();
    }

  render() {
    const { classes } = this.props;
    const { name, type, sws, ects, allTypes,updateT,editButton,  typeValidationFailed, success } = this.state;
    console.log(this.state)
    return (
      <div>
        <Grid className={classes.root} container spacing={3}>
          <Grid item xs={6}>
            <h1>Neue Projektart eingetragen</h1>
            <Paper className={classes.paper}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  className={classes.formControl}
                  autoFocus
                  type="text"
                  required
                  fullWidth
                  margin="normal"
                  id="projektart"
                  label="Projektart"
                  // value={name}
                  name='name'
                  onChange={this.handleChange}
                  error={typeValidationFailed}
                  helperText={
                    typeValidationFailed
                      ? "Bitte geben Sie einen Projektart ein"
                      : success === true
                      ? "Projektart erfolgreich eingetragen!"
                      : ""
                  }
                />
                <TextField
                  className={classes.formControl}
                  autoFocus
                  type="number"
                  required
                  fullWidth
                  margin="normal"
                  id="ECTS"
                  label="ECTS"
                  // value={ects}
                  name='ects'
                  onChange={this.handleChange}
                  error={typeValidationFailed}
                  helperText={
                    typeValidationFailed
                      ? "Bitte geben Sie die Anzahl an ECTS ein:"
                      : success === true
                      ? "ECTS erfolgreich eingetragen!"
                      : ""
                  }
                />
                <TextField
                  className={classes.formControl}
                  autoFocus
                  type="number"
                  required
                  fullWidth
                  margin="normal"
                  id="SWS"
                  label="SWS"
                 // value={sws}
                  name='sws'
                  onChange={this.handleChange}
                  error={typeValidationFailed}
                  helperText={
                    typeValidationFailed
                      ? "Bitte geben Sie die Anzahl an SWS ein:"
                      : success === true
                      ? "SWS erfolgreich eingetragen!"
                      : ""
                  }
                />
                <Button
                  type="submit"
                  className={classes.buttonMargin}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  Eintragen
                </Button>
                <Grid>
                { editButton? 
                  <Button 
                    type = "submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.buttonMargin}
                    startIcon={<SaveIcon />}>                
                    überschreiben
                  </Button>
                :<div></div> }
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <h1>Bestehende Projektarten</h1>
            <Paper className={classes.paper}>
              <div>
                {allTypes.map((t) => (
                  <ListItem>
                    {t.name }

                    <IconButton
                    style ={{color: "gray"}}
                      aria-label="delete"
                      onClick={() => this.deleteProjectType(t)}
                    >
                      <DeleteIcon  />
                    </IconButton>
                    <Button style ={{color: "gray"}} onClick= {() => { this.setState({ updateT: t, editButton: true })}}> {/* neuer State wird gesetzt, PersonBO ist in p und wird in updateP als State gesetzt, update Putton wird auf True gesetzt und angezeigt*/  }
                   edit
                    </Button>
                  </ListItem>
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    height: 650,
    width: "100%",
  },
  buttonMargin: {
    marginLeft: theme.spacing(11),
    size: "small",
  },
  participationEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
});

export default withStyles(styles)(CreateProjectType);
