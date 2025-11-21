import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './emailSlice.js'
import userReducer from "./userSlice.js"

const store = configureStore({
  reducer:{
    verificationEmail:emailReducer,
    user:userReducer
  }
})

export default store;