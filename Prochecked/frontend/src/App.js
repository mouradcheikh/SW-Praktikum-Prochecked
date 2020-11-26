import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import firebaseConfig from './firebaseconfig';
import 'firebase/auth';


class App extends React.Component {

  constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			currentUser: null,
			appError: null,
			authError: null,
			authLoading: false
		};
	}

	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}



  render() {
		const { currentUser, appError, authError, authLoading } = this.state;

		return (
			<ThemeProvider theme={Theme}>
				{/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						<Header user={currentUser} />
						{
							// Is a user signed in?
							currentUser ?
								<>
									<Redirect from='/' to='customers' />
									<Route exact path='/customers'>
										<CustomerList />
									</Route>
									<Route path='/transactions'>
										<TransactionList />
									</Route>
									<Route path='/accounts'>
										<AllAccountList />
									</Route>
									<Route path='/about' component={About} />
								</>
								:
								// else show the sign in page
								<>
									<Redirect to='/index.html' />
									<SignIn onSignIn={this.handleSignIn} />
								</>
						}
						<LoadingProgress show={authLoading} />
						<ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sighn in process.`} onReload={this.handleSignIn} />
						<ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
					</Container>
				</Router>
			</ThemeProvider>
		);
	}

}

export default App;
