import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProductsAsync } from '../slices/productsApiSlice'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { useDispatch, useSelector } from 'react-redux'
import MapCar from '../components/MapCar'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { addFavorite, removeFavorite } from '../slices/favoritesSlice'
import { AiTwotoneHeart } from 'react-icons/ai'

const Tesla = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const favoriteProductIds = useSelector((state) => state.favorites)
  const [favoriteMessage, setFavoriteMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const toggleFavorite = (productId) => {
    if (favoriteProductIds.includes(productId)) {
      dispatch(removeFavorite(productId))
      setFavoriteMessage('Retiré de vos favoris')
    } else {
      dispatch(addFavorite(productId))
      setFavoriteMessage('Enregistré dans vos favoris')
    }

    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
      setFavoriteMessage('')
    }, 5000)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }
  const productBmw = products.filter((product) => product.tesla)
  return (
    <div className='details-page section-center'>
      {showMessage && <p className='message'>{favoriteMessage}</p>}
      <div className='details-products'>
        {productBmw.map((product) => (
          <div key={product.id} className='product-card'>
            <Link to={`/seller/${product.id}`}>
              <h3>{product.name}</h3>
              <Slider {...sliderSettings}>
                {product.img.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt=''
                    className='product-image'
                  />
                ))}
              </Slider>
            </Link>
            <div className='details-heart'>
              <h3>{product.price} CFA</h3>
              <button
                onClick={(e) => {
                  e.preventDefault() // Prevent link navigation
                  toggleFavorite(product.id)
                }}
                className={`favorite-button ${
                  favoriteProductIds.includes(product.id)
                    ? 'favorited-heart'
                    : 'unfavorited-heart'
                }`}
              >
                <AiTwotoneHeart />
              </button>
              <MapCar
                latitude={product.latitude}
                longitude={product.longitude}
                productId={product.id} // Pass the productId as a prop
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tesla
