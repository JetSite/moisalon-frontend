import React, { Fragment } from 'react'
import LoginPage from '../../components/pages/LoginPage'
import { GetServerSideProps, NextPage } from 'next'
import { getCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'
import MainHead from '../MainHead'

const Login: NextPage = () => {
  return (
    <Fragment>
      <MainHead
        title="Вход в личный кабинет | MOI salon"
        description="Войдите в личный кабинет MOI salon, чтобы управлять своим профилем и получить доступ к дополнительным возможностям"
        image="/brands-page-bg.jpg"
      />
      <LoginPage />
    </Fragment>
  )
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
