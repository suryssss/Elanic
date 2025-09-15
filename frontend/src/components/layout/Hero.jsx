import React from 'react'
import heroimg from "../../assets/rabbit-hero.webp"
import { Link } from 'react-router'

const Hero = () => {
  return (
    <section className='relative'>
      <img src={heroimg} alt='elanic' className='w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover'/>
      <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
        <div className='text-center text-white p-6'>
          <h1 className='text-4xl md:text-9xl font-bold tracking-tight uppercase mb-4 '>
            Vacation<br/>Ready
          </h1>
          <p className='text-sm tracking-tight md:text-lg mb-6'>Explore our vacation ready outfits with fast shipping</p>
          <Link to="#" className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'>Shop Now</Link>
        </div>
      </div>
    </section>
  )
}

export default Hero