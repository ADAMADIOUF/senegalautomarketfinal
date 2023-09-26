import React, { useEffect } from 'react'

const MapCar = ({ latitude, longitude, productId }) => {
  useEffect(() => {
    // Generate a unique map ID for each product based on its ID
    const mapId = `map-${productId}`

    // Initialize the map for each product
    const map = new window.google.maps.Map(document.getElementById(mapId), {
      center: { lat: latitude, lng: longitude },
      zoom: 10, // Adjust the zoom level as needed
    })

    // Create a marker for the location
    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
    })
  }, [latitude, longitude, productId])

  // Use a unique map ID for each product
  return (
    <div
      id={`map-${productId}`}
      style={{ width: '100%', height: '300px' }}
    ></div>
  )
}

export default MapCar
