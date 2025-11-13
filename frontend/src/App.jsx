import React from "react"
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import UserLayout from "./components/layout/UserLayout"
import Home from "./components/pages/Home"
import { Toaster } from "sonner"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import Profile from "./components/pages/Profile"
import Collection from "./components/pages/Collection"
import ProductDetails from "./products/ProductDetails"
import Checkout from "./components/cart/Checkout"
import OrderConfirmation from "./components/pages/OrderConfirmation"
import { CartProvider } from "./context/CartContext"
import OrderDetailsPage from "./components/pages/OrderDetailsPage"
import MyOrder from "./components/pages/MyOrder"
import AdminLayout from "./components/admin/AdminLayout"
import AdminHomePage from "./components/pages/AdminHomePage"

function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />}/>
            <Route path="collections/:collection" element={<Collection />}/>
            <Route path="product/:id" element={<ProductDetails />}/>
            <Route path="checkout" element={<Checkout />}/>
            <Route path="order-confirmation" element={<OrderConfirmation />}/>
            <Route path="order/:id" element={<OrderDetailsPage />}/>
            <Route path="/my-orders" element={<MyOrder />}/>
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />}/></Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
