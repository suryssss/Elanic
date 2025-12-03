import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authslice"

const store=configureStore({
    reducer:{
        auth: authReducer,
    },
})

export default store