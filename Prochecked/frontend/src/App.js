import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline, Paper } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import AppAPI from './AppApi/AppApi'
import SignIn from './Components/pages/SignIn';
import LoadingProgress from './Components/dialogs/LoadingProgress';
import ContextErrorMessage from './Components/dialogs/ContextErrorMessage';
import Theme from './Theme';
import PersonBO from './AppApi/PersonBO'
import StudentLogin from "./Components/pages/StudentView/StudentLogin";
import DozentenView from './Components/pages/DozentView';
import AdminView from './Components/pages/AdminView';
import about from './Components/pages/about';
import PersonLoggedIn from './Components/pages/PersonLoggedIn';
import ProjektFormular from './Components/pages/ProjektErstellen'
import ProjektFormularUpdate from './Components/pages/ProjektUpdaten'
import ProjectList from './Components/pages/ProjectList';
import ProjectListNew from './Components/pages/AdminView/ProjectListNew';
import CreatePerson from './Components/pages/AdminView/CreatePerson';
import CreateSemester from './Components/pages/AdminView/CreateSemester';
import DropDown_Dozent from './Components/pages/AdminView/DropDownDozent';
import ReleaseProject from './Components/pages/AdminView/ReleaseProject';
import SelectStudent from './Components/pages/AdminView/SelectStudent';
import Semesterbericht from './Components/pages/StudentView/Semesterbericht';
import StudentView from './Components/pages/StudentView/StudentView';
import GradeList from './Components/pages/DozentView/GradeList'
import ProjectListStudent from './Components/pages/StudentView/ProjectListStudent';
import { StudentBO } from './AppApi';
import CreateModule from './Components/pages/AdminView/CreateModule';
import CreateProjectType from "./Components/pages/AdminView/CreateProjectType";
import blueGrey from '@material-ui/core/colors/blueGrey'


// import firebaseconfig from './firebaseconfig';

class App extends React.Component {
  #firebaseConfig = {
    apiKey: "AIzaSyAXRfVbXnTLoSxa_YJxTTaRckt803yV4I4",
    authDomain: "prochecked-team09.firebaseapp.com",
    databaseURL: "https://prochecked-team09.firebaseio.com",
    projectId: "prochecked-team09",
    storageBucket: "prochecked-team09.appspot.com",
    messagingSenderId: "791050707787",
    appId: "1:791050707787:web:f923c14b57ae697fde3ece",
  };

  //Constrcutor welcher Firebase initialisiert
  constructor(props) {
    super(props);

    //Dann wird ein leeres state initalisiert
    this.state = {
      person: null,
      student: new StudentBO(),
      appError: null,
      authError: null,
      authLoading: false,
    };
  }

  static getDerivedStateFromError(error) {
    //Hier wird der Status aktualisiert,
    return { appError: error }; // dass beim nächsten Rendern die Fallback UI angezeigt wird
  }

  handleAuthStateChange = (person) => {
    // Firebase Benutzer logt sich ein, der state wechselt den Zustand
    if (person) {
      // console.log("handleauthstate")
      this.setState({
        authLoading: true,
      });

      //die Person ist eingeloggt
      person
        .getIdToken()
        .then((token) => {
          document.cookie = `token=${token};path=/`; //pfad evtl. erweitern?

          //setzt den Nutzer auf Not bevor der Token angekommen ist
          this.setState({
            person: person,
            authError: null,
            authLoading: false,
          });
          //Person aus Datenbank auslesen; wird durch SecurityDecorater reingeschrieben, falls noch nicht vorhanden

          this.getPersonByGoogleId(person.uid);
        })
        .catch((error) => {
          this.setState({
            authError: error,
            authLoading: false,
          });
        });
    } else {
      document.cookie = "token=;path=/"; //Person hat sich ausgeloggt, dann clear token
      //setze die ausgeloggte Person auf null
      this.setState({
        person: null,
        authLoading: false,
      });
    }
  };

  handleSignIn = () => {
    this.setState({
      authLoading: true,
    });
    const provider = new firebase.auth.GoogleAuthProvider(); //Erstelle Instanz des Google-Provider-Objekts
    firebase.auth().signInWithRedirect(provider); // Umleiten auf die signInWithRedirect ruft signInWithRedirect auf
  };

  getPersons() {
    var api = AppAPI.getAPI();
    api.getPersons().then((person) => {
      console.log(person);
      this.setState({
        person: person,
      });
    });
  }

  createPerson(name, email, google_id) {
    var api = AppAPI.getAPI();
    api.createPerson(name, email, google_id).then((person) => {
      this.setState({
        person: person,
      });
    });
  }

  getPersonByGoogleId = (google_id) => {
    var api = AppAPI.getAPI();
    api.getPersonByGoogleId(google_id).then((person) => {
      this.setState(
        {
            person: person,
        },
        () => this.getStudentByPersonId(this.state.person.getID())
      );
    });
  };

        
    

  getStudentByPersonId = (person_id) => {
    var api = AppAPI.getAPI();
    api.getStudentByPersonId(person_id).then((student) => {
      this.setState({
        student: student,
      });
    });
  };

  setRole = (aRole) => {
    const person = this.state.person;
    const { name, email, google_id, id, creation_date, last_updated } = person;
    var updatedPerson = new PersonBO(name, email, google_id, aRole);
    updatedPerson.setID(id);
    updatedPerson.setCreationDate(creation_date);
    updatedPerson.setLastUpdated(last_updated);
    var api = AppAPI.getAPI();
    api.updatePerson(updatedPerson).then((newPerson) => {
      //bei put (updatePerson) kommt was zurück? kommt überhaupt person zurück?
      console.log("geupdatete person", newPerson)
      this.setState({
        person: updatedPerson,
      });
    });
  };

  getBerechtigung = () => {
    const person = this.state.person;
    const { name, berechtigung } = person;
    return berechtigung;
  };

  
  ProfList() {
    var api = AppAPI.getAPI();
    api.getPersonByRole(2).then((persons) => {
    });
  }

  componentDidMount() {
    firebase.initializeApp(this.#firebaseConfig);
    firebase.auth().languageCode = 'en';
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);    
    };

    /** Renders the whole app */
