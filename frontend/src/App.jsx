import React, { useState } from "react"
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import UserLayout from "./components/layout/UserLayout"
import Home from "./components/pages/Home"
import { Toaster } from "sonner"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
