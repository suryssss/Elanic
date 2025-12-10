import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router";

const FilterOption = () => {
  const [search, setSearch] = useSearchParams();
  const navigate=useNavigate()
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    brand: [],
    minPrice: 0,
    maxPrice: 5000,
    rating: "",
  });

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const categories = ["Top Wear", "Bottom Wear", "Footwear", "Accessories"];
  const genders = ["Men", "Women"];
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
    "White",
    "Grey",
    "Pink",
    "Orange",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const brands = ["Nike", "Adidas", "Puma", "Reebok"];

  useEffect(() => {
    const params = Object.fromEntries([...search]);
    setFilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice ? Number(params.minPrice) : 0,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : 5000,
      rating: params.rating || "",
    });
    setPriceRange([0, params.maxPrice || 5000]);
  }, [search]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filter };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilter(newFilters);
    updateUrl(newFilters);
  };

  const updateUrl=(newFilters)=>{
    const params=new URLSearchParams(search)
    Object.keys(newFilters).forEach((key)=>{
      const value = newFilters[key]
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(","))
        } else {
          params.delete(key)
        }
      } else if (value !== "" && value !== null && value !== undefined) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    setSearch(params)
    navigate(`?${params.toString()}`)
  }

  const handlePriceChange=(e)=>{
     const newPrice=e.target.value
     setPriceRange([0,newPrice])
     const newFilters={...filter,minPrice:0,maxPrice:newPrice}
     setFilter(newFilters)
     updateUrl(newFilters)
  }

  return (
    <div className="p-4">
      <h3 className="text-xl text-gray-800 font-semibold mb-4">Filter</h3>
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filter.category===category}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender}>
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filter.gender===gender}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border-gray-300 cursor-pointer 
            transition hover:scale-105 ${filter.color===color ? "ring-2 ring-blue-500":""}`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filter.size.includes(size)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brands</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filter.brand.includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">Price</label>
        <input
          type="range"
          name="price"
          min={0}
          max={500}
          onChange={handlePriceChange}
          value={priceRange[1]}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Rating</label>
        <div className="flex flex-wrap items-center gap-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                onChange={handleFilterChange}
                checked={Number(filter.rating) === rating}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{rating}★</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterOption;
