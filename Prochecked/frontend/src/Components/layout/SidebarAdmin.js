import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarDataAdmin } from './SidebarDataAdmin';
import { SidebarDataDozent } from './SidebarDataDozent';
import { SidebarDataStudent } from './SidebarDataStudent';
import { SidebarDataUserView } from './SidebarDataUserView';
import {AppApi} from '../../AppApi'
import { Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import ProfileDropDown from '../dialogs/ProfileDropDown.js'


import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';


const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const [student, setStudent] = useState(null);

  const showSidebar = () => {setSidebar(!sidebar); getStudentByPerson()};
  const classes = props
  // const person = props.person;

  // console.log(props)

  

    
    let berechtigung = props.person.berechtigung
    let result

    if (berechtigung === 3){
      result = SidebarDataAdmin
    }
    else if (berechtigung ===2){
      result = SidebarDataDozent
    }
    else if (berechtigung ===1){
      result = SidebarDataStudent
    }
    else if(berechtigung === null){
      result = SidebarDataAdmin
    }
    else{
      result = SidebarDataUserView
    }


    let getStudentByPerson = () =>{
      if(props.person.berechtigung != null){
      var api = AppApi.getAPI()
      api.getStudentByPersonId(props.person.id) //evtl. Objekt von API vorher anlegen
        .then(studentBO =>
          setStudent(studentBO))}             // Set new state when ProjectBOs have been fetched

            
      //     ).catch(e =>
      //       this.setState({             // Reset state with error from catch
      //         loadingInProgress: false, // disable loading indicator
      //         error: e
      //       })
      //     );
      // // set loading to true
      // this.setState({
      //   loadingInProgress: true,
      //   error: null
      // });
    }
    
  
  return (
    
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <Grid item xs={3} justify="flex-start">
            <NavIcon to='#'>
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
          </Grid>

          <Grid  item xs={6} justify="center">
                
                <Typography variant="h5" align = 'center'>
                          <div>ProChecked - Hochschule der Medien </div>     
                </Typography>
                      
          </Grid>

        
          <Grid justify="flex-end">

          {props.person.name}

          </Grid>
      
          <Grid item xs={3} justify="flex-end">                 
                      
                <ProfileDropDown 
                className = {classes.profil} 
                person={props.person}/>
               
          </Grid>



        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>





            {

              result.map((item, index) => {console.log(props.person)
                    return <SubMenu item={item} key={index} person = {props.person} student = {student} />;
                  })
            }

       

          </SidebarWrap>
          
        </SidebarNav>

        
        
        
      </IconContext.Provider>

      
    </>
  );
};

export default Sidebar;