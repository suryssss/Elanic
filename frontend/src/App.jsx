import { useEffect, useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import AuthForm from './components/auth/Form'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Layout from './components/admin/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/features'
import ShoppingLayout from './components/shopping/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/lisiting'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page' 
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-check'
import { Skeleton } from "@/components/ui/skeleton"

function App() {
  
 const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth)
 const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading) return <Skeleton className="h-[600px] w-[600px] rounded-full" />


  return (
    <>
      <div className='w-screen h-screen flex flex-col overflow-hidden bg-white'>
          <Routes>
            <Route path='/' element={<div className="flex items-center justify-center h-screen text-2xl">Welcome to Elanic</div>} />
            <Route path='/auth' element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthForm/>
              </CheckAuth>
            }>
              <Route path='Login' element={<Login/>}/>
              <Route path='Register' element={<Register/>}/>
            </Route>
            <Route path='/admin' element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Layout/>
              </CheckAuth>
            }>
              <Route path='dashboard' element={<AdminDashboard/>}/>
              <Route path='products' element={<AdminProducts/>}/>
              <Route path='orders' element={<AdminOrders/>}/>
              <Route path='features' element={<AdminFeatures/>}/>
            </Route>
            <Route path='/shopping' element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout/>
              </CheckAuth>
            }>
              <Route path='home' element={<ShoppingHome/>}/>
              <Route path='listing' element={<ShoppingListing/>}/>
              <Route path='checkout' element={<ShoppingCheckout/>}/>
              <Route path='account' element={<ShoppingAccount/>}/>
            </Route>
              <Route path="/unauth-page" element={<UnauthPage/>}/>
              <Route path='*' element={<NotFound/>}/>
          </Routes>
      </div>
    </>
  )
}

export default App
