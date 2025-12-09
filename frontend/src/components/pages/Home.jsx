import React from 'react'
import Hero from '../layout/Hero'
import GenderCollect from '../../products/GenderCollect'
import NewArrivals from '../../products/NewArrivals'
import ProductDetails from '../../products/ProductDetails'
import ProductGrid from '../../products/ProductGrid'
import FeaturedProducts from '../../products/FeaturedProducts'
import Features from '../../products/Features'
import { useDispatch } from 'react-redux'
import { fetchProductsByFilters } from '../../redux/slices/productSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import MadeForYou from '../../products/MadeForYou'



const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products)
  const [bestSeller, setBestSeller] = useState(null);
  const [bestSellerLoading, setBestSellerLoading] = useState(true);
  const [bestSellerError, setBestSellerError] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsByFilters({
      gender: "Women",
      category: "Bottom Wear",
      limit: 8
    })
    )
    const fetchBestSeller = async () => {
      try {
        setBestSellerLoading(true);
        setBestSellerError(null);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
        if (response.data && response.data._id) {
          setBestSeller(response.data)
        } else {
          setBestSellerError("No best seller found")
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setBestSellerError("No best seller product available")
        } else {
          setBestSellerError(error.response?.data?.message || "Failed to load best seller")
        }
        setBestSeller(null)
      } finally {
        setBestSellerLoading(false)
      }
    }
    fetchBestSeller()
  }, [dispatch])

  return (
    <div>
      <Hero />
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[30px] font-bold leading-tight ml-10">
          Style<br />Simplified & Redefined
        </h2>
        <p className="text-[20px] font-semibold mr-10">
          Timeless Fashion for <br/> Everyone
        </p>
      </div>
      <GenderCollect />
      <NewArrivals />
      <MadeForYou/>
      <h2 className='text-3xl text-center font-bold mb-4'>Best Sellers</h2>
      {bestSellerLoading ? (
        <div className='text-center text-gray-500 py-8'>Loading best seller...</div>
      ) : bestSellerError ? (
        <div className='text-center text-gray-500 py-8'>{bestSellerError}</div>
      ) : bestSeller && bestSeller._id ? (
        <ProductDetails productId={bestSeller._id} key={bestSeller._id} />
      ) : (
        <div className='text-center text-gray-500 py-8'>No best seller available</div>
      )}
      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>Trending Picks for Women</h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedProducts />
      <Features />
    </div>
  )
}

export default Home