import React from 'react'
import MyOrder from './MyOrder'

const Profile = () => {
  return (
    <div className='min-h-screen flex felx-col'>
        <div className='flex-grow container mx-auto p-4 md:p-6'>
            <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
                <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6'>
                    <h1 className='text-2xl md:text-3xl font-bold mb-4'>Name</h1>
                    <p className='text-lg text-gray-600 mb-4'>Email</p>
                    <button className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors'>Logout</button>
                </div>
                <div className='w-full md:w-2/3 lg:w-3/4'>
                    <MyOrder/>
                </div>
            </div>

        </div>
        
    </div>
  )
}

export default Profile