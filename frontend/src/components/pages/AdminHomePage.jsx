import React from "react";
import { Link } from "react-router";

const AdminHomePage = () => {
  const order = [
    {
      _id: 1234,
      user: {
        name: "Rithwik",
      },
      totalPrice: 100,
      status: "pending",
    },
    {
      _id: 1234,
      user: {
        name: "Rithwik",
      },
      totalPrice: 100,
      status: "pending",
    },
    {
      _id: 1234,
      user: {
        name: "Rithwik",
      },
      totalPrice: 100,
      status: "pending",
    },
    {
      _id: 1234,
      user: {
        name: "Rithwik",
      },
      totalPrice: 100,
      status: "pending",
    },
    {
      _id: 1234,
      user: {
        name: "Rithwik",
      },
      totalPrice: 100,
      status: "pending",
    },
    {
      _id: 1234,
      user: {
        name: "Rithwik",
      },
      totalPrice: 100,
      status: "pending",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-gray-900">$10000</p>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-gray-900">25</p>
          <Link
            to="/admin/orders"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Manage Orders
          </Link>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-gray-900">100</p>
          <Link
            to="/admin/products"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Manage Products
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full  text-left border-collapse border border-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-4 py-2 border border-gray-700">Order ID</th>
                <th className="px-4 py-2 border border-gray-700">User</th>
                <th className="px-4 py-2 border border-gray-700">Total Price</th>
                <th className="px-4 py-2 border border-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {order.length>0 ?(
                order.map((order)=>(
                  <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                    <td className="px-4 py-2 border border-gray-700">{order._id}</td>
                    <td className="px-4 py-2 border border-gray-700">{order.user.name}</td>
                    <td className="px-4 py-2 border border-gray-700">${order.totalPrice}</td>
                    <td className="px-4 py-2 border border-gray-700">{order.status}</td>
                  </tr>
                ))
              ):(
                <tr>
                  <td colSpan={4} className="px-4 py-2 border border-gray-700 text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
