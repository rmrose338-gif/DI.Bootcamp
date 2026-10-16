import { createSelector } from '@reduxjs/toolkit'

const selectShoppingCart = (state) => state.shoppingCart
const selectCartEntries = (state) => state.shoppingCart.cart

export const selectProducts = createSelector(
  [selectShoppingCart],
  (shoppingCart) => shoppingCart.products,
)

export const selectCartItems = createSelector(
  [selectProducts, selectCartEntries],
  (products, cartEntries) => cartEntries
    .map((entry) => {
      const product = products.find((item) => item.id === entry.productId)
      return product ? { ...product, quantity: entry.quantity } : null
    })
    .filter(Boolean),
)

export const calculateTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
)