import React, { FC } from 'react'
import LoginPage from '../../components/pages/LoginPage'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from 'src/types/common'
import { OptionsType } from 'cookies-next/lib/types'
import { initializeApollo } from 'src/api/apollo-client'
import { getCities } from 'src/api/graphql/city/getCities'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ICity } from 'src/types'
import { getCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'

interface Props {}

const Login: NextPage<Props> = ({}) => {
  return <LoginPage />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const accessToken = getCookie(authConfig.tokenKeyName, ctx)
  const apolloClient = initializeApollo({ accessToken })

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
