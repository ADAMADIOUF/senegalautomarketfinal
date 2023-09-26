import React, { useEffect, useState } from 'react'
import a from "../assets/login.png"

import { FaUser, FaMapMarkedAlt, FaPhone, FaShoppingBag } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const Contact = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  const [nom, setNom] = useState('')
  const [adresse, setAdresse] = useState('')
  const [telephone, setTelephone] = useState('')
  const [produit, setProduit] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)


  return (
    <div className='section-center contact'>
      <h2>Contactez-nous pour plus d'informations</h2>
      <div className='contact-container'>
        <article>
          <form className='contact-form'>
            <div className='form-group'>
              <label htmlFor='nom'>
                <FaUser className='form-icon' /> Nom :
              </label>
              <input
                type='text'
                id='nom'
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='adresse'>
                <FaMapMarkedAlt className='form-icon' /> Adresse :
              </label>
              <input
                type='text'
                id='adresse'
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='telephone'>
                <FaPhone className='form-icon' /> Téléphone :
              </label>
              <input
                type='tel'
                id='telephone'
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='produit'>
                <FaShoppingBag className='form-icon' /> Produit :
              </label>
              <input
                type='text'
                id='produit'
                value={produit}
                onChange={(e) => setProduit(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='btn-contact' >
              send
            </button>
            
           
          </form>
        </article>
        <article>
          <img src={a} alt="" />
        </article>
      </div>
    </div>
  )
}

export default Contact
