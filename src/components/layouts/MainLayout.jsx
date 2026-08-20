import React from 'react'
import SideBar from '../shared/SideBar'
import TopBar from '../shared/TopBar'
import { Outlet } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const MainLayout = ({ role }) => {
  return (
    <div className='flex w-full h-screen'>
      <SideBar role={role} />
      <div className="flex flex-col flex-1 overflow-y-auto h-screen">
        <TopBar />
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  )
}

export default MainLayout