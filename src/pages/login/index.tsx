import React from 'react'
import LoginPage from '../../components/pages/LoginPage'
import { GetServerSideProps, NextPage } from 'next'
import { getCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'

interface Props {}

const Login: NextPage<Props> = () => {
  return <LoginPage />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const accessToken = getCookie(authConfig.tokenKeyName, ctx)

  if (accessToken) {
    return {
      redirect: {
        destination: '/masterCabinet',
        permanent: true,
      },
    }
  }

  return { props: {} }
}
export default Login
