import React from "react";
import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route} from "react-router"
import UserLayout from "./components/layout/UserLayout";
import { Routes } from "react-router";
import Home from "./components/pages/Home";
import {Toaster} from "sonner"

function App() {
  const [count, setCount] = useState(0)

  return (

      <BrowserRouter>
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<UserLayout/>}>
        <Route index element={<Home/>}></Route></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
