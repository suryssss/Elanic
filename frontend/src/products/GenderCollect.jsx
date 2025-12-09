import React from 'react'
import maleImg from ".././assets/menss.avif"
import femaleImg from ".././assets/women.avif"
import { Link } from 'react-router'

const GenderCollect = () => {
  return (
    <section className='py-12 px-20 lg:px-0 ml-[20px] mr-[20px]'>
      <div className='container mx-auto flex flex-col md:flex-row'>
        <div className='relative flex-1'>
           <img src={femaleImg} alt="Women's Collection" className='w-full h-[850px] object-cover ' /> 
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3 '>Women's Collection</h2>
            <Link to="/collections/all?gender=women" className='text-gray-900 hover:text-black px-6 py-2  text-lg'>Shop Now</Link>
          </div>
        </div>
        <div className='relative flex-1'>
           <img src={maleImg} alt="Women's Collection" className='w-full h-[850px] object-cover ' /> 
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3 '>Men's Collection</h2>
            <Link to="/collections/all?gender=Men" className='text-gray-900 hover:text-black px-6 py-2  text-lg'>Shop Now</Link>
          </div>
        </div>
        

      </div>

    </section>
  )
}

export default GenderCollect