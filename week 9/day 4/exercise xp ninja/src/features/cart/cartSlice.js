import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    changeQuantity: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload.id)
      if (!item) return

      item.quantity += action.payload.amount
      if (item.quantity <= 0) {
        state.items = state.items.filter((entry) => entry.id !== action.payload.id)
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions
export const selectCartCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartSubtotal = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
export default cartSlice.reducer