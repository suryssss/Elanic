import React from 'react'
import Header from "../common/Header"
import Footer from "../common/Footer"
import { Outlet } from "react-router"

function UserLayout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    
    </>
  )
}

export default UserLayout