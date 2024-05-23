import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails:(state,action)=>{
        state.user = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions

export default userSlice.reducer