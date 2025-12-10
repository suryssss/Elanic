import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductSlice'

const ProductManage = () => {

    const dispatch=useDispatch()
    const {products,loading,error}=useSelector((state)=>state.adminProducts)

    useEffect(()=>{
        dispatch(fetchAdminProducts())
    },[dispatch])

    const handleDelete=(id)=>{
        if (window.confirm("Are you sure you want to delete the product?")){
            dispatch(deleteProduct(id))
        }
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error:{error}</p>

  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>Product Management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full text-full text-gray-500'>
                <thead className='bg-gray-100 text-xs text-left uppercase text-gray-700'>
                    <tr>
                        <th className='px-4 py-3'>Name</th>
                        <th className='px-4 py-3'>Price</th>
                        <th className='px-4 py-3'>SKU</th>
                        <th className='px-4 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {products.length>0?(
                    products.map((product)=>(
                        <tr key={product._id} className='hover:bg-gray-50 transition-colors duration-150'>
                            <td className='px-4 py-3 font-medium text-gray-900'>{product.name}</td>
                            <td className='px-4 py-3 text-gray-700'>{product.price}</td>
                            <td className='px-4 py-3 text-gray-700'>{product.sku}</td>
                            <td className='px-4 py-3'>
                                <Link to={`/admin/products/${product._id}/edit`}
                                className='bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600'>Edit</Link>
                                <button onClick={()=>handleDeleteProduct(product._id)}
                                className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>Delete</button>
                            </td>
                        </tr>
                    ))
                    ):(<tr><td colSpan={4} className='px-4 py-3 text-center'>No products found</td></tr>)}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductManage