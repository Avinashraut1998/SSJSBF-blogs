import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router'

const SidebarItems = [
    {
        icon : <FaUserAlt/>,
        name:"Home",
        path:"home"
    },
    {
        icon : <FaUserAlt/>,
        name:"User Management",
        path:"users"
    },
    {
        icon : <FaUserAlt/>,
        name:"Blog Management",
        path:"blogs-management"
    },
]
const Sidebar = () => {

    const navigate = useNavigate()
    return (
        <div className='w-64 bg-gray-900 text-white shadow-lg h-screen border-r border-r-gray-600'>
            <div className='h-14 border-b border-b-gray-600 p-4'>
                <h1 className='text-xl font-semibold'>Dashboard Logo</h1>
            </div>
            <div>
                <ul className='mt-6'>
                    {SidebarItems.map((item,index) => (
                        <li onClick={() => navigate(item.path)} key={index} className='px-4 py-2 text-white hover:bg-gray-800 cursor-pointer flex items-center gap-2'>
                            {item.icon}  <span>
                           {item.name} </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar