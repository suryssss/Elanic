import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterOption from '../../products/FilterOption'

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

    document.removeEventListener("mousedown",handleClick)
  },[isSidebaropen])

  useEffect(() => {
    setTimeout(()=>{
      const fetchProducts=[
        {
          _id:1,
          name:"Product 1",
          price:1000,
          images:[{
            url:"https://picsum.photos/500/500?random=4",
            altText:"Product 1"
          }]
        },
        {
          _id:2,
          name:"Product 2",
          price:2000,
          images:[{
            url:"https://picsum.photos/500/500?random=5",
            altText:"Product 2"
          }]
        },
        {
          _id:3,
          name:"Product 3",
          price:3000,
          images:[{
            url:"https://picsum.photos/500/500?random=9",
            altText:"Product 3"
          }]
        },
        {
          _id:4,
          name:"Product 4",
          price:4000,
          images:[{
            url:"https://picsum.photos/500/500?random=8",
            altText:"Product 4"
          }]
        },
        {
          _id:5,
          name:"Product 5",
          price:1000,
          images:[{
            url:"https://picsum.photos/500/500?random=4",
            altText:"Product 1"
          }]
        },
        {
          _id:6,
          name:"Product 6",
          price:2000,
          images:[{
            url:"https://picsum.photos/500/500?random=5",
            altText:"Product 2"
          }]
        },
        {
          _id:7,
          name:"Product 7",
          price:3000,
          images:[{
            url:"https://picsum.photos/500/500?random=6",
            altText:"Product 3"
          }]
        },
        {
          _id:8,
          name:"Product 8",
          price:4000,
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
      <div ref={sidebar} className={`${isSidebaropen ? "translate-x-0 ":"translate-x-full"}`}>
        <FilterOption/>
      </div>
    </div>
  )
}

export default Collection