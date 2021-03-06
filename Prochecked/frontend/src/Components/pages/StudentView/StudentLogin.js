import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';
import { AppApi } from '../../../AppApi';
import StudentBO from '../../../AppApi/StudentBO';
import { useHistory } from 'react-router-dom';

/**
 * Zeigt die Seite wenn man sich als Student das erste mal anmeldet,
 * Der Student kann hier seine Matrikelnummer sowie Studiengang eingeben. 
 */

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const student = new StudentBO()
        student.setMatrNr(Matrikelnummer)
        student.setStudiengang(Studiengang)
        student.setPerson(person.getID())

        var api = AppApi.getAPI()
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
