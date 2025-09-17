import React, { useState } from 'react'
import { Link } from 'react-router'
import login from './../../assets/login.webp'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(username, email, password)
  }

  return (
    <div className='flex'>
      {/* Left side - form */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
        <form 
          onSubmit={handleSubmit} 
          className='w-full max-w-md bg-white p-8 rounded-lg shadow-sm'
        >
          <div className='flex justify-center mb-6'>
            <h2 className='text-xl font-medium'>Elanic</h2>
          </div>
          <h2 className='text-2xl font-bold text-center mb-6'>Create your account</h2>
          <p className='text-center text-gray-600 mb-6'>Enter your details to register</p>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Username</label>
            <input 
              type="text"
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <input 
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Password</label>
            <input 
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
            />
          </div>

          <button 
            type='submit'
            className='w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors'
          >
            Sign Up
          </button>

          <p className='mt-6 text-center text-sm'>
            Already have an account?{" "}
            <Link to="/login" className='text-black font-semibold hover:underline'>
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right side - image */}
      <div className='hidden md:block w-1/2 bg-gray-800'>
        <div className='h-full flex flex-col justify-center items-center'>
          <img src={login} alt="Login" className='h-[750px] w-full object-cover' />
        </div>
      </div>
    </div>
  )
}

export default Register
