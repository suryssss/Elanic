import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterOption from '../../products/FilterOption'
import SortOptions from '../../products/SortOptions'
import ProductGrid from '../../products/ProductGrid'
import { useParams, useSearchParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../../redux/slices/productSlice'

const Collection = () => {
  const {collection}=useParams()
  const [searchParams]=useSearchParams()
  const dispatch=useDispatch()
  const {products,loading,error}=useSelector((state)=>state.products)
  const queryParams=Object.fromEntries([...searchParams])

  const sidebar=useRef(null);
  const [isSidebaropen,setIsSidebaropen]=useState(false);


  useEffect(()=>{
    dispatch(fetchProductsByFilters({collection,...queryParams}))
  },[dispatch,collection,searchParams])

  const toggleSidebar=()=>{
    setIsSidebaropen(!isSidebaropen);
  }

  const handleClick=(e)=>{
    if(sidebar.current && !sidebar.current.contains(e.target)){
      setIsSidebaropen(false);
    }
  }

  useEffect(()=>{
    document.addEventListener("mousedown",handleClick)

    return ()=>{
      document.removeEventListener("mousedown",handleClick)
    }
  },[])


  return (
    <div className='flex flex-col lg:flex-row '>
      <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
        <FaFilter className='mr-2'/>
        <span>Filter</span>
      </button>
      <div ref={sidebar} className={`${isSidebaropen ? "translate-x-0 ":"translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto
      transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}>
        <FilterOption/>
      </div>
      <div className='flex-grow p-4'>
        <h2 className='text-2xl uppercase mb-4'>All Collections</h2>

        <SortOptions/>
        <ProductGrid products={products} loading={loading} error={error}/>
      </div>
    </div>
  )
}

export default Collection