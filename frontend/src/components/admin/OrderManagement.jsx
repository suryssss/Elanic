import React from 'react'

const OrderManagement = () => {

    const orders=[
        {
            _id:1234,
            user:{
                name:"Rithwik"    
            },
            totalPrice:199,
            status:"processing",
        },
    ]

    const handleStatusChange=(orderId,status)=>{
        console.log(orderId,status)
    }

  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>Order Management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full  text-left '>
                <thead className='text-xs text-left  uppercase bg-gray-50'>
                    <tr>
                        <th className="px-6 py-3">Order ID</th>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Total Price</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length>0 ?(
                    orders.map((order) => (
                        <tr key={order._id} className="border-b  bg-white hover:bg-gray-50 cursor-pointer">
                            <td className="px-6 py-4">#{order._id}</td>
                            <td className="px-6 py-4 text-gray-600">{order.user.name}</td>
                            <td className="px-6 py-4 text-gray-600">${order.totalPrice}</td>
                            <td className='p-4'>
                                <select value={order.status} 
                                onChange={(e)=>handleStatusChange(order._id,e.target.value)}
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 block  p-2.5'>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </td>
                            <td className='p-4'>
                                <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded'>
                                    Mark as Delivered
                                </button>
                            </td>
                        </tr>
                    ))
                    ):(
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default OrderManagement