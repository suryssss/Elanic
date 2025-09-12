import React from "react";
import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route} from "react-router"
import UserLayout from "./components/layout/UserLayout";
import { Routes } from "react-router";

function App() {
  const [count, setCount] = useState(0)

  return (

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout/>}></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