render() {
    const { person, appError, authError, authLoading } = this.state;
    
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <Router basename={process.env.PUBLIC_URL}>
                <Container maxWidth = 'lg'>
                    <Paper style={{backgroundColor: blueGrey[900]}}>
                        
                        {/* <Header person = {person}/> */}
                        {
                            // Ist eine Person eingeloggt?
                        person ?
                                
                                
                                <PersonLoggedIn 
                                getPersonByGoogleId = {this.getPersonByGoogleId}
                                berechtigung = {this.state.person.berechtigung} 
                                person = {this.state.person} 
                                setRole = {this.setRole} 
                                student = {this.state.student}>

                                </PersonLoggedIn>
                                
                                :
                                // sonst zeige die SignIn Seite 
                                <>
                                    <Redirect to='/SignIn' />
                                    <SignIn onSignIn={this.handleSignIn} />
                                </>

                        }       
                
                        <Route exact path = '/StudentView' component = {StudentView}/>
                        <Route exact path = '/ProjectListStudent' component = {ProjectListStudent}/>
                        
                        <Route exact path = '/Semesterbericht' component = {Semesterbericht}/>
                        <Route exact path = '/StudentLogin' component = {StudentLogin}/>
                        <Route exact path = '/DozentView' component = {DozentenView}/>
                        <Route exact path = '/AdminView' component = {AdminView}/>
                        <Route exact path = '/CreateProject' component = {ProjektFormular}/>
                        <Route exact path = '/UpdateProject' component = {ProjektFormularUpdate}/>
                        <Route exact path = '/admin/CreatePerson' component = {CreatePerson}/>
                        <Route exact path = '/admin/CreateSemester' component = {CreateSemester}/>
                        <Route exact path = '/ProjectList' component = {ProjectList}/>
                        <Route exact path = '/ReleaseProject' component = {ReleaseProject}/>
                        <Route exact path = '/student/SelectStudent' component = {SelectStudent}/>
                        <Route exact path = '/admin/ProjectListNew' component = {ProjectListNew}/>
                        <Route exact path = '/dozent/DropDown_Dozent' component = {DropDown_Dozent}/>
                        <Route exact path = '/about' component = {about}/>
                        <Route exact path = '/admin/CreateModule' component = {CreateModule}/>
                        <Route exact path = '/admin/CreateProjectType' component = {CreateProjectType}/>
                        <Route exact path = '/GradeList' component = {GradeList}/>              
                        
                                         
                        <LoadingProgress show={authLoading} />
                        <ContextErrorMessage error={authError} contextErrorMsg={`Während der Anmeldung ist etwas falsch gelaufen.`} onReload={this.handleSignIn} />
                        <ContextErrorMessage error={appError} contextErrorMsg={`Innerhalb des Programms gab es einen Fehler. Bitte die Seite erneut laden.`} />
                    </Paper>
                </Container>
            </Router>
        </ThemeProvider>
    );
}
}


export default App;
