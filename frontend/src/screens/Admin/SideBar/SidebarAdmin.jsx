import React from 'react'

import 
{BsFillBoxSeamFill, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
import {MdOutlineHowToVote, MdMapsHomeWork} from 'react-icons/md'
import { Link, Route } from 'react-router-dom'
 

function SidebarAdmin({openSidebarToggle, OpenSidebar}) {

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <MdOutlineHowToVote  className='icon_header'/> Election
            </div>
            {/* <span className='icon close_icon' onClick={OpenSidebar}>X</span> */}
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="box">
                    <BsFillBoxSeamFill className='icon'/> Find by Box
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="location">
                    <MdMapsHomeWork className='icon'/> Find by Location
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="user">
                    <BsPeopleFill className='icon'/> Find User
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="settings">
                    <BsFillGearFill className='icon'/> Setting
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default SidebarAdmin