import React, { useEffect, useState } from 'react'
import ScrollProgressBar from 'react-scroll-progress-bar'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import { useParams, useLocation } from 'react-router-dom'
import WhatsAppWidget from '../components/WhatsApp'
import 'react-whatsapp-widget/dist/index.css'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'

import {
  FaCalendar,
  FaMoneyBill,
  FaCar,
  FaWhatsapp,
  FaExclamationCircle,
  FaInfoCircle,
  FaPhoneAlt,
  FaTachometerAlt,
  FaCog,
  FaGasPump,
  FaExchangeAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleProductAsync } from '../slices/productsApiSlice'
import Loading from '../components/Loading'
import Error from '../components/Error'
import MapCar from '../components/MapCar'
import singleDetails from '../dataNotations'

const SingleDetail = () => {
  const { id: productId } = useParams()
  const [loaded, setLoaded] = useState(false)

  const [showWhatsAppWidget, setShowWhatsAppWidget] = useState(false)
  const dispatch = useDispatch()
  const product = useSelector((state) =>
    state.products.data.find((p) => p.id === productId)
  )
  const status = useSelector((state) => state.products.status)
  const error = useSelector((state) => state.products.error)
  const loading = useSelector((state) => state.products.loading)

  useEffect(() => {
    console.log('Component mounted or productId changed')
    if (status === 'idle' || product?._id !== productId) {
      console.log('Dispatching fetchSingleProductAsync action')
      dispatch(fetchSingleProductAsync(productId))
        .then(() => {
          console.log('Data successfully fetched')
          // Set loaded to true when data is successfully fetched
          setLoaded(true)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
          // Handle any error here if needed
        })
    }
  }, [status, dispatch, productId, product])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const city = searchParams.get('city')
  const startDate = new Date(searchParams.get('startDate'))
  const endDate = new Date(searchParams.get('endDate'))

  const frenchLocaleOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }

const handleAddToCart = () => {
  const message = `Je veux acheter ${product.make} ${product.model} ${
    product.price
  } CFA/jour/${startDate.toLocaleDateString(
    'fr-FR',
    frenchLocaleOptions
  )}/${endDate.toLocaleDateString('fr-FR', frenchLocaleOptions)}`
  const url = `https://wa.me/+221777730967?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}
  if (!loaded) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  if (!product) {
    return <h1>Produit Non Trouvé</h1>
  }



  return (
    <div className='single-detail'>
      <AwesomeSlider className='custom-slider'>
        {product.img.map((imageUrl, index) => (
          <div key={index}>
            <img
              src={imageUrl}
              alt={` ${index + 1}`}
              className='slider-image'
            />
          </div>
        ))}
      </AwesomeSlider>
      <div className='single-detail-container'>
        <article>
          <h2>
            {product.make ? (
              <h2>
                {product.make} {product.model}
              </h2>
            ) : null}
         
          </h2>
          <p className='single-des'>
            <FaInfoCircle className='icon' /> Description : {product.desc}
          </p>
          <p>
            <FaMoneyBill className='icon' /> Prix par jour : {product.price}{' '}
            CFA/jour
          </p>

          <h3>Informations supplémentaires :</h3>
          <p>
            <FaMapMarkerAlt className='icon' /> Ville : {product.city}
          </p>
          <p>
            <FaExclamationCircle className='icon' /> Année : {product.year}
          </p>
          <p>
            <FaCar className='icon' /> Couleur : {product.color}
          </p>
          <p>
            <FaExchangeAlt className='icon' /> Transmission :{' '}
            {product.transmission}
          </p>
          <p>
            <FaGasPump className='icon' /> Type de carburant :{' '}
            {product.fuelType}
          </p>
          <p>
            <FaCog className='icon' /> Moteur : {product.engine}
          </p>
          <p>
            <FaTachometerAlt className='icon' /> Kilométrage : {product.mileage}
          </p>
          <p>
            <FaCar className='icon' /> Ville : {product.city}
          </p>
          <p>
            <FaCalendar className='icon' /> Date de début :{' '}
            {startDate.toLocaleDateString('fr-FR', frenchLocaleOptions)}
          </p>
          <p>
            <FaCalendar className='icon' /> Date de fin :{' '}
            {endDate.toLocaleDateString('fr-FR', frenchLocaleOptions)}
          </p>
        </article>

        <article>
          <div>
            <h3>Informations de réservation :</h3>
            <p>
              Date de début :{' '}
              {startDate.toLocaleDateString('fr-FR', frenchLocaleOptions)}
            </p>
            <p>
              Date de fin :{' '}
              {endDate.toLocaleDateString('fr-FR', frenchLocaleOptions)}
            </p>
            <p>{city}</p>
            <p>{product.price} CFA /jour</p>
            <div className='owner'>
              <div>
                <h3>Informations du propriétaire :</h3>
                <p>Nom : {product.ownerName}</p>
                <p>
                  <FaPhoneAlt className='icon' /> Numéro de téléphone :{' '}
                  {product.ownerNumber}
                </p>
                <img src={product.ownerImage} alt={product.ownerName} />
              </div>
            </div>
            <button className='btn btn-commander' onClick={handleAddToCart}>
              <FaWhatsapp className='icon' /> Commander
            </button>
            {showWhatsAppWidget && (
              <WhatsAppWidget
                phoneNumber='+221777730967'
                message={`Je veux acheter ${startDate.toLocaleDateString(
                  'fr-FR',
                  frenchLocaleOptions
                )}/${endDate.toLocaleDateString(
                  'fr-FR',
                  frenchLocaleOptions
                )}/${product.model}/${product.price} CFA/jour`}
              />
            )}
          </div>
        </article>
      </div>
      <div className='rating'>
        <h2>Évaluations</h2>

        {singleDetails.ratings.map((rating, index) => (
          <div key={index} className='individual-rating'>
            <p className='rating-category'>{rating.category}</p>
            <div className='rating-bar'>
              <CircularProgressbar
                value={(rating.valeur / 5) * 100}
                text={rating.valeur.toFixed(1)}
                styles={{
                  path: {
                    stroke: '#ff8000',
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <MapCar
        latitude={product.latitude}
        longitude={product.longitude}
        productId={product.id} // Pass the productId as a prop
      />
    </div>
  )
}

export default SingleDetail
