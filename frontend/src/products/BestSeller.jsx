import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useCart } from '../context/CartContext';




const BestSeller = ({productId}) => {
  const {id}=useParams()

  const [mainImage,setMainImage]=useState(null);
  const[selectSize,setSelectSize]=useState("");
  const[selectColor,setSelectColor]=useState("");
  const[quantity,setQuantity]=useState(1);
  const[isButtonDisabled,setIsButtonDisabled]=useState(false);
  const { addToCart } = useCart();

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
    const productImage = mainImage || selectProduct.image?.[0]?.url || "";
    const productId = selectProduct._id ?? selectProduct.name.toLowerCase();

    addToCart({
      productId,
      name: selectProduct.name,
      price: selectProduct.price,
      image: productImage,
      size: selectSize,
      color: selectColor,
      quantity,
    });

    setTimeout(()=>{
      toast.success("Product added to cart",{
        duration:1000,
      })
      setIsButtonDisabled(false)
      setQuantity(1)
    },500)
  }
  
  
  
  useEffect(()=>{
    if(selectProduct?.image?.length>0){
      setMainImage(selectProduct.image[0].url)
    }
  },[selectProduct])

  

  return (
    <div className='p-6'>
      <div className='max-w-6xl mx-auto bg-white p-8 rounded=lg'>
        <div className='flex flex-col md:flex-row'>
          <div className='hidden md:flex flex-col space-y-4 mr-6'>
              {selectProduct.image.map((image,index)=>(
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
                <img src={mainImage} alt="Main Product"
                className='w-full h-auto object-cover rounded-lg'/>

              </div>
          </div>
          <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4'>
            {selectProduct.image.map((image,index)=>(
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
            <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectProduct.name}</h1>
            <p className='text-gray-600 mb-3'>{selectProduct.description}</p>
            <p className='text-lg text-gray-600 font-semibold mb-1 line-through '>${selectProduct.originalPrice && `${selectProduct.originalPrice}`}</p>
            <p className='text-xl text-gray-500 font-semibold mb-2'>${selectProduct.price}</p>
            <div className='mb-3'>
            <p className='text-gray-700'>Color:</p>
              <div className='flex gap-2 mt-2'>
                {selectProduct.colors.map((color)=>(
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
                {selectProduct.sizes.map((size)=>(
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
        
    </div>
  )
}

export default BestSeller