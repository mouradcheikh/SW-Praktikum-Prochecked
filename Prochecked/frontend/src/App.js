import React from 'react';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';

import PersonBO from './AppApi/PersonBO'
import AppAPI from './AppApi/AppApi'
import SignIn from './Components/pages/SignIn'; //importiere von Pages das SignIn
import UserView from './Components/pages/UserView';
import LoadingProgress from './Components/dialogs/LoadingProgress';
import ContextErrorMessage from './Components/dialogs/ContextErrorMessage';
import Theme from './Theme';

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
            console.log("handleauthstate")
			this.setState({
				authLoading: true
            });
            
            //die Person ist eingeloggt
            person.getIdToken().then(token => {
                document.cookie = `token=${token};path=/`;
            
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

    getPersonByGoogleId(googleId){
        var api = AppAPI.getAPI()
        console.log(api)
        api.getPersonByGoogleId(googleId).then((person) =>
            {console.log(person)
            this.setState({
                person: person
            })}
            )
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

    
        
    
    componentDidMount() {
        firebase.initializeApp(this.#firebaseConfig);
        firebase.auth().languageCode = 'en';
        firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
        console.log("App gerendert")
        };
    

    	/** Renders the whole app */
	render() {
		const { person, appError, authError, authLoading } = this.state;

		return (
			<ThemeProvider theme={Theme}>
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						{/* <Header person={person} /> */}
						{
							// Ist eine Person eingeloggt?
							person ?
								<>
									<Redirect from='/' to='userView' />
									<Route exact path='/userView'>
										<UserView />
									</Route>
								</>
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


// person ={this.state.person} setRoleOfPerson = {this.setRoleOfPerson} kommt in Zeile 150
