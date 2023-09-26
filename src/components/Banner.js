import React, { useEffect } from 'react'
import b from "../assets/newbanner2.png"
import AOS from 'aos'
import 'aos/dist/aos.css'
const Banner = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 1000,
      delay: 50,
      easing: 'ease-in-out',
    })
  }, [])
  return (
    <div className='banner banner-top'>
      <img src={b} alt='' className='banner-img' />
      <div className='banner-first-details'>
        <h2 data-aos='fade-right'>
          Bienvenue chez SenegalAutoMarket, votre destination de confiance pour
          l'achat, la vente et la location de voitures exceptionnelles.
        </h2>
        <h2 data-aos='fade-up' className='banner-hide'>
          {' '}
          Que vous recherchiez une voiture pour vos déplacements quotidiens, une
          voiture de sport pour une expérience de conduite exaltante ou un
          véhicule utilitaire pour répondre à vos besoins pratiques, nous sommes
          là pour vous servir.
        </h2>
      </div>
      <div className='banner-info-relative'>
        <div className='banner-first-info'>
          <h3> 30+ Villes de services</h3>
          <h3> 100+ types de voitures </h3>
          <h3> 5000+ clients satisfaits </h3>
        </div>
      </div>
    </div>
  )
}

export default Banner