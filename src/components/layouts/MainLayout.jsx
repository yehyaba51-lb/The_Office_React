import React, { useState } from 'react'
import SideBar from '../shared/SideBar'
import TopBar from '../shared/TopBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const MainLayout = ({ role }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div className='flex w-full h-screen'>
      <SideBar role={role} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="flex flex-col flex-1 overflow-y-auto h-screen">
        <TopBar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  )
}

export default MainLayout