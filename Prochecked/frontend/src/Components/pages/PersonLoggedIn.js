import React, { Component } from 'react';
import StudentView from './StudentView/StudentLogin'
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
        let student = this.props.student
        // if (berechtigung === 1 && student.getID() != null){
        //     page = <> 
        //             <Redirect to={{
        //             pathname: '/StudentView',
        //             state: {person: this.props.person,
        //                     student: this.props.student}
        //             }}
        //             />
        //             </>
        // }
        // else if (berechtigung === 1 && student.getID() === null){
        //     page = <> 
        //             <Redirect to={{
        //             pathname: '/StudentLogin',
        //             state: {person : this.props.person}
        //             }}
        //             />
        //             </>
        // }


        if (berechtigung === 1){
            if (student.getID() === null){
                page = <> 
                    <Redirect to={{
                    pathname: '/StudentLogin',
                    state: {person : this.props.person}
                    }}
                    />
                    </>
            }
            else if (student.getID() != null){
                page = <> 
                    <Redirect to={{
                    pathname: '/StudentView',
                    state: {person: this.props.person,
                            student: this.props.student}
                    }}
                    />
                    </>
            }}

        else if (berechtigung === 2){
            page = <>	
                    <Redirect to={{
                    pathname: '/DozentView',
                    state: {person: this.props.person}
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