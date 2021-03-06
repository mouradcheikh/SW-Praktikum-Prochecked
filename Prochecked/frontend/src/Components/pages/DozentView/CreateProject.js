import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { AppApi } from '../../../AppApi';
import ProjectBO from '../../../AppApi/ProjectBO';
import {useHistory} from 'react-router-dom';

/**
 * Es wird ein Formular für die Anlage eines Projects bereitgestellt.
 * Der Nutzer kann die verschiedenen Eigenschaften des Projekts eingeben 
 * und teilweise durch Dropdown Menus Daten direkt aus der Datenbank auswählen.
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

function ProjektFormular(props) {
  
  console.log(props)

  const classes = useStyles();
  const [ProjektArt, setProjektArt] = React.useState();
  const [ProjectTypes, setProjectTypes] = React.useState([]);
  const [Professor, setProfessor] = React.useState(null);
  const [Titel, setProjektTitel] = React.useState('');
  const [Kapazität,setKapazität] = React.useState('');
  const [Inhalt, setInhalt] = React.useState('');
  const [Raum, setRaum] = React.useState('');
  const [WT, setWT] = React.useState('Ja');
  const [BTvorVZ, setBTvorVZ] = React.useState('0');
  const [BTinPZ, setBTinPZ] = React.useState('0');
  const [BTinVZ, setBTinVZ] = React.useState('0');
  const [BesondererRaum, setBesondererRaum] = React.useState('');
  const [Professors, setProfessors] = React.useState(['']);
  const [extKoop, setextKoop] = React.useState('');
  const [Semester, setSemester] = React.useState('');
  const [Semesters, setSemesters] = React.useState([]);
  const [BT, setBT] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [person, setPerson] = React.useState('');


  const history = useHistory()

  const handleProjektArt = (event) => {
    setProjektArt(event.target.value);
  };

  const handleProfessor = (event) => {
    setProfessor(event.target.value);
  }

  const handleSemester = (event) => {
    setSemester(event.target.value);
  }

  const handleWT = (event) => {
    setWT(event.target.value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const project = new ProjectBO(Titel)
    project.setProjectType(ProjektArt.getID())
    project.setCapacity(Kapazität)
    project.setShortDescription(Inhalt)
    let dozent = person
    project.setDozent(dozent.id)
    project.setRoom(Raum)
    project.setWeeklyFlag(WT)
    project.setNumberBdBLecturetime(BTvorVZ)
    project.setNumberBdLecturetime(BTinVZ)
    project.setNumberBdExamtime(BTinPZ)
    project.setSpecialRoom(BesondererRaum)
    project.setProjectState(1)
    project.setExtPartnerList(extKoop)
    project.setSemester(Semester.id)
    project.setprefferedbd(BT)

    if (Professor != null){
      project.setDozent2(Professor.id)
    }

    console.log(project)

    var api = AppApi.getAPI()
       api.createProject(project).then((project) =>
            {console.log(project)
            }
            )


    history.push({
      pathname: '/DozentView',
      state: {  
        person: person, 
      },
    }); 
  }
  

function ProfList(){
  var api = AppApi.getAPI()
  api.getPersonByRole(2).then((persons) =>
  {console.log(persons)
  setProfessors(persons)})
}

function SemesterList(){
  var api = AppApi.getAPI()
  api.getSemesters().then((semesters) =>
  {
  setSemesters(semesters)})
}

function ProjectTypeList(){
  var api = AppApi.getAPI()
  api.getAllProjectTypes().then((projecttypes) =>{
    setProjectTypes(projecttypes)
  })
}


useEffect(() => {
  SemesterList();
  ProjectTypeList()
  setPerson(props.location.state.linkState)
}, []);



  return (
    <React.Fragment>
      <center>
      <form onSubmit={handleSubmit}>
      <div>
        <h1>Geben Sie die Daten für das neue Projekt an:</h1>
        <FormControl className={classes.formControl}>
          <InputLabel id="artProjekt">Art des Projekts</InputLabel>
            <Select
              labelId="artProjekt"
              id="ProjektArt"
              value={ProjektArt}
              onChange={handleProjektArt}
              onOpen={ProjectTypeList}
            >
              {
              ProjectTypes.map((projecttype) => <MenuItem value = {projecttype}> {projecttype.getName()} </MenuItem>)
              }
              </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel id="semester">Semester</InputLabel>
              <Select
                labelId="semester"
                id="semester"
                value={Semester}
                onChange={handleSemester} 
                onOpen={SemesterList}
                required
              >
              {
              Semesters.map((semester) => <MenuItem value = {semester}> {semester.getName()} </MenuItem>)
              }
              </Select>
              </FormControl>
      </div>
          <div><TextField className={classes.formControl}
            id="titelProjekt" 
            label="Titel des Projekts" 
            variant="standard"
            value={Titel}
            onInput={e=>setProjektTitel(e.target.value)}
            />
            
          </div>
          <div><TextField className={classes.formControl}
            id="maxTeilnehmer"
            label="Kapazität (max. Teilnehmerzahl)"
            type="number" 
            variant="standard" 
            value={Kapazität}
            onInput={e=>setKapazität(e.target.value)}
            />
            
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel id="artProjekt">weitere betreuende Professoren</InputLabel>
              <Select
                labelId="artProjekt"
                id="ProjektArt"
                value={Professor}
                onChange={handleProfessor} 
                onOpen={ProfList}
              >
              {
              Professors.map((Professor) => <MenuItem value = {Professor}> {Professor.name} </MenuItem>)
              }
              </Select>
              </FormControl>
              <div><TextField className={classes.formControl}
                      id="ext. Koop."
                      label="externe Kooperationspartner"
                      variant="standard"
                      
                      value={extKoop}
                      onInput={e=>setextKoop(e.target.value)}
                      />
                </div>
                <div><TextField className={classes.formControl}
                    id="Inhalt"
                    label="Inhalt (Kurzbeschreibung):"
                    multiline
                    rows={6} 
                    variant="standard" 
                    value={Inhalt}
                    onInput={e=>setInhalt(e.target.value)}
                    />
                </div>
              <div>
              <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">wöchentliche Termine</FormLabel>
                  <RadioGroup aria-label="WT" name="WT" value={WT} onChange={handleWT}>
                    <FormControlLabel value="true" control={<Radio />} label="Ja" />
                    <FormControlLabel value="false" control={<Radio />} label="Nein" />
                  </RadioGroup>
              </FormControl>
              </div>
              <div><TextField className={classes.formControl}
                    id="BT vor der VZ"
                    label="Blocktage vor Beginn der Vorlesungszeit "
                    variant="standard" 
                    type="number"
                    value={BTvorVZ}
                    onInput={e=>setBTvorVZ(e.target.value)}
                    />
               </div>
              <div><TextField className={classes.formControl}
                    id="BT in der PZ"
                    label="Blocktage in der Prüfungszeit (nur inter-/tans. Projekte)"
                    variant="standard"
                    type="number" 
                    value={BTinPZ}
                    onInput={e=>setBTinPZ(e.target.value)}
                    />
              </div>    
              <div>
                    <TextField className={classes.formControl}
                    id="BTSamstag"
                    label="Blocktage (Samstag) in der Vorlesungszeit"
                    variant="standard"
                    type="number" 
                    value={BTinVZ}
                    onInput={e=>setBTinVZ(e.target.value)}
                    />
               </div>
               <div>
                 <TextField className={classes.formControl}
                    id="Blocktage"
                    label="präferierte Blocktage"
                    type="date" 
                    variant="standard" 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onInput={e=>setBT(e.target.value)}
                  />
               </div>
               <div><TextField className={classes.formControl}
                    id="BesondererRaum"
                    label="besonderer Raum (falls notwendig)"
                    variant="standard" 
                    value={BesondererRaum}
                    onInput={e=>setBesondererRaum(e.target.value)}
                    />
               </div>
            <div>
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

export default ProjektFormular;
