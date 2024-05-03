import styled from 'styled-components'
import Link from 'next/link'
import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import Button from '../../components/ui/Button'
import { cyrToTranslit } from '../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
`

const Wrap = styled.div`
  margin-bottom: 50px;
`

const CartPage = () => {
  const { me } = useAuthStore(getStoreData)

  return (
    <MainLayout me={me}>
      <Wrapper>
        <Wrap>
          <Link href={`/cartB2b`}>
            <Button variant="red">B2B корзина</Button>
          </Link>
        </Wrap>
        <Link href="/cartB2c">
          <Button variant="red">B2C корзина</Button>
        </Link>
      </Wrapper>
    </MainLayout>
  )
}

export default CartPage
