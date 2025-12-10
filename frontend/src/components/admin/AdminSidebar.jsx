import React from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStop, FaStore, FaUsers } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router'
import { clearCart } from '../../redux/slices/cartSlice';
import { logout } from '../../redux/slices/authslice';

const AdminSidebar = () => {

    const navigate = useNavigate();
    const dispatch=useDispatch()

    const handleLogOut = () => {
        dispatch(logout())
        dispatch(clearCart())
        navigate("/")
    }

  return (
    <div className='p-6'>
        <div className='mb-6'>
            <Link to='/admin' className='text-2xl font-medium'>Elanic</Link>
        </div>
        <h2 className='text-xl font-medium mb-6 text-center'>Admin Dashboard</h2>
        <nav className='flex flex-col space-y-2'>
            <NavLink 
            to='/admin/users'
            className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":
            "text-gray300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaUsers size={20}/>
                <span>Users</span>
            </NavLink>
            <NavLink 
            to='/admin/orders'
            className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":
            "text-gray300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaClipboardList size={20}/>
                <span>Orders</span>
            </NavLink>
            <NavLink 
            to='/admin/products'
            className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":
            "text-gray300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaBoxOpen size={20}/>
                <span>Products</span>
            </NavLink>
            <NavLink 
            to='/'
            className={({isActive})=> isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":
            "text-gray300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaStore size={20}/>
                <span>Shop</span>
            </NavLink>
        </nav>
        <div className='mt-6'>
            <button onClick={handleLogOut} className='w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded
            flex items-center justify-center space-x-2'>
                <FaSignOutAlt size={20}/>
                <span>Log Out</span></button>
        </div>
    </div>
  )
}

export default AdminSidebar