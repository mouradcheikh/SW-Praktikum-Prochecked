import React from 'react';
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';

import PersonBO from './AppApi/PersonBO'
import RoleBO from './AppApi/RoleBO'
import AppAPI from './AppApi/AppApi'
import SignIn from './Components/pages/SignIn'; //importiere von Pages das SignIn
import UserView from './Components/pages/UserView';
import Header from './Components/layout/Header';
import LoadingProgress from './Components/dialogs/LoadingProgress';
import ContextErrorMessage from './Components/dialogs/ContextErrorMessage';
import Theme from './Theme';
// import PersonList from './Components/PersonList';
import StudentLogin from './Components/pages/StudentView/StudentLogin';
// import StudentView from './Components/pages/StudentView';
import DozentenView from './Components/pages/DozentView';
import AdminView from './Components/pages/AdminView';
import PersonLoggedIn from './Components/pages/PersonLoggedIn';
import ProjektFormular from './Components/pages/ProjektErstellen'
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


// import firebaseconfig from './firebaseconfig';

class App extends React.Component {

    #firebaseConfig = {
    
        apiKey: "AIzaSyAXRfVbXnTLoSxa_YJxTTaRckt803yV4I4",
        authDomain: "prochecked-team09.firebaseapp.com",
        databaseURL: "https://prochecked-team09.firebaseio.com",
        projectId: "prochecked-team09",
        storageBucket: "prochecked-team09.appspot.com",
        messagingSenderId: "791050707787",
        appId: "1:791050707787:web:f923c14b57ae697fde3ece"
    };

    //Constrcutor welcher Firebase initialisiert 
    constructor (props) {
        super(props)
    

    //Dann wird ein leeres state initalisiert 
	    this.state = {
            person: null,
            student: new StudentBO(),
            appError: null,
            authError: null,
            authLoading: false
        };
    }

    static getDerivedStateFromError(error) { //Hier wird der Status aktualisiert, 
		return { appError: error };          // dass beim nächsten Rendern die Fallback UI angezeigt wird 
    }
    
    handleAuthStateChange = person => { // Firebase Benutzer logt sich ein, der state wechselt den Zustand 
		if (person) {
            // console.log("handleauthstate")
			this.setState({
				authLoading: true
            });
            
            //die Person ist eingeloggt
            person.getIdToken().then(token => {
                document.cookie = `token=${token};path=/`; //pfad evtl. erweitern?
            
            //setzt den Nutzer auf Not bevor der Token angekommen ist 
                this.setState({
					person: person,
					authError: null,
					authLoading: false
                });
                //Person aus Datenbank auslesen; wird durch SecurityDecorater reingeschrieben, falls noch nicht vorhanden
                
                this.getPersonByGoogleId(person.uid)
                
              
            }).catch(error =>{
                this.setState({
                    authError:error,
                    authLoading: false 
                });
            });
        
        } else {
            document.cookie = 'token=;path=/'; //Person hat sich ausgeloggt, dann clear token
            //setze die ausgeloggte Person auf null
            this.setState ({
                person: null,
                authLoading: false 
            });
        }
    }

    handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider(); //Erstelle Instanz des Google-Provider-Objekts
		firebase.auth().signInWithRedirect(provider); // Umleiten auf die signInWithRedirect ruft signInWithRedirect auf 
    }

    getPersons(){
        var api = AppAPI.getAPI()
        console.log(api)
        api.getPersons().then((person) =>
            {console.log(person)
            this.setState({
                person: person
            })}
            )
    }

    createPerson(name, email, google_id){
        var api = AppAPI.getAPI()
        // console.log(api)
        api.createPerson(name, email, google_id).then((person) =>
            {console.log(person)
            console.log("test")
            this.setState({
                person: person
            })}
            )
        }

    getPersonByGoogleId = (google_id) => {
        var api = AppAPI.getAPI()
        // console.log(api)
        api.getPersonByGoogleId(google_id).then((person) =>
            {
            this.setState({
                person: person
            }, () => this.getStudentByPersonId(this.state.person.getID()))
            })
    }

    getStudentByPersonId = (person_id) => {
        var api = AppAPI.getAPI()
        api.getStudentByPersonId(person_id).then((student) => {
        this.setState({
            student: student
        })
        // console.log(this.state.student)
    })
    }

    setRole = (aRole) => {
        const person = this.state.person
        const {name, email, google_id, id, creation_date, last_updated} = person
        var updatedPerson = new PersonBO(name, email, google_id, aRole)
        updatedPerson.setID(id)
        updatedPerson.setCreationDate(creation_date)
        updatedPerson.setLastUpdated(last_updated)
        var api = AppAPI.getAPI()
        api.updatePerson(updatedPerson).then((newPerson) => { //bei put (updatePerson) kommt was zurück? kommt überhaupt person zurück?
                        this.setState({
                            person: newPerson
                        })
                    })
                }

    getBerechtigung = () => {
        const person = this.state.person
        const {name, berechtigung} = person
        return (berechtigung)
    }
    
    // checkIfPersonInDatabase(name, email, googleId) {
    //     console.log("checkifuserindatabase")
    //     var api = AppAPI.getAPI()
    //     console.log(api)

    //     var suggestion = new PersonBO(name, email, googleId)
    //                 console.log(suggestion)
                    
    //         api.getPersonByGoogleId(googleId).then((person) => {
    //             console.log(person)
    //             if (!person.getGoogleId()) {
    //                 var suggestion = new PersonBO(name, email, googleId)
    //                 console.log(suggestion)
    //                 api.createPerson(suggestion).then((newPerson) => {
    //                 this.setState({
    //                     person: newPerson})
    //                 }
    //                 )
    //             }
            

    //             else {
    //                 this.setState({
    //                     person: person
    //                 })
    //             }
    //         }
    //     )
    // }

    

    // createPersonInDatabase(name, email, googleId) {
    //     console.log("createPersonInDatabase")
    //     var api = AppAPI.getAPI()
    //     console.log(api)

    //     var suggestion = new PersonBO(name, email, googleId)
    //             console.log(suggestion)
    //             var suggestion = new PersonBO(name, email, googleId)
    //             console.log(suggestion)
    //             api.createPerson(suggestion).then((newPerson) => {
    //             this.setState({
    //                 person: newPerson})
    //                 }  
    //             )
    // }

    // setRoleOfPerson(person, role){
    //     var api = AppAPI.getAPI()
    //         updatedPerson = person.setBerechtigung(role)
    //         api.update(updatedPerson).then((newPerson) => {
    //             this.setState({
    //                 person: newPerson
    //             })
    //         })
    // }
    

            
    ProfList(){
        var api = AppAPI.getAPI()
        api.getPersonByRole(2).then((persons) =>
        {
            // console.log(persons)
        })
      }
        
    componentDidMount() {
        firebase.initializeApp(this.#firebaseConfig);
        firebase.auth().languageCode = 'en';
        firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
        // console.log("rendered")
        
        };
    
    	/** Renders the whole app */
	render() {
        const { person, appError, authError, authLoading } = this.state;
        
		return (
			<ThemeProvider theme={Theme}>
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						<Header/>
                        <Route exact path = '/StudentView' component = {StudentView}/>
                        <Route exact path = '/ProjectListStudent' component = {ProjectListStudent}/>
                        
                        <Route exact path = '/Semesterbericht' component = {Semesterbericht}/>
                        <Route exact path = '/StudentLogin' component = {StudentLogin}/>
                        <Route exact path = '/DozentView' component = {DozentenView}/>
                        <Route exact path = '/AdminView' component = {AdminView}/>
                        <Route exact path = '/CreateProject' component = {ProjektFormular}/>
                        <Route exact path = '/CreatePerson' component = {CreatePerson}/>
                        <Route exact path = '/CreateSemester' component = {CreateSemester}/>
                        <Route exact path = '/ProjectList' component = {ProjectList}/>
                        <Route exact path = '/ReleaseProject' component = {ReleaseProject}/>
                        <Route exact path = '/SelectStudent' component = {SelectStudent}/>
                        <Route exact path = '/ProjectListNew' component = {ProjectListNew}/>
                        <Route exact path = '/DropDown_Dozent' component = {DropDown_Dozent}/>
                        <Route exact path = '/GradeList' component = {GradeList}/>
						{
							// Ist eine Person eingeloggt?
                           person ?
                                <PersonLoggedIn berechtigung = {this.state.person.berechtigung} person = {this.state.person} setRole = {this.setRole} student = {this.state.student}></PersonLoggedIn>

                                
								:
								// sonst zeige die SignIn Seite 
								<>
									<Redirect to='/SignIn' />
									<SignIn onSignIn={this.handleSignIn} />
								</>
						}
						<LoadingProgress show={authLoading} />
						<ContextErrorMessage error={authError} contextErrorMsg={`Während der Anmeldung ist etwas falsch gelaufen.`} onReload={this.handleSignIn} />
						<ContextErrorMessage error={appError} contextErrorMsg={`Innerhalb des Programms gab es einen Fehler. Bitte die Seite erneut laden.`} />
					</Container>
				</Router>
			</ThemeProvider>
        );
    }
}


export default App;