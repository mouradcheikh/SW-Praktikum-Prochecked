import React from 'react';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';
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
    icon: <MdIcons.MdAddToPhotos />,
   
    },
  {
      title: 'Semesterbericht',
      path: '/Semesterbericht',
      icon: <FaIcons.FaList />,
     
    },
    
  {
    title: 'About',
    path: '/about',
    icon: <IoIcons.IoMdHelpCircle />
  }
];