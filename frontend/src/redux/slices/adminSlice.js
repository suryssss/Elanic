import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


export const fetchUsers=createAsyncThunk("admin/fetchUsers",async()=>{
        const response=await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        })
        return response.data
})


export const addUser=createAsyncThunk("admin/addUser",async(userData,{rejectWithValue})=>{
    try{
    const response=await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        userData,
        {
        headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return response.data
    }
    catch(error){
        return rejectWithValue(error.response.data)
    }
})


export const updateUser=createAsyncThunk("admin/updateUser",async({id,name,email,role})=>{
    const response=await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        {name,email,role},
        {
        headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return response.data
})

export const deleteUser=createAsyncThunk("admin/deleteUser",async(id)=>{
    await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        {
        headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return id
})

const adminSlice=createSlice({
    name:"admin",
    initialState:{
        users:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.users=action.payload
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            const updatedUser=action.payload;
            const userIdx=state.users.findIndex(user=>user._id===updatedUser._id);
            if(userIdx!==-1){
                state.users[userIdx]=updatedUser;
            }
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.users=state.users.filter(user=>user._id!==action.payload)
        })
        .addCase(addUser.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.loading=false
            state.users.push(action.payload.user)
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})

export default adminSlice.reducer
