import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";


export const fetchProductsByFilters=createAsyncThunk(
    "products/fetchByFilters",
    async({
        collection,
        size,
        color,
        gender,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit,
    })=>{
        const query=new URLSearchParams();
        if (collection) query.append("collection",collection);
        if (size) query.append("size",size);
        if (color) query.append("color",color);
        if (gender) query.append("gender",gender);
        if (minPrice) query.append("minPrice",minPrice);
        if (maxPrice) query.append("maxPrice",maxPrice);
        if (sortBy) query.append("sortBy",sortBy);
        if (search) query.append("search",search);
        if (category) query.append("category",category);
        if (material) query.append("material",material);
        if (brand) query.append("brand",brand);
        if (limit) query.append("limit",limit);

        const response=await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
        )
        return response.data
        
    }
)


export const fetchProductDetails=createAsyncThunk("products/fetchProductDetails",
    async(id,{rejectWithValue})=>{
        try {
            const response =await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
            );
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch product details")
        }
    }
)

export const updateProducts=createAsyncThunk("products/updateProducts",
    async({id,productData})=>{
        const response =await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            productData,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return response.data
    }
)


export const fetchSimilarProducts=createAsyncThunk("products/fetchSimilarProducts",
    async({id,limit})=>{
        const queryParams = limit ? `?limit=${limit}` : '';
        const response =await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}${queryParams}`
        );
        return response.data
    }
)

export const productsSlice=createSlice({
    name:"products",
    initialState:{
        products:[],
        selectedProducts:null,
        similarProducts:[],
        loading:false,
        error:null,
        filters:{
            collection:"",
            size:"",
            color:"",
            gender:"",
            minPrice:"",
            maxPrice:"",
            sortBy:"",
            search:"",
            category:"",
            material:"",
            brand:"",
        }
    },
    reducers:{
    setFilters:(state,action)=>{
        state.filters={...state.filters,...action.payload}
    },
    clearFilters:(state)=>{
        state.filters={
            collection:"",
            size:"",
            color:"",
            gender:"",
            minPrice:"",
            maxPrice:"",
            sortBy:"",
            search:"",
            category:"",
            material:"",
            brand:"",
            }
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProductsByFilters.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProductsByFilters.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=Array.isArray(action.payload)?action.payload:[]
        })
        .addCase(fetchProductsByFilters.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })



        .addCase(fetchProductDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.selectedProducts=action.payload
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })



        .addCase(updateProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateProducts.fulfilled,(state,action)=>{
            state.loading=false;
            const updatedProduct=action.payload;
            const index=state.products.findIndex(
                (product)=>product._id===updatedProduct._id
            )
            if (index!==-1) {
                state.products[index]=updatedProduct
            }
        })
        .addCase(updateProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })



        .addCase(fetchSimilarProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchSimilarProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.similarProducts=action.payload
        })
        .addCase(fetchSimilarProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export const {setFilters,clearFilters}=productsSlice.actions
export default productsSlice.reducer