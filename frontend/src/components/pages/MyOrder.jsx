import React, { useEffect, useState } from 'react'

const MyOrder = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: { city: "Hyderabad", country: "India" },
          orderItems: [
            {
              name: "product 1",
              image: "https://picsum.photos/500/500?random=1"
            },
          ],
          totalPrice: 1999,
          isPaid: true,
        },
        {
          _id: "54321",
          createdAt: new Date(),
          shippingAddress: { city: "Banglore", country: "India" },
          orderItems: [
            {
              name: "product 2",
              image: "https://picsum.photos/500/500?random=3"
            },
          ],
          totalPrice: 999,
          isPaid: false,
        },
      ]
      setOrders(mockOrders)
    }, 1000)
  }, [])

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-xl sm:text-2xl font-bold mb-6'>
        My Orders
      </h2>
      <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
        <table className='min-w-full text-left text-gray-500'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className='py-2 px-4 sm:py-3'>Image</th>
              <th className='py-2 px-4 sm:py-3'>Order Id</th>
              <th className='py-2 px-4 sm:py-3'>Created</th>
              <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
              <th className='py-2 px-4 sm:py-3'>Total Price</th>
              <th className='py-2 px-4 sm:py-3'>Paid Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className='border-b hover:border-gray-500 cursor-pointer'>
                  <td className='py-2 px-2 sm:py-4 sm:px-4 '>
                    <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='w-10 h-10 sm:h-12 object-cover rounded-lg'/>
                  </td>
                  <td className='py-2 px-4 text-gray-900 sm:py-4'>{order._id}</td>
                  <td className='py-2 px-4 text-gray-900 sm:py-4'>{order.createdAt.toLocaleDateString()}
                    {" "}{order.createdAt.toLocaleTimeString()}
                  </td>
                  <td className='py-2 px-4 text-gray-900 sm:py-4'>{order.shippingAddress.city? `${order.shippingAddress.city},${order.shippingAddress.country}` : "N/A"}</td>
                  <td className='py-2 px-4 text-gray-900 sm:py-4'>${order.totalPrice}</td>
                  <td className='py-2 px-4 text-gray-900 sm:py-4 sm:text-sm'>
                    <span className={`${order.isPaid ? 'bg-green-500' : 'bg-red-500'} text-white px-2 py-1 rounded`}>{order.isPaid ? 'Paid' : 'Pending'}</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 px-4 text-gray-500">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyOrder
