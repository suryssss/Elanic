import React, { useState } from "react";
import { HiXMark, HiOutlineTrash } from "react-icons/hi2";
import { HiMinus } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi2";

const CartScroller = ({ isOpen, toggleCart }) => {
  // Sample cart items data
  const [cartItems, setCartItems] = useState([]);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">Your Cart ({cartItems.length})</h2>
        <button
          onClick={toggleCart}
          className="p-1 rounded-full hover:bg-gray-200 transition-all duration-200"
          aria-label="Close cart"
        >
          <HiXMark className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Items Section */}
      <div className="flex flex-col h-[calc(100%-180px)] overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="mb-4 p-6 bg-gray-100 rounded-full">
              <HiOutlineTrash className="h-10 w-10" />
            </div>
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm mt-1">Start shopping to add items!</p>
          </div>
        ) : (
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 pb-5 border-b border-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <HiOutlineTrash className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.color} | Size: {item.size}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <HiMinus className="h-5 w-5" />
                      </button>
                      <span className="px-2 w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <HiPlus className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-5 shadow-lg">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
        <button 
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            cartItems.length === 0 
              ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
              : "bg-black text-white hover:bg-gray-800"
          }`}
          disabled={cartItems.length === 0}
        >
          {cartItems.length === 0 ? "Cart is Empty" : "Proceed to Checkout"}
        </button>
        <button 
          onClick={toggleCart}
          className="w-full mt-3 text-gray-700 hover:text-black transition-colors font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartScroller;