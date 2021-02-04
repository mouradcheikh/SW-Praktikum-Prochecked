import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';

export const SidebarDataDozent = [
  {
    title: 'Home',
    path: '/DozentView',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Projekt erstellen',
    path: '/CreateProject',
    icon: <IoIcons.IoIosCreate />,
    },
  {
      title: 'Projekte bewerten',
      path: '/ProjectList',
      icon: <AiIcons.AiFillProject />,
    },
    {
      title: 'Notenliste einsehen',
      path: '/GradeList',
      icon: <FaIcons.FaList />,
    },
    
  {
    title: 'About',
    path: '/about',
    icon: <IoIcons.IoMdHelpCircle />
  }
];