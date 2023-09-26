import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiTwotoneHeart } from 'react-icons/ai'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync } from '../slices/productsApiSlice'
import Loading from './Loading'
import Error from './Error'
import MapCar from './MapCar'
import { addFavorite, removeFavorite } from '../slices/favoritesSlice'

const DetailsPage = () => {
  // État et envoi de l'action Redux
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.data)
  const status = useSelector((state) => state.products.status)
  const error = useSelector((state) => state.products.error)
  const loading = useSelector((state) => state.products.loading)
const favoriteProductIds = useSelector((state) => state.favorites)
const [favoriteMessage, setFavoriteMessage] = useState('')
const [showMessage, setShowMessage] = useState(false)

  // Récupérer les produits si le statut est 'idle'
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync())
    }
  }, [status, dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const location = useLocation()
  const bookingData = location.state

  if (!bookingData) {
    return (
      <div className='details-page'>
        Erreur : Aucune donnée de réservation disponible
      </div>
    )
  }

  const { city, startDate, endDate } = bookingData


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

  const filteredProducts = products.filter(
    (product) => product.city.toLowerCase() === city.toLowerCase()
  )

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div className='details-page section-center'>
      {showMessage && <p className='message'>{favoriteMessage}</p>}
      <h2 className='details-header'>Page de détails</h2>
      <p className='details-info'>Ville : {city}</p>
      <p className='details-info'>
        Date de début : {new Date(startDate).toLocaleDateString('fr-FR')}
      </p>
      <p className='details-info'>
        Date de fin : {new Date(endDate).toLocaleDateString('fr-FR')}
      </p>
      {filteredProducts.length === 0 ? (
        <div>
          <p className='details-info'>
            Aucune voiture trouvée pour la ville sélectionnée
          </p>
        </div>
      ) : (
        <div className='details-products'>
          {filteredProducts
            .filter((product) => product.category !== 'sell')
            .map((product) => (
              <div key={product.id} className='product-card'>
                <Link
                  to={`/details/${
                    product.id
                  }?city=${city}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`}
                >
                  <h3>{product.model}</h3>
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
                  <div className='details-heart'>
                    <h3>{product.price} CFA/jour</h3>
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
                  </div>
                </Link>
              </div>
            ))}
        </div>
      )}
      {filteredProducts.length > 0 && (
        <MapCar
          latitude={filteredProducts[0].latitude}
          longitude={filteredProducts[0].longitude}
          productId={filteredProducts[0].id}
        />
      )}
    </div>
  )
}

export default DetailsPage
