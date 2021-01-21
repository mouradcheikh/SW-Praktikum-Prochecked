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
import { AppApi } from '../../AppApi';
import ProjectBO from '../../AppApi/ProjectBO';
import {Link, useHistory} from 'react-router-dom';


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

  const history = useHistory()

  const handleProjektArt = (event) => {
    setProjektArt(event.target.value);
  };

  const handleProfessor = (event) => {
    setProfessor(event.target.value);
    // console.log(Professor)
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
    let dozent = props.location.state.linkState
    project.setDozent(dozent.id)
    project.setRoom(Raum)
    project.setWeeklyFlag(WT)
    project.setNumberBdBLecturetime(BTvorVZ)
    project.setNumberBdLecturetime(BTinVZ)
    project.setNumberBdExamtime(BTinPZ)
    project.setSpecialRoom(BesondererRaum)
    // project.setDozent(Professor)
    project.setProjectState(1)
    project.setExtPartnerList(extKoop)
    project.setSemester(Semester.id)
    project.setprefferedbd(BT)

    if (Professor != null){
      project.setDozent2(Professor.id)
    }

    console.log(project)

    var api = AppApi.getAPI()
        // console.log(api)
        api.createProject(project).then((project) =>
            {console.log(project)
            }
            )

    history.push({
      pathname: '/DozentView',
      state: {  
        person: props.location.state.linkState, 
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
    // console.log(projecttypes)
    setProjectTypes(projecttypes)
  })
}


useEffect(() => {
  SemesterList();
  ProjectTypeList()
}, []);


// useEffect(() => {
//   console.log("useEffect")
//   function ProfList(){
//     var api = AppApi.getAPI()
//     api.getPersonByRole(2).then((persons) =>
//     {console.log(persons)
//     setProfessors(persons)})
//   }
//   ProfList()
//   // var Profs = props.location.state.linkState
//   // setProfessors(Profs)
//   console.log(Professors)
//   }, []
//   )




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
              >
              {
              Semesters.map((semester) => <MenuItem value = {semester}> {semester.getName()} </MenuItem>)
              }
              </Select>
              </FormControl>
        {/* <FormControl className={classes.formControl}>
            <InputLabel id="semester">Semester</InputLabel>
              <Select
                labelId="semester"
                id="semester"
                value={Semester}
                onChange={handleSemester} 
                onOpen={SemesterList}
              >
              {
              Semester.map((Semester) => <MenuItem value = {Semester.id}> {Semester.name} </MenuItem>)
              }
              </Select>
              </FormControl> */}
      </div>
          <div><TextField className={classes.formControl}
            id="titelProjekt" 
            label="Titel des Projekts" 
            variant="outlined"
            value={Titel}
            onInput={e=>setProjektTitel(e.target.value)}
            />
            
          </div>
          <div><TextField className={classes.formControl}
            id="maxTeilnehmer"
            label="Kapazität (max. Teilnehmerzahl)"
            type="number" 
            variant="outlined" 
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
                      variant="outlined"
                      value={extKoop}
                      onInput={e=>setextKoop(e.target.value)}
                      />
                </div>
                <div><TextField className={classes.formControl}
                    id="Inhalt"
                    label="Inhalt (Kurzbeschreibung):"
                    multiline
                    rows={6} 
                    variant="outlined" 
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
                    variant="outlined" 
                    type="number"
                    value={BTvorVZ}
                    onInput={e=>setBTvorVZ(e.target.value)}
                    />
               </div>
              <div><TextField className={classes.formControl}
                    id="BT in der PZ"
                    label="Blocktage in der Prüfungszeit (nur inter-/tans. Projekte)"
                    variant="outlined"
                    type="number" 
                    value={BTinPZ}
                    onInput={e=>setBTinPZ(e.target.value)}
                    />
              </div>    
              <div>
                    <TextField className={classes.formControl}
                    id="BTSamstag"
                    label="Blocktage (Samstag) in der Vorlesungszeit"
                    variant="outlined"
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
                    variant="outlined" 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onInput={e=>setBT(e.target.value)}
                  />
               </div>
               <div><TextField className={classes.formControl}
                    id="BesondererRaum"
                    label="besonderer Raum (falls notwendig)"
                    variant="outlined" 
                    value={BesondererRaum}
                    onInput={e=>setBesondererRaum(e.target.value)}
                    />
               </div>
            <div>
              {/* <Link to={{
              pathname: "/DozentView",
              state: { person : props.location.state.linkState }
              }}> */}
                <Button
                 type="submit"
                 variant="contained"
                 color="primary" 
                 startIcon={<SaveIcon />}
                >
                  Speichern
                </Button>
              {/* </Link> */}
            </div>
          </form>
          </center>
      </React.Fragment>
  );
}

export default ProjektFormular;
