// apiCalls.js
import { PRODUCTS_URL, SINGLE_PRODUCT_URL } from '../constants'

export const fetchProducts = async () => {
  try {
    const response = await fetch(PRODUCTS_URL)
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export const fetchSingleProduct = async (id) => {
  try {
    const response = await fetch(`${SINGLE_PRODUCT_URL}${id}`)
    const data = await response.json()
    console.log('Fetched product data:', data) // Add this line
    return data
  } catch (error) {
    throw error
  }
}
