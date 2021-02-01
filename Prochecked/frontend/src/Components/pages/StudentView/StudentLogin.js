import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Input from '@material-ui/core/Input';
import { AppApi } from '../../../AppApi';
import StudentBO from '../../../AppApi/StudentBO';
import PersonBO from '../../../AppApi/PersonBO';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
    text: {
        margin: theme.spacing(0),
        width: "100%",
    }

}));


function StudentLogin(props) {
    const classes = useStyles();
    const [Matrikelnummer, setMatrNr] = React.useState(null);
    const [Studiengang, setStudiengang] = React.useState('');
    const person = props.location.state.person;
    const [student, setStudent] = React.useState(null);
    const history = useHistory()

    console.log("StudentLogin",props)



    const handleSubmit = (event) => {
        event.preventDefault();
        const student = new StudentBO()
        student.setMatrNr(Matrikelnummer)
        student.setStudiengang(Studiengang)
        student.setPerson(person.getID())

        console.log(student)

        var api = AppApi.getAPI()
        // console.log(api)
        api.createStudent(student).then((student) => {
            setStudent(student)
            console.log(student)
            
        }
        )
        history.push({
            pathname: '/StudentView',
            state: {
                student: student,
                person: props.location.state.person
            },
        });  



    }

    return (
        <React.Fragment>
            <center>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Bitte geben Sie Ihre Matrikelnummer und Ihren Studiengang ein:</h1>
                    </div>
                    <div><TextField required className={classes.formControl}
                        id="matrikelnummer"
                        label="Matrikelnummer"
                        variant="outlined"
                        value={Matrikelnummer}
                        onInput={e => setMatrNr(e.target.value)}
                    />

                    </div>
                    <div><TextField required className={classes.formControl}
                        id="studiengang"
                        label="Studiengangskürzel"
                        variant="outlined"
                        value={Studiengang}
                        onInput={e => setStudiengang(e.target.value)}
                    />

                        
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}

                        >
                            Speichern
                        </Button>
                        
                    </div>
                </form>
            </center>
        </React.Fragment>
    );
}
export default StudentLogin;
