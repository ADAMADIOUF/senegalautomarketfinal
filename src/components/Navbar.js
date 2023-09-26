import React, { useState } from 'react'
import { MdMenu } from 'react-icons/md'
import {
  FaRegHeart,
  FaRegPaperPlane,
  FaUserCircle,
  FaUser,
  FaCar,
  FaMapMarkedAlt,
  FaPersonBooth,
  FaUserPlus,
  FaUserMinus,
} from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { GiTicket } from 'react-icons/gi'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { IoIosMail } from 'react-icons/io'
import { IoLogOutSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useUserContext } from '../user_context'

const Navbar = () => {
const { myUser, loginWithRedirect, logout } = useUserContext()  
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }


  return (
    <nav className='navbar'>
      <div className='logo'>
        <Link to='/'>
          <img src={logo} alt='' className='logo' />
        </Link>
      </div>
      <div className='menu-icon' onClick={toggleMenu}>
        <MdMenu />
      </div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li>
          <Link to='/seller' onClick={closeMenu}>
            <FaCar /> Vente de Voiture
          </Link>
        </li>
        <li>
          <Link to='/location' onClick={closeMenu}>
            <FaCar /> Location de Voiture
          </Link>
        </li>

        <li>
          <Link to='/howitswork' onClick={closeMenu}>
            <HiOutlineInformationCircle /> Comment fonctionne SenegalAutoMarket
          </Link>
        </li>

        <li>
          <Link to='/contact' onClick={closeMenu}>
            <IoIosMail /> Contact
          </Link>
        </li>
        <li>
          <Link to='/travel' onClick={closeMenu}>
            <FaMapMarkedAlt /> Récit de Voyage
          </Link>
        </li>
        {myUser && (
          <li>
            <Link to={`/favorite`} onClick={closeMenu}>
              Favorite{' '}
            </Link>
          </li>
     
        )}
        {myUser ? (
          <li>
            <button
              type='button'
              className='auth-btn'
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              logout <FaUserMinus />
            </button>
          </li>
        ) : (
          <li>
            <button
              type='button'
              className='auth-btn'
              onClick={loginWithRedirect}
            >
              login <FaUserPlus />
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
 