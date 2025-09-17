import React, { useState } from "react"
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import UserLayout from "./components/layout/UserLayout"
import Home from "./components/pages/Home"
import { Toaster } from "sonner"
import Login from "./components/pages/Login"

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
