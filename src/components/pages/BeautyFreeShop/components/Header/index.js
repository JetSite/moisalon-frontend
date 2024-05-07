import { useState } from 'react'
import { MainContainer } from '../../../../../styles/common'
import {
  Wrapper,
  Photo,
  IContainer,
  LogoBlock,
  MinimalSumm,
  MinimalSummTitle,
  MinimalSummText,
  WrapCharacter,
  Character,
  OpenCharacter,
  Terms,
} from './styled'
import Title from '../Title'
import { useRouter } from 'next/router'
import { PHOTO_URL } from '../../../../../api/variables'

const Header = ({
  brand,
  isOwner,
  scoreBrandCount,
  loadingScore,
  me,
  refetchBrand,
  refetchScore,
}) => {
  const router = useRouter()
  const [toggleTerms, setToggleTerms] = useState(false)

  const imageUrl = brand?.brandLogo?.url
    ? `${PHOTO_URL}${brand.brandLogo.url}`
    : ''

  return (
    <>
      <MainContainer>
        <Wrapper>
          <LogoBlock>
            <Photo>
              <img src={imageUrl} alt="Logo" />
            </Photo>
          </LogoBlock>
          <IContainer>
            <Title
              refetchBrand={refetchBrand}
              me={me}
              brandUrl={brand?.email}
              socialUrl={brand?.socialNetworks}
              countryName={brand?.country}
              brandName={brand?.brandName}
              brand={brand}
              refetchScore={refetchScore}
              scoreBrandCount={scoreBrandCount}
              loadingScore={loadingScore}
            />
          </IContainer>
          <MinimalSumm>
            <MinimalSummTitle>Минимальная сумма заказа</MinimalSummTitle>
            <MinimalSummText>
              от {Number(brand?.minimalOrderPrice)?.toLocaleString() || 0} ₽
            </MinimalSummText>
          </MinimalSumm>
          {brand?.termsDeliveryPrice ? (
            !toggleTerms ? (
              <WrapCharacter>
                <Character onClick={() => setToggleTerms(true)}>
                  Условия заказа
                </Character>
              </WrapCharacter>
            ) : (
              <WrapCharacter>
                <OpenCharacter onClick={() => setToggleTerms(false)}>
                  Условия заказа
                </OpenCharacter>
                {/* <Terms>{brand?.termsDeliveryPrice}</Terms> */}
                <Terms
                  dangerouslySetInnerHTML={{
                    __html: brand?.termsDeliveryPrice,
                  }}
                />
              </WrapCharacter>
            )
          ) : null}
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default Header
