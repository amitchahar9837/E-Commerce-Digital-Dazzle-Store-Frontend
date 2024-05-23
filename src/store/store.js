import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import userCartItemCount from './slices/userCartItemCount'

export const store = configureStore({
  reducer: {
    user:userSlice,
    cartItemCount:userCartItemCount,
  },
})