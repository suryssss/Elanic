import React from 'react'
import maleImg from ".././assets/mens-collection.webp"
import femaleImg from ".././assets/womens-collection.webp"
import { Link } from 'react-router'

const GenderCollect = () => {
  return (
    <section className='py-12 px-14 lg:px-0'>
      <div className='container mx-auto flex flex-col md:flex-row gap-8'>
        <div className='relative flex-1'>
           <img src={femaleImg} alt="Women's Collection" className='w-full h-[700px] object-cover' /> 
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3 '>Women's Collection</h2>
            <Link to="/collections/all?gender=women" className='text-gray-900 hover:text-black px-6 py-2  text-lg'>Shop Now</Link>
          </div>
        </div>
        <div className='relative flex-1'>
           <img src={maleImg} alt="Women's Collection" className='w-full h-[700px] object-cover' /> 
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