import React from "react";
import { Link, useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: { city: "Hyderabad", country: "India" },
      orderItems: [
        {
          productId: "1",
          name: "Jeans",
          price: 100,
          quantity: 1,
          image: "https://picsum.photos/500/500?random=1",
        },
        {
          productId: "2",
          name: "Jeans",
          price: 200,
          quantity: 2,
          image: "https://picsum.photos/500/500?random=6",
        },
      ],
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">OrderDetails</h2>
      {!orderDetails ? (
        <p>No Order Details Found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order Id:#{orderDetails._id}
              </h3>
              <p className="text-gray-700">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700 "
                    : "bg-red-100 text-red-700 "
                } px-2 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Paid" : "Not Paid"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700 "
                    : "bg-yellow-100 text-yellow-700 "
                } px-2 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Delivered" : "Pending Delivary"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method:{orderDetails.paymentMethod}</p>
              <p>Status:{orderDetails.isPaid ? "Paid" : "Not Paid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method:{orderDetails.shippingMethod}</p>
              <p>
                Address:{" "}
                {`${orderDetails.shippingAddress.city},${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Unit Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>

              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td className="py-2 px-4 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>

                    <td className="py-2 px-4">${item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/my-orders" className="text-blue-500 hover:underline">Back to Orders</Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
