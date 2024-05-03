import React, { FC } from 'react'
import LoginPage from '../../components/pages/LoginPage'
import useAuthStore from 'src/store/authStore'
import { getStoreEvent } from 'src/store/utils'

const Login: FC = () => {
  return <LoginPage />
}

export default Login
