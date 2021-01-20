import React from 'react';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';


export const SidebarDataStudent = [
  {
    title: 'Home',
    path: '/StudentView',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },


  {
    title: 'Projektanmeldung',
    path: '/ProjectListStudent',
    icon: <RiIcons.RiAdminFill />,
   
    },
  {
      title: 'Semesterbericht',
      path: '/Semesterbericht',
      icon: <RiIcons.RiAdminFill />,
     
    },
    
  {
    title: 'About',
    path: '/about',
    icon: <IoIcons.IoMdHelpCircle />
  }
];