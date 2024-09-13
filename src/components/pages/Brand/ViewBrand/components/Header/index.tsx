import { FC, useEffect, useState } from 'react'
import { MainContainer } from '../../../../../../styles/common'
import BackButton from '../../../../../ui/BackButton'
import {
  Wrapper,
  Photo,
  IContainer,
  LogoBlock,
  EditButton,
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
import { cyrToTranslit } from '../../../../../../utils/translit'
import { PHOTO_URL } from '../../../../../../api/variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IBrand } from 'src/types/brands'
import {
  Logo,
  SkeletonCircle,
} from 'src/components/pages/Salon/ViewSalon/components/Header/styled'
import { getRating } from 'src/utils/newUtils/getRating'

interface Props {
  brand: IBrand
  isOwner: boolean
}

const Header: FC<Props> = ({ brand, isOwner }) => {
  const router = useRouter()
  const [toggleTerms, setToggleTerms] = useState(false)
  const [myPrice, setMyPrice] = useState<string | null>(
    brand?.minimalOrderPrice?.toString() || null,
  )

  useEffect(() => {
    setMyPrice(brand?.minimalOrderPrice?.toLocaleString() || null)
  }, [])

  const logo = brand.logo?.url ? (
    <Logo background={`url(${PHOTO_URL}${brand.logo?.url})`} />
  ) : (
    <SkeletonCircle />
  )

  return (
    <>
      <MainContainer>
        <Wrapper>
          <BackButton
            type="Бренд"
            name={brand?.name}
            link={
              isOwner
                ? '/brandCabinet'
                : brand?.city?.slug
                ? `/${brand?.city?.slug}/brand`
                : `/moskva/brand`
            }
          />
        </Wrapper>
        <Wrapper>
          <LogoBlock>
            <Photo>{logo}</Photo>
            {isOwner ? (
              <EditButton
                shallow
                href={{
                  pathname: '/createBrand',
                  query: { id: brand?.id },
                }}
              >
                Редактировать профиль
              </EditButton>
            ) : null}
          </LogoBlock>
          <IContainer>
            <Title isOwner={isOwner} brand={brand} />
          </IContainer>
          {myPrice ? (
            <MinimalSumm>
              <MinimalSummTitle>Минимальная сумма заказа</MinimalSummTitle>
              <MinimalSummText>от {myPrice} ₽</MinimalSummText>
            </MinimalSumm>
          ) : null}
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
                <Terms>{brand?.termsDeliveryPrice}</Terms>
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
