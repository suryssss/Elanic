import React from 'react'

const checkout={
  _id:"12323",
  createdAt:new Date(),
  checkoutItems:[
    {
      productID:"1",
      name:"jacket",
      color:"blue",
      size:"M",
      price:200,
      quantity:2,
      images:"https://picsum.photos/500/500?random=4",
    },
        {
      productID:"2",
      name:"shirt",
      color:"black",
      size:"S",
      price:100,
      quantity:1,
      images:"https://picsum.photos/500/500?random=5",
    },
  ],
  shippingAddress:{
    address:"123 Main St",
    city:"New York",
    country:"USA",
  },
}

const OrderConfirmation = () => {

  const CalculateEstimatedDelivary=(createdAt)=>{
    const orderDate=new Date(createdAt)
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
                Order Date: {checkout.createdAt.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className='text-emerald-700 text-sm'>
                Estimated Delivary:{" "} {CalculateEstimatedDelivary(checkout.createdAt)}
              </p>
            </div>
          </div>

            <div className='mb-20'>
                {checkout.checkoutItems.map((items)=>(
                  <div key={items.productID} className='flex items-center mb-4'>
                      <img src={items.images} alt={items.name} className='w-16 h-16 object-cover
                      rounded-md mr-4'/>
                      <div>
                          <h4 className='text-md font-semibold'>{items.name}</h4>
                          <p className='text-gray-500 text-sm'>{items.color} | {items.size}</p>
                      </div>
                      <div className='ml-auto text-right'>
                        <p className='text-md'>${items.price}</p>
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