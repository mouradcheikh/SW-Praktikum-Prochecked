import React, { Component } from 'react';
import StudentView from './StudentView'
import AdminView from './AdminView'
import DozentView from './DozentView'
import UserView from './UserView'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class PersonLoggedIn extends Component {
    constructor(props) {
        super(props);
    }
    render() 
    { 
        let page
        let berechtigung = this.props.berechtigung
        if (berechtigung === 1){
            page = <> 
                    <Redirect to={{
                    pathname: '/StudentView'
                    }}
                    />
                    </>
        }
        else if (berechtigung === 2){
            page = <>	
                    <Redirect to={{
                    pathname: '/DozentView',
                    state: { person : this.props.person }
                    }}
                    />
                    </>
        }
        else if (berechtigung === 3){
            page = <>	
                    <Redirect to={{
                    pathname: '/AdminView',
                    }}
                    />
                    </>
        }
        else {
            page = <>
                    <Redirect from='/' to='UserView' />
                    <Route exact path='/UserView'>
                    <UserView setRole={this.props.setRole} person={this.props.person}/>
                    </Route>
                    </>;
        }
        return(
            <div>
                {page}
            </div>
            
            )
         ;
    }
}
 
export default PersonLoggedIn; 