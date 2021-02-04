import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

/**
 * 
 * Zeigt die Sidebar in der Sicht in der die Rolle ausgewählt werden kann.
 */

export const SidebarDataUserView = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
  },
  
  {
    title: 'About',
    path: '/about',
    icon: <IoIcons.IoMdHelpCircle />
  }
];