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
                //schauen ob die Person bereits in der Datenbank ist
                this.checkPersonInDatabase (person.displayName, person.email,person.id);
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
    
    checkIfPersonInDatabase(name, email, googleId) {
        var api = AppAPI.getAPI()
            api.getPersonByGoogleId(googleId).then((person) => {
                if (!person.getGoogleId()) {
                    var suggestion = new PersonBO(name, email, googleId)
                    api.createPerson(suggestion).then((newPerson) => {
                    this.setState({
                        person: newPerson})
                    }
                    )
                }
            

                else {
                    this.setState({
                        person: person
                    })
                }
            }
        )
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