import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverURL } from "../main";

// create a thunk(middleware that can handle a async operation and dispatch results accordingly)
export const fetchUserData = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    const { data } = await axios.get(`${serverURL}/api/user/current`, {
      withCredentials: true,
    });
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.loading = false
      state.error = null
    },
    clearError(state) {
      state.error = null;
    },
    setUser(state,action){
      state.user = action.payload
      state.loading = false;
      state.error = null
    }
  },
  extraReducers: (builders) => {
    builders
      .addCase(fetchUserData.pending, (state) => {
        (state.loading = true), (state.user = null);
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const { logout, clearError, setUser } = userSlice.actions;
export default userSlice.reducer;
