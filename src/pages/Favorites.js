import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductsAsync } from '../slices/productsApiSlice'
import { removeFavorite } from '../slices/favoritesSlice'
import { FaHeart } from 'react-icons/fa'
import a from '../assets/fauto.png'
import { Link } from 'react-router-dom'
const Favorites = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.data)
  const status = useSelector((state) => state.products.status)
  const error = useSelector((state) => state.products.error)
  const loading = useSelector((state) => state.products.loading)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync())
    }
  }, [status, dispatch])

  const [selectedProduct, setSelectedProduct] = useState(null)
const favoriteProductIds = useSelector((state) => state.favorites)
  const handleRemoveFavorite = () => {
    if (selectedProduct) {
      dispatch(removeFavorite(selectedProduct.id))
      setSelectedProduct(null)
    }
  }
 
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: Failed to fetch products</div>
  }

  const favoriteProducts = products.filter((product) =>
    favoriteProductIds.includes(product.id)
  )

  const openRemoveConfirmation = (product) => {
    setSelectedProduct(product)
  }

  const closeRemoveConfirmation = () => {
    setSelectedProduct(null)
  }

  return (
    <div className='section-center favorites'>
      
      {favoriteProducts.length === 0 ? (
        <div className='favorite-message'>
          <img src={a} alt='' className='favorite-img' />
          <p>No favorite products yet.</p>
        </div>
      ) : (
        <div className='favorites-list'>
          {favoriteProducts.map((product) => (
            <Link to={`/details/${product.id}`}>
              <div key={product.id} className='favorite-product'>
                <FaHeart
                  className='heart-icon'
                  onClick={(e) => {
                    e.preventDefault()
                    openRemoveConfirmation(product)
                  }}
                />
                <img src={product.img[0]} alt={product.model} />
                <p>{product.model}</p>
                <p>{product.price} CFA/jour</p>
              </div>
            </Link>
          ))}
        </div>
      )}

   
      {selectedProduct && (
        <div className='popup'>
          <div className='popup-content'>
            <p>Remove {selectedProduct.model} from Favorites?</p>
            <button onClick={handleRemoveFavorite}className='btn'>Remove</button>
            <button onClick={closeRemoveConfirmation} className='btn'>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Favorites
