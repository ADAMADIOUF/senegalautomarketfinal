import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProductsAsync } from '../slices/productsApiSlice'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { useDispatch, useSelector } from 'react-redux'
import MapCar from '../components/MapCar'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Loading from '../components/Loading'
import Error from '../components/Error'

const CarLocation = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.data)
  const status = useSelector((state) => state.products.status)
  const error = useSelector((state) => state.products.error)
  const loading = useSelector((state) => state.products.loading)
const [errorMessage, setErrorMessage] = useState('')
const [showMessage, setShowMessage] = useState(false)
const [showMessageDate, setShowMessageDate] = useState(false)

const [message, setMessage] = useState('')
const [formFilled, setFormFilled] = useState(false)
const [startDate, setStartDate] = useState(null)
const [endDate, setEndDate] = useState(null)


const handleFormSubmit = (e) => {
  e.preventDefault()
  if (startDate && endDate) {
    setFormFilled(true)
    setShowMessageDate(true) // Show the message when form is submitted
    setTimeout(() => {
      setShowMessageDate(false) // Hide the message after 5 seconds
    }, 5000)
  }
}

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync())
    }
  }, [status, dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
  // Check if products is defined before filtering
  if (!products) {
    return <div>No products found.</div>
  }

  // Filter products based on the 'location' checkbox field
  const locationProducts = products.filter((product) => product.location)

  if (locationProducts.length === 0) {
    return <div>No location-based products found.</div>
  }
  return (
    <div className='details-page section-center'>
      <div className='booking-form-car'>
        <form onSubmit={handleFormSubmit} className='form-container-car'>
          <div>
            <label htmlFor='startDate'>Date de début :</label>
            <DatePicker
              id='startDate'
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div>
            <label htmlFor='endDate'>Date de fin :</label>
            <DatePicker
              id='endDate'
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <button type='submit' className='btn-car'>
            Choisir la date
          </button>
        </form>
      </div>
      <h2 className='seller-car-title'>Location de voiture</h2>
      {showMessageDate && <p className='message'>Date choisie avec succès !</p>}

      {showMessage && <p className='message'>{message}</p>}
      <div className='details-products'>
        {locationProducts.map((product) => (
          <div key={product.id} className='product-card'>
            <Link
              to={
                formFilled
                  ? {
                      pathname: `/details/${product.id}`,
                      search: `?startDate=${encodeURIComponent(
                        startDate.toISOString()
                      )}&endDate=${encodeURIComponent(endDate.toISOString())}`,
                    }
                  : null
              }
              onClick={(e) => {
                if (!formFilled) {
                  e.preventDefault()
                  setErrorMessage("Veuillez d'abord remplir le formulaire.")
                }
              }}
            >
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

export default CarLocation
