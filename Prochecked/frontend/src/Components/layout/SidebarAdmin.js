import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarDataAdmin } from './SidebarDataAdmin';
import { SidebarDataDozent } from './SidebarDataDozent';
import { SidebarDataStudent } from './SidebarDataStudent';
import { SidebarDataUserView } from './SidebarDataUserView';

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

  const showSidebar = () => setSidebar(!sidebar);
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
    else{
      result = SidebarDataUserView
    }
  
  return (
    
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>





            {

              result.map((item, index) => {console.log(props.person)
                    return <SubMenu item={item} key={index} person = {props.person} />;
                  })

          //    props.person.berechtigung===3?
            
          //   SidebarDataAdmin.map((item, index) => {
          //     return <SubMenu item={item} key={index} />;
          //   })
            

          //   :props.person.berechtigung ===2?
          //   SidebarDataDozent.map((item, index) => {
          //     return <SubMenu item={item} key={index} />;
          //   })

          //   :props.person.berechtigung ===1?
          //   SidebarDataStudent.map((item, index) => {
          //     return <SubMenu item={item} key={index} />;
          //   })
          //   :
          //   SidebarDataUserView.map((item, index) => {
          //     return <SubMenu item={item} key={index} />;

          // })
          }

            {/* {(() =>
            {
            if (props.person.berechtigung===3){

              SidebarDataAdmin.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })
            }
            else if(props.person.berechtigung ===2){
              SidebarDataDozent.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })
            }
            else{
              SidebarDataStudent.map((item, index) => {
                console.log("fcsfdf")
                return <SubMenu item={item} key={index} />;
                
                  })
            }
            
           }) */}
       

          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;