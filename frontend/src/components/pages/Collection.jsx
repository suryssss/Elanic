import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterOption from '../../products/FilterOption'
import SortOptions from '../../products/SortOptions'
import ProductGrid from '../../products/ProductGrid'

const Collection = () => {
  const [products,setProducts]=useState([])
  const sidebar=useRef(null);
  const [isSidebaropen,setIsSidebaropen]=useState(false);

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

  useEffect(() => {
    setTimeout(()=>{
      const fetchProducts=[
        {
          _id:1,
          name:"Product 1",
          price:199,
          images:[{
            url:"https://picsum.photos/500/500?random=4",
            altText:"Product 1"
          }]
        },
        {
          _id:2,
          name:"Product 2",
          price:149,
          images:[{
            url:"https://picsum.photos/500/500?random=5",
            altText:"Product 2"
          }]
        },
        {
          _id:3,
          name:"Product 3",
          price:299,
          images:[{
            url:"https://picsum.photos/500/500?random=9",
            altText:"Product 3"
          }]
        },
        {
          _id:4,
          name:"Product 4",
          price:159,
          images:[{
            url:"https://picsum.photos/500/500?random=8",
            altText:"Product 4"
          }]
        },
        {
          _id:5,
          name:"Product 5",
          price:99,
          images:[{
            url:"https://picsum.photos/500/500?random=4",
            altText:"Product 1"
          }]
        },
        {
          _id:6,
          name:"Product 6",
          price:299,
          images:[{
            url:"https://picsum.photos/500/500?random=5",
            altText:"Product 2"
          }]
        },
        {
          _id:7,
          name:"Product 7",
          price:149,
          images:[{
            url:"https://picsum.photos/500/500?random=6",
            altText:"Product 3"
          }]
        },
        {
          _id:8,
          name:"Product 8",
          price:399,
          images:[{
            url:"https://picsum.photos/500/500?random=7",
            altText:"Product 4"
          }]
        },
      ];setProducts(fetchProducts) 
    },1000)
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
        <ProductGrid products={products}/>
      </div>
    </div>
  )
}

export default Collection