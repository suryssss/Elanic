import React from 'react'
import Topbar from '../layout/Topbar'
import Navbar from '../layout/Navbar'

const Header = () => {
  return (
    <header className='border-b border-gray-200'>
    <Topbar/>
    <Navbar/>
    </header>
  )
}

export default Header