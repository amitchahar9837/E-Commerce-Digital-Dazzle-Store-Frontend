import { createSlice } from '@reduxjs/toolkit'


const initialState = 0;

export const userCartItemCountSlice = createSlice({
  name: 'item count',
  initialState,
  reducers: {
    setCartItem:(state,action)=>{
        return action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCartItem } = userCartItemCountSlice.actions

export default userCartItemCountSlice.reducer