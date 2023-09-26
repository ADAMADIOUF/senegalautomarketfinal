// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, fetchSingleProduct } from './apiSlice'
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const data = await fetchProducts()
    return data
  }
)

export const fetchSingleProductAsync = createAsyncThunk(
  'products/fetchSingleProduct',
  async (id) => {
    const data = await fetchSingleProduct(id)
    return data
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    loading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        console.log('Pending action dispatched')
        state.status = 'loading'
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default productsSlice.reducer
