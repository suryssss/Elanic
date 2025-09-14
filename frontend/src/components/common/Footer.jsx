import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import {  FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className='border-t py-12 px-10'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
        <div>
          <h3 className='text-lg text-gray-900 mb-4'>NewsLetter</h3>
          <p className=' text-gray-500 mb-4'>Be the first to hear about new arrivals, exclusive offers, and special events.</p>
          <p className='font-medium text-sm text-gray-600 mb-6'>Sign up and get 10% off your first order!</p>
          <form className='flex'>
              <input type='email' placeholder='Enter your email' className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none
              focus:ring-2 focus:ring-gray-500 transition-all'required/>
              <button type='submit' className='bg-black text-amber-50 px-6 rounded-r-md hover:bg-gray-800 transition-all w-40'>Subscribe</button>
          </form>
        </div>
        <div>
          <h3 className='text-lg text-gray-800 mb-4 '>Shop</h3>
          <ul className='space-y-2 text-gray-700'>
              <li>
                <Link to="#" className='hover:text-black transition-colors'>Men's Clothing</Link>
              </li>
              <li>
                <Link to="#" className='hover:text-black transition-colors'>Women's Clothing</Link>
              </li>
              <li>
                <Link to="#" className='hover:text-black transition-colors'>Kid's Clothing</Link>
              </li>
              <li>
                <Link to="#" className='hover:text-black transition-colors'>Accessories</Link>
              </li>
          </ul>
        </div>
        <div>
          <h3 className='text-lg text-gray-800 mb-4 '>Shop</h3>
          <ul className='space-y-2 text-gray-700'>
              <li>
                <Link to="#" className='hover:text-black transition-colors'>Support</Link>
              </li>
              <li>
                <Link to="#" className='hover:text-black transition-colors'>About Us</Link>
              </li>
              <li>
                <Link to="#" className='hover:text-black transition-colors'>Blogs</Link>
              </li>
              <li>
                <Link to="#" className='hover:text-black transition-colors'>Contact Us</Link>
              </li>
          </ul>
        </div>
        <div>
          <h3 className='text-lg text-gray-800 mb-2'>Follow Us</h3>
          <div className='flex items-center space-x-4 mb-4'>
            <a href="#"><FaFacebookF className="h-5 w-5 hover:text-gray-600 transition-colors" /></a>
            <a href="#"><FaXTwitter className="h-5 w-5 hover:text-gray-600 transition-colors" /></a>
            <a href="#"><FaInstagram className="h-5 w-5 hover:text-gray-600 transition-colors" /></a>
          </div>
          <h3 className='text-lg text-gray-800 '>Contact Us</h3>
          <p className='text-gray-700 mb-2'>Phone: (123) 456-7890</p>
          <p className='text-gray-700 mb-2'>Email: info@elanic.com</p>
        </div>
      </div>
      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
          <p className='text-gray-500 text-sm tracking-tighter text-center'>
            @2025, Elanic. All rights reserved.
          </p>
        </div>

    </footer>
  )
}

export default Footer