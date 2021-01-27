import React from 'react';
import  {AppApi}  from '../../../AppApi';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Input from '@material-ui/core/Input';
import {Link, useHistory, Prompt} from 'react-router-dom';


class DropDownDozent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profs: [],
            prof: null,
        }
    }

    getProfList(){
    var api = AppApi.getAPI()
    api.getPersonByRole(2).then((profs) =>
    {console.log(profs)
        this.setState({
            profs:profs
          })
      })
    }

    handleProfessor = (event) => {
        console.log(event.target.value)
        this.setState({ 
            prof: event.target.value
          })
      }


    render() { 
        const { classes  } = this.props;
        const { profs, prof } = this.state; 
        return ( 
    <div className = {classes.root}>
        <div>
            <h1> Wählen Sie den Dozenten </h1>
        </div>
        <form>
        <Prompt when={prof === null}//dozent muss angegeben werden damit weitergeleitet werden kann
        /> 
        <div>
        
        <FormControl className={classes.formControl}>
        
        <InputLabel id="artProjekt">Professor</InputLabel>
          <Select
            labelId="artProjekt"
            id="ProjektArt"
            value={prof}
            onChange= {this.handleProfessor}
            onOpen={this.getProfList.bind(this)} //react benötigt "bind" das es in der Componente ankommt 
          >
          {profs.map((prof) => <MenuItem value = {prof}> {prof.name} </MenuItem>)}
          </Select>
          </FormControl>
          </div>
          <div>
              <Link to={{
              pathname: "/DozentView",
              state: { person: prof }
              }}>
                <Button
                 type="submit"
                 variant="contained"
                 color="primary" 
                >
                  Auswählen
                </Button>
              </Link>
              
            </div>
            </form>
    </div>
         );
}}

const styles = theme => ({
    root: {
      width: '100%',
      height: 650
    }, 
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
      },

});
 
export default withStyles(styles)(DropDownDozent); 

