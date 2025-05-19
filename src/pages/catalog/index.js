import styled from 'styled-components'
import Link from 'next/link'
import React, { Fragment } from 'react'
import MainLayout from '../../layouts/MainLayout'
import Button from '../../components/ui/Button'
import { cyrToTranslit } from '../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import MainHead from '../MainHead'

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
    <Fragment>
      <MainHead 
        title="Каталог | MOI salon"
        description="Каталог товаров для индустрии красоты на платформе MOI salon"
        image="/stock1.png"
      />
      <MainLayout me={me}>
        <Wrapper>
          <Wrap>
            <Link href={`/${city.slug}/beautyFreeShop`}>
              <Button variant="red">B2B магазин</Button>
            </Link>
          </Wrap>
          <Link href={`/${city.slug}/beautyFreeShop`}>
            <Button variant="red">B2C магазин</Button>
          </Link>
        </Wrapper>
      </MainLayout>
    </Fragment>
  )
}

export default CtalogPage
