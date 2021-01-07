import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

class CreatePerson extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const { classes  } = this.props;

        return (
        <div>
            <div>
                <h1>Eine neue Person erstellen</h1>
            </div>
            
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Name" variant="outlined" />
                    <TextField id="outlined-basic" label="Google-ID" variant="outlined" />
                    <TextField id="outlined-basic" label="E-Mail" variant="outlined" />
                    <TextField id="outlined-basic" label="Rolle" variant="outlined" />
                </form>
            </div>
           

            <div>
            <Button
                variant="contained"
                color="default"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}>                         
                    Person anlegen
            </Button>
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
