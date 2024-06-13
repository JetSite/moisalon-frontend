import Link from 'next/link'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'
import BrandItem from '../../../../blocks/BrandCard/index.tsx'
import { cyrToTranslit } from '../../../../../utils/translit'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const Wrapper = styled.div`
  background: #f8f8f8;
  padding: 64px 0;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 20px 0;
  }
`

const Content = styled.div`
  max-width: 1440px;
  padding: 0 140px;
  margin: 0 auto;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

const BrandsContent = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    overflow-x: auto;
    column-gap: 20px;
  }
`

const Title = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 27px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 24px;
  }
`

const Brands = ({ brandSearchData }) => {
  const { city } = useAuthStore(getStoreData)
  return (
    <Wrapper>
      <Content>
        <Title>Популярные бренды</Title>
        <BrandsContent>
          {brandSearchData?.brandsSearch?.connection?.nodes
            .slice(0, 6)
            .map(item => (
              <Link
                key={item.id}
                href={{
                  pathname: `/${city.slug}/beautyFreeShop`,
                  query: {
                    id: item.id,
                    title: item.name,
                    type: 'brand',
                  },
                }}
              >
                <div style={{ cursor: 'pointer' }}>
                  <BrandItem item={item} />
                </div>
              </Link>
            ))}
        </BrandsContent>
      </Content>
    </Wrapper>
  )
}

export default Brands
