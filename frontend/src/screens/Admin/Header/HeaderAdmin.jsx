import React from 'react'
import 
{BsFillBoxSeamFill, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
import {MdOutlineHowToVote, MdMapsHomeWork} from 'react-icons/md'
import { Link } from 'react-router-dom'

function HeaderAdmin() {
  return (
    <header className='header'>
        <div>
          <Link to="">
            <BsGrid1X2Fill className='icon'/>
          </Link>
        </div>
        <div>
          <Link to="box">
            <BsFillBoxSeamFill className='icon'/>
          </Link>
        </div>
        <div>
          <Link to="location">
            <MdMapsHomeWork className='icon'/>
          </Link>
        </div>
        <div>
          <Link to="user">
          <BsPeopleFill className='icon'/>
          </Link>
        </div>
        <div>
          <Link to="settings">
            <BsFillGearFill className='icon'/>
          </Link>
        </div>
    </header>
  )
}

export default HeaderAdmin