import { FC, useState } from 'react'
import { MainContainer } from '../../../../../styles/common'
import * as Styled from './styled'
import Title from '../Title'
import { useRouter } from 'next/router'
import { PHOTO_URL } from '../../../../../api/variables'
import { IBrand } from 'src/types/brands'
import { IUser } from 'src/types/me'

interface Props {
  brand: IBrand | null
  user: IUser
}

const Header: FC<Props> = ({
  brand,
  isOwner,
  scoreBrandCount,
  loadingScore,
  refetchBrand,
  refetchScore,
  user,
}) => {
  const router = useRouter()
  const [toggleTerms, setToggleTerms] = useState(false)

  const imageUrl = brand?.logo?.url ? `${PHOTO_URL}${brand.logo.url}` : ''

  return (
    <>
      <MainContainer>
        <Styled.Wrapper>
          <Styled.LogoBlock>
            <Styled.Photo>
              <img src={imageUrl} alt="Logo" />
            </Styled.Photo>
          </Styled.LogoBlock>
          <Styled.IContainer>
            <Title
              refetchBrand={refetchBrand}
              me={me}
              brandUrl={brand?.email}
              socialUrl={brand?.socialNetworks}
              name={brand?.country}
              name={brand?.name}
              brand={brand}
              refetchScore={refetchScore}
              scoreBrandCount={scoreBrandCount}
              loadingScore={loadingScore}
            />
          </Styled.IContainer>
          <Styled.MinimalSumm>
            <Styled.MinimalSummTitle>
              Минимальная сумма заказа
            </Styled.MinimalSummTitle>
            <Styled.MinimalSummText>
              от {Number(brand?.minimalOrderPrice)?.toLocaleString() || 0} ₽
            </Styled.MinimalSummText>
          </Styled.MinimalSumm>
          {brand?.termsDeliveryPrice ? (
            !toggleTerms ? (
              <Styled.WrapCharacter>
                <Styled.Character onClick={() => setToggleTerms(true)}>
                  Условия заказа
                </Styled.Character>
              </Styled.WrapCharacter>
            ) : (
              <Styled.WrapCharacter>
                <Styled.OpenCharacter onClick={() => setToggleTerms(false)}>
                  Условия заказа
                </Styled.OpenCharacter>
                <Styled.Terms>{brand?.termsDeliveryPrice}</Styled.Terms>
                <Styled.Terms
                  dangerouslySetInnerHTML={{
                    __html: brand?.termsDeliveryPrice,
                  }}
                />
              </Styled.WrapCharacter>
            )
          ) : null}
        </Styled.Wrapper>
      </MainContainer>
    </>
  )
}

export default Header
