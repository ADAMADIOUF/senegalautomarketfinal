import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'

const Auth0ProviderWithHistory = ({ children }) => {
  return (
    <Auth0Provider
      domain='Z30v3kJd30UCzvYkaM22Q7iz6H93bkrD'
      clientId='Z30v3kJd30UCzvYkaM22Q7iz6H93bkrD'
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory
