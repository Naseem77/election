
import { useState } from 'react'
import './Admin/AdminStyle.css'
import Header from './Admin/Header/HeaderAdmin'
import Sidebar from './Admin/SideBar/SidebarAdmin'
import Home from './Admin/HomeAdmin'
import { Outlet } from 'react-router-dom'


function AdminScreen() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
    <div className='grid-container'>
      <Header/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      {/* <Home /> */}
      <Outlet/>
    </div>
    </>
  )
}

export default AdminScreen
