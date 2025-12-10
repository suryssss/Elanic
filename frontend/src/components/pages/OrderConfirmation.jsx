import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { clearCart } from '../../redux/slices/cartSlice'

const OrderConfirmation = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {checkout}=useSelector((state)=>state.checkout)

  useEffect(()=>{
    if(checkout && checkout._id){
      dispatch(clearCart())
      localStorage.removeItem("cart")
    }else{
      navigate("/my-order")
    }
  },[checkout,dispatch,navigate])

  const formatDate = (dateValue) => {
    if (!dateValue) return 'N/A'
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue
    if (isNaN(date.getTime())) return 'N/A'
    return date.toLocaleDateString()
  }

  const CalculateEstimatedDelivary=(createdAt)=>{
    if (!createdAt) return 'N/A'
    const orderDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt
    if (isNaN(orderDate.getTime())) return 'N/A'
    orderDate.setDate(orderDate.getDate()+7)
    return orderDate.toLocaleDateString()
  }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
      <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
        Thank You for Your Order!
      </h1>
      {checkout &&(
        <div className='p-6 rounded-lg border'>
          <div className='flex justify-between mb-20'>
            <div>
              <h2 className='text-xl font-semibold'>
                Order ID: {checkout._id}
              </h2>
              <p className='text-gray-500'>
                Order Date: {formatDate(checkout.createdAt)}
              </p>
            </div>
            <div>
              <p className='text-emerald-700 text-sm'>
                Estimated Delivary:{" "} {CalculateEstimatedDelivary(checkout.createdAt)}
              </p>
            </div>
          </div>

            <div className='mb-20'>
                {(checkout.checkoutItems || checkout.orderItems || []).map((items, index)=>(
                  <div key={items.productId || items.productID || index} className='flex items-center mb-4'>
                      <img src={items.image || items.images} alt={items.name} className='w-16 h-16 object-cover
                      rounded-md mr-4'/>
                      <div>
                          <h4 className='text-md font-semibold'>{items.name}</h4>
                          <p className='text-gray-500 text-sm'>{items.color || ''} | {items.size || ''}</p>
                      </div>
                      <div className='ml-auto text-right'>
                        <p className='text-md'>₹{items.price}</p>
                        <p className='text-sm text-gray-500'>Qty:{items.quantity}</p>
                      </div>
                  </div>
                ))}
            </div>
            <div className='grid grid-cols-2 gap-8'>
              <div>
              <h4 className='text-lg font-semibold mb-2'>Payment</h4>
              <p className='text-gray-600'>PayPal</p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Delivary</h4>
              <p className='text-gray-600'>{checkout.shippingAddress.address}</p>
              <p className='text-gray-600'>{checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
            </div>
        </div>
      )}

    </div>
  )
}

export default OrderConfirmation