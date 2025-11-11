import React from 'react'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import Paypal from './Paypal'
import { useCart } from '../../context/CartContext'

const Checkout = () => {

  const navigate=useNavigate()
  const [checkoutId,setCheckoutId]=useState(null)
  const { cartItems, subtotal, clearCart } = useCart()
  const totalAmount = subtotal
  const [shippingAddress,setShippingAddress]=useState({
    firstname:"",
    lastname:"",
    address:"",
    city:"",
    postalcode:"",
    country:"",
    phone:"",
  })

const handleCreateCheckout=async(e)=>{
  e.preventDefault()
  if(cartItems.length===0){
    return
  }
  setCheckoutId(123)
}

const handlePaymentSuccess=(details)=>{
  console.log("Payment Successful",details)
  clearCart()
  navigate("/order-confirmation")
}

const handlePaymentError=(error)=>{
  console.log("Payment Failed",error)
}


  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
      <div className='bg-white rounded-lg p-6 '>
        <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className='text-lg mb-4 '>Contact Details</h3>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input type='email' 
            value="user@example.com" 
            className='w-full p-2 border rounded'
            disabled/>
          </div>
          <h3 className='text-lg mb-4'>Delivary</h3>
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>First Name</label>
              <input
                type='text'
                value={shippingAddress.firstname}
                onChange={(e)=>setShippingAddress({
                  ...shippingAddress,
                  firstname:e.target.value,
                })
              }
              className='w-full p-2 border rounded'
              required
              />
            </div>
            <div>
              <label className='block text-gray-700'>Last Name</label>
              <input
                type='text'
                value={shippingAddress.lastname}
                onChange={(e)=>setShippingAddress({
                  ...shippingAddress,
                  lastname:e.target.value,
                })
              }
              className='w-full p-2 border rounded'
              required
              />
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Address</label>
            <input type='text'
            value={shippingAddress.address}
            onChange={(e)=>setShippingAddress({
              ...shippingAddress,
              address:e.target.value,
            })
          }
            className='w-full p-2 border rounded'
            required/>
          </div>
          <div className='mb-4 grid grid-cols-2 gap-4 '>
          <div>
              <label className='block text-gray-700'>City</label>
              <input
                type='text'
                value={shippingAddress.city}
                onChange={(e)=>setShippingAddress({
                  ...shippingAddress,
                  city:e.target.value,
                })
              }
              className='w-full p-2 border rounded'
              required
              />
            </div>
            <div>
              <label className='block text-gray-700'>Postal Code</label>
              <input
                type='text'
                value={shippingAddress.postalcode}
                onChange={(e)=>setShippingAddress({
                  ...shippingAddress,
                  postalcode:e.target.value,
                })
              }
              className='w-full p-2 border rounded'
              required
              />
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Country</label>
            <input type='text'
            value={shippingAddress.country}
            onChange={(e)=>setShippingAddress({
              ...shippingAddress,
              country:e.target.value,
            })
          }
            className='w-full p-2 border rounded'
            required/>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Phone Number</label>
            <input type='text'
            value={shippingAddress.phone}
            onChange={(e)=>setShippingAddress({
              ...shippingAddress,
              phone:e.target.value,
            })
          }
            className='w-full p-2 border rounded'
            required/>
          </div>
          <div className='mt-6'>
            {!checkoutId?(
              <button type='submit' className='w-full bg-black text-white py-3 rounded disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed' disabled={cartItems.length===0}>Continue to payment</button>
            ):(<div>
              <h3 className='text-lg m-4'>Pay with Paypal</h3>
                  <Paypal amount={totalAmount} onSuccess={handlePaymentSuccess} 
                  onError={handlePaymentError}/>
            </div>)}
          </div>
        </form>
      </div>
      <div className='bg-gray-50 p-6 rounded-lg'>
        <h3 className='text-lg mb-4'>Order Summary</h3>
        <div className='border-t border-gray-300 py-4 mb-4'>
              {cartItems.length===0 ? (
                <p className='text-gray-500 text-sm'>Your cart is empty.</p>
              ):(
                cartItems.map((product)=>(
                  <div key={product.lineId} className='flex items-start justify-between py-2 border-b border-gray-300'>
                    <div className='flex items-start'>
                      <img src={product.image} alt={product.name} className='w-20 h-24 object-cover'/>
                      <div className='ml-4'>
                        <h3 className='text-md'>{product.name}</h3>
                        <p className=' text-gray-500'>Size: {product.size}</p>
                        <p className=' text-gray-600'>Color: {product.color}</p>
                        <p className=' text-gray-600'>Qty: {product.quantity}</p>
                      </div>
                    </div>
                    <p className='text-xl'>₹{(product.price * product.quantity)?.toLocaleString()}</p>
                  </div>
                ))
              )}
        </div>
        <div className='flex justify-between items-center text-lg mb-4'>
          <p>Subtotal</p>
          <p>₹{totalAmount?.toLocaleString()}</p>
        </div>
        <div className='flex justify-between items-center text-lg mb-4'>
          <p>Shipping</p>
          <p>Free</p> 
        </div>
        <div className='flex justify-between items-center text-lg mt-4 border-t border-gray-300 pt-4'>
          <p>Total</p>
          <p>₹{totalAmount?.toLocaleString()}</p> 
        </div>
      </div>
    </div>
  )
}

export default Checkout