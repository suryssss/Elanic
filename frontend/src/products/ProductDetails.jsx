import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../redux/slices/productSlice';
import { useParams } from 'react-router';
import { addProductToCart } from '../redux/slices/cartSlice';





const ProductDetails = ({productId}) => {
  const {id}=useParams()
  const dispatch=useDispatch()
  const {selectedProducts:selectedProduct,loading,error,similarProducts}=useSelector((state)=>state.products)
  const {user,guestId}=useSelector((state)=>state.auth)
  const [mainImage,setMainImage]=useState(null);
  const[selectSize,setSelectSize]=useState("");
  const[selectColor,setSelectColor]=useState("");
  const[quantity,setQuantity]=useState(1);
  const[isButtonDisabled,setIsButtonDisabled]=useState(false);

  const productFetchId=productId || id;

  useEffect(()=>{
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId))
      dispatch(fetchSimilarProducts({id:productFetchId}))
    }
  },[dispatch,productFetchId])



  useEffect(() => {
    if (selectedProduct?.images?.[0]?.url) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange=(type)=>{
    if(type==="plus"){
      setQuantity(prev=>prev+1)
    }
    if(type==="minus" && quantity>1){
      setQuantity(prev=>prev-1)
    }
  }

  const handleAddToCart=()=>{
    if(!selectSize || !selectColor){
      toast.error("Please select size and color",{
        duration:1000,
      })
      return;
    }
    setIsButtonDisabled(true)
    const productImage = mainImage || selectedProduct.images?.[0]?.url || "";
    const productId = selectedProduct._id ?? selectedProduct.name.toLowerCase();


    dispatch(
      addProductToCart({
          productId:productId,
          quantity,
          size:selectSize,
          color:selectColor,
          guestId,
          userId:user?._id,
      })
    )
    .unwrap()
    .then(()=>{
      toast.success("Product added to cart!",{
        duration:1000,
      })
    })
    .finally(()=>{
      setIsButtonDisabled(false)
    })
  }
  
  
  if(loading){
    return <div className='p-6 text-center'><p className='text-gray-500'>Loading product details...</p></div>
  }

  if(error){
    return <div className='p-6 text-center'><p className='text-red-500'>Error: {error}</p></div>
  }

  if(!selectedProduct && !loading){
    return <div className='p-6 text-center'><p className='text-gray-500'>Product not found</p></div>
  }

  

  return (
    <div className='p-6'>
      {selectedProduct && (
      <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
        <div className='flex flex-col md:flex-row'>
          <div className='hidden md:flex flex-col space-y-4 mr-6'>
              {selectedProduct.images && selectedProduct.images.map((image,index)=>(
                <img 
                key={index} 
                src={image.url} 
                alt={image.altText || `Thumbnail ${index}`} 
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage===image.url ? "border-black" : "border-gray-300"}`}
                onClick={()=>setMainImage(image.url)}
                />
              ))}
          </div>
          <div className='md:w-1/2 '>
              <div className='mb-4'>
                {mainImage && <img src={mainImage} alt="Main Product"
                className='w-full h-auto object-cover rounded-lg'/>}

              </div>
          </div>
          <div className='md:hidden flex overflow-x-scroll space-x-4 mb-4'>
            {selectedProduct.images && selectedProduct.images.map((image,index)=>(
              <img 
              key={index} 
              src={image.url} 
              alt={image.altText || `Thumbnail ${index}`} 
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage===image.url ? "border-black" : "border-gray-300"}`}
              onClick={()=>setMainImage(image.url)}
              />
            ))}
          </div>
          <div className='md:w-1/2 md:ml-10 '>
            <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct.name}</h1>
            <p className='text-gray-600 mb-3'>{selectedProduct.description}</p>
            <p className='text-lg text-gray-600 font-semibold mb-1 line-through '>${selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}</p>
            <p className='text-xl text-gray-500 font-semibold mb-2'>${selectedProduct.price}</p>
            <div className='mb-3'>
            <p className='text-gray-700'>Color:</p>
              <div className='flex gap-2 mt-2'>
                {selectedProduct.colors.map((color)=>(
                  <button key={color} 
                    className={`w-8 h-8 rounded-full border cursor-pointer ${selectColor===color ? "border-4 border-black" : "border-gray-300"}`}
                  style={{backgroundColor:color.toLowerCase(),
                    filter:"brightness(0.5)"}}
                  onClick={()=>setSelectColor(color)}
                  />
                ))}

              </div>
            </div>
            <div className='mb-4'>
              <p className='text-gray-700'>Size:</p>
              <div className='flex gap-2 mt-2'>
                {selectedProduct.sizes.map((size)=>(
                  <button
                  key={size}
                  onClick={()=>setSelectSize(size)}
                  className={`px-4 py-2 font-bold rounded border hover:bg-gray-200 transition-colors cursor-pointer ${selectSize===size ? "bg-black text-white" : ""}`}
                  >{size}</button>
                ))}
              </div>
            </div>
            <div className='mb-1'>
              <p className='text-gray-700'>Quantity:</p>
              <div className='flex items-center space-x-4 mt-2'>
                <button 
                onClick={()=>handleQuantityChange("minus")}
                className='px-2 py-1 border rounded hover:bg-gray-200 transition-colors'>-</button>
                <span className='text-lg font-semibold'>{quantity}</span>
                <button onClick={()=>handleQuantityChange("plus")} className='px-2 py-1 border rounded hover:bg-gray-200 transition-colors'>+</button>
              </div>
            </div>
            <button 
            onClick={handleAddToCart}
            disabled={isButtonDisabled}
            className={`bg-black w-[400px] text-white px-6 py-3 mt-10 rounded-lg hover:bg-gray-600 transition-colors ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover-bg-gray-900"}`}
            >{isButtonDisabled ? "Adding to Cart..." : "Add to Cart"}
            </button>
          </div>
        </div>
        <div className='mt-20'>
          <h2 className='text-2xl text-center font-semibold mb-4'>You may also like</h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
      )}
        
    </div>
  )
}

export default ProductDetails