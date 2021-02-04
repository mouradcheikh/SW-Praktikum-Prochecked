import React, { Component } from 'react';
import UserView from './UserView'
import { BrowserRouter as Route, Redirect } from 'react-router-dom';
import {Grid} from '@material-ui/core';
import SidebarAdmin from '../layout/SidebarAdmin';

/**
 * Zeigt die Seite welche die Person anhand ihrer gespeicherten Rolle an die entsprechende Seite weiter leitet
 * Entweder Student View, DozentView oder AdminView 
 */

class PersonLoggedIn extends Component {
    constructor(props) {
        super(props);
    }
    render() 
    { 
        let page
        let berechtigung = this.props.berechtigung
        let student = this.props.student
    
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
                    state: {person: this.props.person}
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
            <Grid 
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                >
                <Grid >
                    <SidebarAdmin  style={{align: 'top'}} person ={this.props.person}/>
                </Grid>
            
                <Grid>
                    {page}
                </Grid>
            </Grid>
            </div>
            
            )
         ;
    }
}

export default PersonLoggedIn; 