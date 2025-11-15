import React, { useState } from 'react'

const EditProduct = () => {

    const  [productData,setProductData]=useState({
        name:"",
        description:"",
        price:0,
        countInStock:0,
        sku:"",
        category:"",
        brand:"",
        size:[],
        color:[],
        collections:"",
        material:"",
        gender:"",
        images:[
            {
                url:"https://picsum.photos/500/500?random=4"
            },
            {
                url:"https://picsum.photos/500/500?random=8"
            },

        ]
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setProductData((prevData)=>({...prevData,[name]:value}))
    }

    const handleImage=async(e)=>{
        const file=e.target.files[0]
        console.log(file)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(productData)
    }
    
return (
  <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl">
    <h2 className="text-3xl font-bold mb-8 text-gray-800">Edit Product</h2>

    <form className="space-y-8" onSubmit={handleSubmit}>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700">Stock Count</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
        <label className="block font-semibold mb-3 text-gray-700">Description</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
      </div>

      {/* Sizes & Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Sizes (comma separated)</label>
          <input
            type="text"
            name="sizes"
            value={productData.size.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                size: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700">Colors (comma separated)</label>
          <input
            type="text"
            name="colors"
            value={productData.color.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                color: e.target.value.split(",").map((c) => c.trim()),
              })
            }
            className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Upload & Preview */}
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
        <label className="block font-semibold mb-3 text-gray-700">Upload Image</label>

        <input
          type="file"
          onChange={handleImage}
          className="block w-full text-gray-600 bg-white p-2 border rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <div className="flex gap-4 mt-5 flex-wrap">
          {productData.images.map((image, index) => (
            <div
              key={index}
              className="w-24 h-24 rounded-lg overflow-hidden border hover:scale-105 transition-transform shadow"
            >
              <img
                src={image.url}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-md"
      >
        Update Product
      </button>
    </form>
  </div>
);
}
export default EditProduct