import { configureStore } from '@reduxjs/toolkit'
import productivityReducer from './productivitySlice.js'

export const store = configureStore({
  reducer: {
    productivity: productivityReducer,
  },
})