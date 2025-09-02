import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const AdminLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className='w-full flex flex-col bg-gray-900 text-white'>
                <Navbar />
                <div className='p-8'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout