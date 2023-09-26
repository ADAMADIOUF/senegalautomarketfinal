// store.js
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsApiSlice'
import singleProductReducer from './slices/productsApiSlice' // Assuming you have a separate reducer for single products
import favoritesReducer from './slices/favoritesSlice'
const store = configureStore({
  reducer: {
    products: productsReducer,
    singleProduct: singleProductReducer, // Include the single product reducer here
    favorites: favoritesReducer,
  },
})

export default store
