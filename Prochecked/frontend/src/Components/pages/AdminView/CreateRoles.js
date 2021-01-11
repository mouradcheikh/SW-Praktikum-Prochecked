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
import { ProjectBO } from "../../../AppApi";

class CreateRoles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      role: null, //für CreateRole
      allRoles: [], // für Rollenliste
      roleValidationFailed: false, //prüft eingabe des semsters im Textfeld
      success: false, //r:nach eingabe der Rolle wird state auf true gesetzt --> status erfolgreich wird angezeigt
    };
  }

  /** Create role */
  createRole(role) {
    var api = AppApi.getAPI();
    // console.log(api)
    api.setBerechtigungen(role).then((role) => {
      // console.log(role)
      this.setState(
        {
          role: role,
        },
        this.RoleList()
      );
    });
  }

  /** Delete Role */
  deleteRole = (r) => {
    console.log(r.getID());
    var api = AppApi.getAPI();
    api
      .deleteRole(r.getID())
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
    });
  };

  RoleList() {
    var api = AppApi.getAPI();
    api.getBerechtigungen().then((allRoles) => {
      this.setState({
        allRoles: allRoles,
      });
    });
  }

  textFieldValueChange = (event) => {
    const value = event.target.value;

    this.setState({
      [event.target.id]: value,
    });

    if (value.length > 3) {
      //eingabe des textfields muss mindestens 5 zeichen enthalten

      this.setState({
        roleValidationFailed: false,
      });

      this.state.allRoles.map((r) => {
        if (r.name === value) {
          //r:prüft ob role bereits eingegeben wurde, wenn ja kann dieses nicht eingegeben werden
          this.setState({
            roleValidationFailed: true,
          });
        }
      });
    } else {
      this.setState({
        roleValidationFailed: true,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
    if (this.state.roleValidationFailed === false) {
      //r: wird bei click nur ausgeführt wenn validation auf false gesetzt wurde
      this.createRole(this.state.role);
      this.setState({
        success: true,
      });
    }
  };

  componentDidMount() {
    this.RoleList();
  }

  render() {
    const { classes } = this.props;
    const { role, allRoles, roleValidationFailed, success } = this.state;
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h1>Neues Role eingetragen: </h1>
            <Paper className={classes.paper}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  className={classes.formControl}
                  autoFocus
                  type="text"
                  required
                  fullWidth
                  margin="normal"
                  id="rolle"
                  label="rolle:"
                  //value={role}
                  onChange={this.textFieldValueChange}
                  error={roleValidationFailed}
                  // onInput={e=>this.setState({role: (e.target.value)})}
                  helperText={
                    roleValidationFailed
                      ? "Bitte geben Sie eine Rolle ein (z.B. Admin, Dozent, Zuschauer...)"
                      : success === true
                      ? "Rolle erfolgreich eingetragen!"
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
              </form>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <h1>Bestehende Rollen</h1>
            <Paper className={classes.paper}>
              <div>
                {allRoles.map((r) => (
                  <ListItem>
                    {r.name}

                    <IconButton
                      aria-label="delete"
                      onClick={() => this.deleteRole(r)}
                    >
                      <DeleteIcon />
                    </IconButton>
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

export default withStyles(styles)(CreateRoles);
