import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { useUserContext } from '../user_context'
const PrivateRoute = () => {
  const { myUser } = useUserContext()
  return myUser ? <Outlet /> : <Navigate to='/' replace />
}

export default PrivateRoute
