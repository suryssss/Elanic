import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import {
  fetchProductDetails,
  updateProducts,
} from "../../redux/slices/productSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProducts, loading, error } = useSelector(
    (state) => state.products
  );

  // Local editable state
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    countInStock: "",
    sku: "",
    description: "",
    size: [],
    color: [],
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  // Fetch product
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  // Fill form when product loaded
  useEffect(() => {
    if (selectedProducts) {
      setProductData(selectedProducts);
    }
  }, [selectedProducts]);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload image handler
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, altText: "" }],
      }));

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Submit update
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProducts({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Edit Product</h2>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Product Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg border">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
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
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
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
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="p-6 bg-gray-50 rounded-lg border">
          <label className="block font-semibold mb-3 text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Sizes and Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg border">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Sizes (comma separated)
            </label>
            <input
              type="text"
              value={productData.size.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  size: e.target.value.split(",").map((i) => i.trim()),
                })
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Colors (comma separated)
            </label>
            <input
              type="text"
              value={productData.color.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  color: e.target.value.split(",").map((c) => c.trim()),
                })
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="p-6 bg-gray-50 rounded-lg border">
          <label className="block font-semibold mb-3 text-gray-700">
            Upload Image
          </label>

          <input
            type="file"
            onChange={handleImage}
            className="block w-full text-gray-600 p-2 border rounded-lg"
          />
          {uploading && <p>Uploading image...</p>}
          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images?.map((img, idx) => (
              <div key={idx} className="w-24 h-24 border rounded-lg overflow-hidden">
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
