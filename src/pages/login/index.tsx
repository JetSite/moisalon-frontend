import React, { Fragment } from 'react'
import LoginPage from '../../components/pages/LoginPage'
import { GetServerSideProps, NextPage } from 'next'
import { getCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'

const Login: NextPage = () => {
  return (
    <Fragment>
      <LoginPage />
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cityCookie = getCookie('city', ctx)
  const token = getCookie('token', ctx)

  if (token) {
    return {
      redirect: {
        destination: cityCookie
          ? `/${cityCookie}`
          : authConfig.defaultValues.city.slug,
        permanent: false,
      },
    }
  }

  return {
    props: {
      meta: {
        title: 'Вход в личный кабинет | MOI salon',
        description:
          'Войдите в личный кабинет MOI salon, чтобы управлять своим профилем и получить доступ к дополнительным возможностям',
        image: '/brands-page-bg.jpg',
        url: 'https://moi.salon/login',
      },
    },
  }
}

export default Login
