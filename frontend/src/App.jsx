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
import Checkout from "./components/cart/Checkout"
import OrderConfirmation from "./components/pages/OrderConfirmation"
import { CartProvider } from "./context/CartContext"
import OrderDetailsPage from "./components/pages/OrderDetailsPage"
import MyOrder from "./components/pages/MyOrder"
import AdminLayout from "./components/admin/AdminLayout"
import AdminHomePage from "./components/pages/AdminHomePage"
import UserManage from "./components/admin/UserManage"
import ProductManage from "./components/admin/ProductManage"
import EditProduct from "./components/admin/EditProduct"
import OrderManagement from "./components/admin/OrderManagement"

import {Provider} from "react-redux"
import store from "./redux/store"
import ProductDetails from "./products/ProductDetails"
import ProtectedRoute from "./components/common/ProtectedRoute"

function App() {

  return (
    <Provider store={store}>
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
            <Route path="product/:id" element={<ProductDetails/>}/>
            <Route path="checkout" element={<Checkout />}/>
            <Route path="order-confirmation" element={<OrderConfirmation />}/>
            <Route path="order/:id" element={<OrderDetailsPage />}/>
            <Route path="my-orders" element={<MyOrder />}/>
          </Route>
          <Route path="/admin" element={<ProtectedRoute role="admin">
            <AdminLayout />
            </ProtectedRoute>}>
          <Route index element={<AdminHomePage />}/>
          <Route path="users" element={<UserManage/>}/>
          <Route path="products" element={<ProductManage/>}/>
          <Route path="products/:id/edit" element={<EditProduct/>}/>
          <Route path="orders" element={<OrderManagement/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </Provider>
  )
}

export default App
