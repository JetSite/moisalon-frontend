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

const CtalogPage = () => {
  const { me, city } = useAuthStore(getStoreData)

  return (
    <MainLayout me={me}>
      <Wrapper>
        <Wrap>
          <Link href={`/${cyrToTranslit(city)}/beautyFreeShop`}>
            <Button variant="red">B2B магазин</Button>
          </Link>
        </Wrap>
        <Link href={`/${cyrToTranslit(city)}/beautyFreeShop`}>
          <Button variant="red">B2C магазин</Button>
        </Link>
      </Wrapper>
    </MainLayout>
  )
}

export default CtalogPage
