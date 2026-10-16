import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [
    {
      id: 1,
      name: 'Everyday notebook',
      detail: 'Recycled paper, cloth-bound',
      price: 18,
      image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=85',
      color: 'sage',
    },
    {
      id: 2,
      name: 'Sunday ceramic cup',
      detail: 'Hand-thrown stoneware',
      price: 32,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85',
      color: 'clay',
    },
    {
      id: 3,
      name: 'Market carryall',
      detail: 'Heavy cotton, made to last',
      price: 26,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85',
      color: 'blue',
    },
    {
      id: 4,
      name: 'Desk-side candle',
      detail: 'Cedarwood and bergamot',
      price: 24,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85',
      color: 'pink',
    },
  ],
  cart: [],
}

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cart.find((item) => item.productId === action.payload)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cart.push({ productId: action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.productId !== action.payload)
    },
  },
})

export const { addToCart, removeFromCart } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer