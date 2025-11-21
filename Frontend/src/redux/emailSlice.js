import { createSlice } from '@reduxjs/toolkit'

const emailSlice = createSlice({
  name:'verificationEmail',
  initialState:{
    verificationEmail:null
  },
  reducers:{
    setVerificationEmail: (state, action) => {
      state.verificationEmail = action.payload
    }
  }
})

export const {setVerificationEmail} = emailSlice.actions
export default emailSlice.reducer;