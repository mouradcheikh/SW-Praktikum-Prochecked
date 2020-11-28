import React from 'react';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';

import firebase from 'firebase/app';
import 'firebase/auth';

import Header from './components/layout/Header' //importiere von Layout den Header 
import SignIn from './components/pages/SignIn' //importiere von Pages das SignIn
import UserView from './components/pages/UserView'
import About from './components/pages/About';
import firebaseConfig from './components/pages/firebaseconfig';

class App extends React.Component {
    //Constrcutor welcher Firebaze initialisiert 
    constructor (props) {
        super(props)
    

    //Dann wird ein leeres state initalisiert 
	    this.state = {
            googleUser: null,
            appError: null,
            authError: null,
            authLoading: false
        };
    }

    static getDerivedStateFromError(error) { //Hier wird der Status aktualisiert, 
		return { appError: error };          // dass beim nächsten Rendern die Fallback UI angezeigt wird 
    }
    
    handleAuthStateChange = user => { // Firebase Benutzer logt sich ein, der state wechselt den Zustand 
		if (user) {
			this.setState({
				authLoading: true
            });
            
            //der User ist eingeloggt
            user.getIdToken().then(token => {
                document.cookie = `token=${token};path=/`;
            
            //setzt den Nutzer auf Not bevor der Token angekommen ist 
                this.setState({
					googleUser: user,
					authError: null,
					authLoading: false
                });
                //schauen ob der User bereits in der Datenbank ist
                this.checkUserInDatabase (user.displayName, user.email,user.id);
            }).catch(error =>{
                this.setState({
                    authError:error,
                    authLoading: false 
                });
            });
        
        } else {
            document.cookie = 'token=;path=/'; //User hat sich ausgeloggt, clear token
            //setze den ausgeloggten User auf null
            this.setState ({
                googleUser: null,
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
    
    checkIfUserInDatabase(name, email, googleId) {
        var api = AppAPI.getAPI()
        api.getUserByGoogleId(googleId).then((user) => {
          if (!user.getGoogleId()) {
            var suggestion = new UserBO(name, email, googleId)
            api.createUser(suggestion).then((newUser) => {
              this.setState({
                user: newUser
              })
            })
          }

          else {
              this.setState({
                  user: user
              })
          };
        
    
    componentDidMount(); {
        firebase.initializeApp(firebaseConfig);
        firebase.auth().languageCode = 'en';
        firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
        };
    

    	/** Renders the whole app */
	render(); {
		const { user, appError, authError, authLoading } = this.state;

		return (
			<ThemeProvider theme={Theme}>
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						<Header user={user} />
						{
							// Ist ein User eingeloggt?
							user ?
								<>
									<Redirect from='/' to='user' />
									<Route exact path='/user'>
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