import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Home from './components/Home'

import HowItsWork from './components/HowItsWork'

import Toyota from './components/Toyata'

import Contact from './components/Contact'
import ReciteDeVoyage from './components/ReciteDeVoyage'
import PrintempsTardifSurLaRouteSeaToSky from './components/PrintempsTardifSurLaRouteSeaToSky'
import Jeep from './components/Jeep'
import Tesla from './components/Tesla'
import Subaru from './components/Subaru'
import Porsche from './components/Porsche'
import Bmw from './components/Bmw'
import Nissan from './components/Nissan'
import Lamborghini from './components/Lamborghini'
import Ford from './components/Ford'
import store from './store'
import { Provider } from 'react-redux'
import CarSeller from './pages/CarSeller'

import SingleCarSeller from './pages/SingleCarSeller'
import CarLocation from './pages/CarLocation'
import SingleDetail from './pages/SingleDetail'
import DetailsPage from './components/DetailsPage'
import Auth0ProviderWithHistory from './pages/Auth0ProviderWithHistory'
import { Auth0Provider } from '@auth0/auth0-react'
import { UserProvider } from './user_context'
import Favorites from './pages/Favorites'
import PrivateRoute from './pages/PrivateRoute'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/howitswork' element={<HowItsWork />} />
      <Route path='/contact' element={<Contact />} />

      <Route path='/toyota' element={<Toyota />} />

      <Route path='/jeep' element={<Jeep />} />
      <Route path='/tesla' element={<Tesla />} />
      <Route path='/subaru' element={<Subaru />} />
      <Route path='/porsche' element={<Porsche />} />
      <Route path='/bmw' element={<Bmw />} />
      <Route path='/nissan' element={<Nissan />} />
      <Route path='/lamborghini' element={<Lamborghini />} />
      <Route path='/ford' element={<Ford />} />

      <Route path='/travel' element={<ReciteDeVoyage />} />
      <Route path='/weather' element={<PrintempsTardifSurLaRouteSeaToSky />} />
      <Route path='/details' element={<DetailsPage />} />
      <Route path='/seller' element={<CarSeller />} />
      <Route path='/location' element={<CarLocation />} />
      <Route path='/seller/:id' element={<SingleCarSeller />} />
      <Route path='/details/:id' element={<SingleDetail />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/favorite' element={<Favorites />} />
        
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
 <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <UserProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
 </UserProvider>
 </Auth0Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
