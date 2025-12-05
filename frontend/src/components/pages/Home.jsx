import React from 'react'
import Hero from '../layout/Hero'
import GenderCollect from '../../products/GenderCollect'
import NewArrivals from '../../products/NewArrivals'
import BestSeller from '../../products/BestSeller'
import ProductGrid from '../../products/ProductGrid'
import FeaturedProducts from '../../products/FeaturedProducts'
import Features from '../../products/Features'
import { useDispatch } from 'react-redux'
import { fetchProductsByFilters } from '../../redux/slices/productSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'



const Home = () => {
  const dispatch=useDispatch();
  const {products,loading,error}=useSelector((state)=>state.products)
  const [bestSeller,setBestSeller]=useState(null);
  
  useEffect(()=>{
    dispatch(fetchProductsByFilters({
      gender:"Women",
      category:"Bottom Wear",
      limit:8
    })
  )
  const fetchBestSeller=async()=>{
    try {
      const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
      setBestSeller(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  fetchBestSeller()
  },[dispatch])

  return (
    <div>
        <Hero/>
        <GenderCollect/>
        <NewArrivals/>
        <h2 className='text-3xl text-center font-bold mb-4'>Best Sellers</h2>
        {bestSeller ? <BestSeller product={bestSeller}/> : <div className='text-center text-gray-500'>Loading...</div>}
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4'>Top Wear's for Women</h2>
          <ProductGrid products={products} loading={loading} error={error}/>
        </div>
        <FeaturedProducts/>
        <Features/>
    </div>
  )
}

export default Home