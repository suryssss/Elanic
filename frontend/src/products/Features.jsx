import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

const Features = () => {
  return (
    <section className='py-16 px-4 bg-white'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
        
        <div className='flex flex-col items-center'>
          <div className='p-4 rounded-full mb-4 bg-gray-100'>
            <HiShoppingBag className='text-3xl text-gray-700' />
          </div>     
          <h4 className='tracking-tighter mb-2 font-semibold'>FREE SHIPPING</h4>
          <p className='text-sm text-gray-500 tracking-tighter'>On orders over ₹1000</p>
        </div>

        <div className='flex flex-col items-center'>
          <div className='p-4 rounded-full mb-4 bg-gray-100'>
            <HiArrowPathRoundedSquare className='text-3xl text-gray-700' />
          </div>     
          <h4 className='tracking-tighter mb-2 font-semibold'>45 DAYS RETURN</h4>
          <p className='text-sm text-gray-500 tracking-tighter'>Money back guarantee</p>
        </div>

        <div className='flex flex-col items-center'>
          <div className='p-4 rounded-full mb-4 bg-gray-100'>
            <HiOutlineCreditCard className='text-3xl text-gray-700' />
          </div>     
          <h4 className='tracking-tighter mb-2 font-semibold'>SECURE CHECKOUT</h4>
          <p className='text-sm text-gray-500 tracking-tighter'>100% secured checkout process</p>
        </div>

      </div>
    </section>
  )
}

export default Features
