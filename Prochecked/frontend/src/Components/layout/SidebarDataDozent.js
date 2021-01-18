import React from 'react';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';


export const SidebarDataDozent = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    
  },


  {
    title: 'Projekt erstellen',
    path: '/projektErstellen',
    icon: <RiIcons.RiAdminFill />,
   
    },
  {
      title: 'Projekte bewerten',
      path: '/projekteBewerten',
      icon: <RiIcons.RiAdminFill />,
     
    },
    
  {
    title: 'About',
    path: '/about',
    icon: <IoIcons.IoMdHelpCircle />
  }
];