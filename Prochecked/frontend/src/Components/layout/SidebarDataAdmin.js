import React from 'react';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';

/**
 * 
 * Zeigt die Sidebar des Admins.
 */

export const SidebarDataAdmin = [
  {
    title: 'Home',
    path: '/AdminView',
    icon: <AiIcons.AiFillHome />,
  },

  {
    title: 'Admin',
    icon: <RiIcons.RiAdminFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
    
      {
        title: 'Projekte freigeben',
        path: '/admin/ProjectListNew',
        icon: <AiIcons.AiOutlineProject />,
        cName: 'sub-nav'
      },
      {
        title: 'Projektart verwalten',
        path: '/admin/CreateProjectType',
        icon: <AiIcons.AiFillProject />,
        cName: 'sub-nav',
      },
      {
        title: 'Personen verwalten',
        path: '/admin/CreatePerson',
        icon: <BsIcons.BsFillPersonLinesFill />,
        cName: 'sub-nav',
      },
      {
        title: 'Semester verwalten',
        path: '/admin/CreateSemester',
        icon: <MdIcons.MdTimeline />,
        cName: 'sub-nav',
      },
      
      {
        title: 'Module verwalten',
        path: '/admin/CreateModule',
        icon: <MdIcons.MdViewModule />,
        cName: 'sub-nav',
      },
      
    ]
  },
  {
    title: 'Dozent',
    path: '/dozent/DropDown_Dozent',
    icon: <GiIcons.GiTeacher />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    //   {
    //     title: 'Projekte verwalten',
    //     path: '/dozent/DropDown_Dozent',
    //     icon: <IoIcons.IoIosPaper />
    //   },
    // ]
  },
  
  {
    title: 'Student',
    path: '/student/SelectStudent',
    icon: <IoIcons.IoMdSchool />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    //   {
    //     title: 'Projekte anmelden',
    //     path: '/student/SelectStudent',
    //     icon: <IoIcons.IoIosPaper />
    //   },
    // ]
  },
  
  {
    title: 'About',
    path: '/about',
    icon: <IoIcons.IoMdHelpCircle />
  }
];