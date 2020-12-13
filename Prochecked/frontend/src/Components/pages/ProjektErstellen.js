import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button } from '@material-ui/core';
// import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "50%",
  },
  text: {
    margin: theme.spacing(0),
    width: "100%",
  }
}));

function ProjektFormular() {
  const classes = useStyles();
  const [ProjektArt, setProjektArt] = React.useState('');
  const [Professor, setProfesor] = React.useState('');
  const [Titel, setProjektTitel] = React.useState('');
  const [Kapazität,setKapazität] = React.useState('');
  const [Inhalt, setInhalt] = React.useState('');
  const [Raum, setRaum] = React.useState('');
  
  const [open, setOpen] = React.useState(false);

  const handleProjektArt = (event) => {
    setProjektArt(event.target.value);
  };

  const handleProfessor = (event) => {
    setProfesor(event.target.value);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      'ProjektArt:', ProjektArt, 
      'Titel:', Titel,
      'Kapazität:', Kapazität,
      'Inhalt:', Inhalt,
      'Raum:', Raum);
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
      <div>
        <h1>Geben Sie die Daten für das neue Projekt an:</h1>
        <FormControl className={classes.formControl}>
          <InputLabel id="artProjekt">Art des Projekts</InputLabel>
            <Select
              labelId="artProjekt"
              id="ProjektArt"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={ProjektArt}
              onChange={handleProjektArt}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
                <MenuItem value={5}>Fachspezifisches Projekt</MenuItem>
                <MenuItem value={10}>Interdisziplinäres Projekt</MenuItem>
                <MenuItem value={20}>Transdisziplinäres Projekt </MenuItem>
              </Select>
        </FormControl>
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
            label="Kapazität (Max. Teilnehmerzahl)" 
            variant="outlined" 
            value={Kapazität}
            onInput={e=>setKapazität(e.target.value)}
            />
            
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel id="artProjekt">weitere Betreuende(r) ProfessorInnen</InputLabel>
              <Select
                labelId="artProjekt"
                id="ProjektArt"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={Professor}
                onChange={handleProfessor}
              >
            <MenuItem value="">
                <em>-</em>
            </MenuItem>
            <MenuItem value={0}>Prof</MenuItem>
              </Select>
            </FormControl>
                <div><TextField className={classes.formControl}
                    id="Inhalt"
                    label="Inhalt(Kurzbeschreibung):"
                    multiline
                    rows={6} 
                    variant="outlined" 
                    value={Inhalt}
                    onInput={e=>setInhalt(e.target.value)}
                    />
                </div>
                <div><TextField className={classes.formControl}
                    id="Raum"
                    label="Raum-/Ressourcenplanung" 
                    variant="outlined" 
                    value={Raum}
                    onInput={e=>setRaum(e.target.value)}
                    />
               </div>
              <div>
                <FormControlLabel
                value=""
                control={<Checkbox color="primary" />}
                label="Wöchentliche Termine"
                labelPlacement="end"
                />
              </div>
              <div>
                <FormControlLabel
                value=""
                control={<Checkbox color="primary" />}
                label="Blocktage vor Beginn der Vorlesungszeit "
                labelPlacement="end"
                />
              </div>
              <div>
                <FormControlLabel
                value=""
                control={<Checkbox color="primary" />}
                label="Blocktage in der Prüfungszeit (nur inter-/trans. Projekte)"
                labelPlacement="end"
                />
            </div>
            <div>
                <FormControlLabel
                value=""
                control={<Checkbox color="primary" />}
                label="Blocktage (Samstage) in der Vorlesungszeit"
                labelPlacement="end"
                />
            </div>
            <div>
                <FormControlLabel
                value=""
                control={<Checkbox color="primary" />}
                label="Besonderer Raum notwendig"
                labelPlacement="end"
                />
            </div>
            <div>
                <Button
                 type="submit" 
                >
                  Speichern
                </Button>
            </div>
          </form>
      </React.Fragment>
  );
}

export default ProjektFormular;