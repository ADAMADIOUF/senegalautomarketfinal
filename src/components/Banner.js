import React from 'react'
import b from "../assets/newbanner2.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
const Banner = () => {
  AOS.init({
    duration: 800, 
    easing: 'ease-in-out', 
    once: true, 
  })
  return (
    <div className='banner banner-top'>
      <img src={b} alt='' className='banner-img' />
      <div className='banner-first-details'> 
      <h2 data-aos='fade-up' class='aos-animate'>
          SénégalAutoMarket : Votre Guichet Unique pour l'Automobile
        </h2>
      </div>
      <div className="banner-first-info">
        
      </div>
    </div>
  )
}

export default Banner