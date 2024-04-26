import React from 'react'
import LoginPage from '../../components/pages/LoginPage'
import useAuthStore from 'src/store/authStore'
import { getStoreEvent } from 'src/store/utils'

const Login = () => {
  const { setMe } = useAuthStore(getStoreEvent)

  return <LoginPage setMe={setMe} />
}

export default Login
