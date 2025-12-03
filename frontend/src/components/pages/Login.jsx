import React, { useState } from 'react'
import { Link } from 'react-router'
import login from './../../assets/login.webp'
import { loginUser } from '../../redux/slices/authslice'
import { useDispatch } from 'react-redux'

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()

    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(loginUser({email,password}))
    }
  return (
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 '>
            <form 
            onSubmit={handleSubmit}
            className='w-full max-w-md bg-white p-8 rounded-lg  shadow-sm'>
                <div className='flex justify-center mb-6 '>
                    <h2 className='text-xl front-medium'>
                        Elanic
                    </h2>
                </div>
                <h2 className='text-2xl font-bold text-center mb-6'>Login to your account</h2>
                <p className='text-center text-gray-600 mb-6'>Enter your email and password to login</p>
                <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Email</label>
                    <input 
                    type="email" 
                    placeholder='Email' 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'/>
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Password</label>
                    <input 
                    type="password" 
                    placeholder='Password' 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'/>
                </div>
                <button 
                type='submit' 

                className='w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors'>Sign In</button>
                <p className='mt-6 text-center text-sm'>Dont have an account?{" "}
                    <Link to="/register" className='text-black font-semibold hover:underline'>Register</Link>
                </p>
            </form>

        </div>
        <div className='hidden md:block w-1/2 bg-gray-800'>
        <div className='h-full flex flex-col justify-center items-center'>
    <img src={login} alt="Login" className='h-[750px] w-full object-cover'/>
        </div>
        </div>
    </div>
  )
}

export default Login