import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


const userFromStorage=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null

const initalGuestId=localStorage.getItem("guestId") ||`guest_${new Date().getTime()}`;
localStorage.setItem("guestId",initalGuestId);

const initialState={
    user:userFromStorage,
    guestId:initalGuestId,
    loading:false,
    error:null
}

export const loginUser=createAsyncThunk("auth/login",async({email,password},{rejectWithValue})=>{
    try {
        const userData={email,password}
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`,userData)
        localStorage.setItem("userInfo",JSON.stringify(response.data.user));
        localStorage.setItem("userToken",response.data.token);
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})


export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name,email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        { name,email, password }
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);



const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout(state){
            state.user=null;
            state.guestId=`guest_${new Date().getTime()}`;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId",state.guestId)
        },
        generateNewGuestId:(state)=>{
            state.guestId=`guest_${new Date().getTime()}`;
            localStorage.setItem("guestId",state.guestId)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        .addCase(registerUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})


export const {logout,generateNewGuestId}=authSlice.actions
export default authSlice.reducer
