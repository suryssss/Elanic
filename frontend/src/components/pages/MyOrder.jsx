import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserOrder } from '../../redux/slices/orderSlice'
import { toast } from 'sonner'

const MyOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orders, loading, error } = useSelector((state) => state.orders)

  useEffect(() => {
    const token = localStorage.getItem("userToken")
    if (!token) {
      navigate("/login")
      return
    }
    dispatch(fetchUserOrder())
  }, [dispatch, navigate])

  useEffect(() => {
    if (error) {
      toast.error(error?.message || "Failed to fetch orders")
    }
  }, [error])

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
        <div className='text-center py-8'>
          <p className='text-gray-500'>Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-xl sm:text-2xl font-bold mb-6'>
        My Orders
      </h2>
      {error && (
        <div className='mb-4 p-4 bg-red-100 text-red-700 rounded'>
          {error?.message || error}
        </div>
      )}
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
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr 
                  key={order._id} 
                  onClick={() => handleOrderClick(order._id)}
                  className='border-b hover:bg-gray-50 cursor-pointer transition-colors'
                >
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                    {order.orderItems && order.orderItems.length > 0 ? (
                      <img 
                        src={order.orderItems[0].image || '/placeholder-image.jpg'} 
                        alt={order.orderItems[0].name || 'Product'} 
                        className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg'
                      />
                    ) : (
                      <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg flex items-center justify-center'>
                        <span className='text-xs text-gray-400'>No Image</span>
                      </div>
                    )}
                  </td>
                  <td className='py-2 px-4 text-gray-900 sm:py-4'>
                    #{order._id?.slice(-8) || order._id}
                  </td>
                  <td className='py-2 px-4 text-gray-900 sm:py-4'>
                    {formatDate(order.createdAt)}
                  </td>
                  <td className='py-2 px-4 text-gray-900 sm:py-4'>
                    {order.shippingAddress?.city && order.shippingAddress?.country
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className='py-2 px-4 text-gray-900 sm:py-4'>
                    ₹{order.totalPrice?.toLocaleString() || 0}
                  </td>
                  <td className='py-2 px-4 text-gray-900 sm:py-4 sm:text-sm'>
                    <span 
                      className={`${
                        order.isPaid || order.paymentStatus === 'paid' 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      } text-white px-2 py-1 rounded text-xs`}
                    >
                      {order.isPaid || order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 px-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyOrder
