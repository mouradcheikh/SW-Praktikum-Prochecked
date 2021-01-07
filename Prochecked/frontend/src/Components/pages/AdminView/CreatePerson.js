import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import  {AppApi, PersonBO}  from '../../../AppApi';

class CreatePerson extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            name: '',
            googleid: '',
            email:'',
            role: '',
            person: null,
            
    };
    this.handleChange = this.handleChange.bind(this);
    }

     /** Create Person */
     createPerson(name, googleid, email, role){
        var api = AppApi.getAPI()
        // console.log(api)
        api.createPerson(name, googleid, email, role).then((person) =>
            {
              // console.log(semester)
            this.setState({
                person: person
            },
            )}
            )
          }
    
    handleChange(e) { 
    this.setState({ [e.target.name]: e.target.value });
    // console.log({ [e.target.name]: e.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
        
        this.createPerson(
            this.state.name, 
            this.state.email, 
            this.state.googleid, 
            this.state.role,
          )
        }
      
   
    render() {
        const { classes  } = this.props;
        const { person } = this.state; 
        console.log(this.state)

        return (
        
        <div>
            <div>
                <h1>Eine neue Person erstellen</h1>
            </div>
            
            <div>
                <form className={classes.root} noValidate autoComplete="off" onSubmit= {this.handleSubmit}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" name='name' onChange={this.handleChange} />
                    <TextField id="outlined-basic" label="Google-ID" variant="outlined" name='googleid' onChange={this.handleChange} />
                    <TextField id="outlined-basic" label="E-Mail" variant="outlined" name='email'onChange={this.handleChange}/>
                    {/* <TextField id="outlined-basic" label="Rolle" variant="outlined" ref={this.textInput} /> */}

                    {/* {person.berechtigung===1?
                    <div>
                    <TextField id="outlined-basic" label="Google-ID" variant="outlined" name='xxx'  />
                    <TextField id="outlined-basic" label="E-Mail" variant="outlined" name='xxx'/>
                    </div>:
                    <div></div>
                          } */}

                    <FormControl className={classes.formControl}>
                    <InputLabel id="artProjekt">Rolle der Person</InputLabel>
                        <Select
                            labelId="Rolle"
                            id="Rolle"
                            name= 'role'
                            onChange={this.handleChange}
                                                                >
                    <MenuItem value={1}>Student</MenuItem>
                    <MenuItem value={2}>Dozent</MenuItem>
                    <MenuItem value={3}>Admin</MenuItem>

                         </Select>
                     </FormControl>
                
             <Button
                type = "submit"
                variant="contained"
                color="default"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}>                
                    Person anlegen
            </Button>
            </form>
            </div>
        </div>
        
        )
    }
}

const styles = theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      button: {
        margin: theme.spacing(1),
      },
    }, 
  });

export default withStyles(styles)(CreatePerson);
