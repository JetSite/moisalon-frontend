import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import {
  ContentLeft,
  ContentRight,
  BrandName,
  Notification,
  TitleBlock,
  Favorite,
  Bell,
  Socials,
  SocialVk,
  SocialYou,
  CountryName,
  BrandWeb,
  Rating,
  SocialOk,
  Count,
  LogoBlock,
  Photo,
} from './styled'
import RatingEdit from '../../../../ui/RatingEdit/index.tsx'
import {
  favoritesInStorage,
  inStorage,
} from '../../../../../utils/favoritesInStorage'
import { createScopesBrand } from '../../../../../_graphql-legacy/brand/createScopesBrand'
import { PHOTO_URL } from '../../../../../api/variables'
import { red } from '../../../../../styles/variables'
import HeartFullFill from '../../../MainPage/components/Header/icons/HeartFullFill'

const Title = ({
  name,
  name,
  socialUrl,
  brandUrl,
  brand,
  scoreBrandCount,
  loadingScore,
  me,
  refetchBrand,
  refetchScore,
}) => {
  const [isFavorite, setIsFavorit] = useState(false)

  useEffect(() => {
    const isInStorage = inStorage('brands', brand)
    setIsFavorit(!!isInStorage)
  }, [])

  const addFavorite = (e, brand) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('brands', brand)
    setIsFavorit(!isFavorite)
  }

  const [createScore] = useMutation(createScopesBrand, {
    onCompleted: () => {
      refetchBrand()
      refetchScore()
    },
  })

  const handleChangeRating = num => {
    if (scoreBrandCount || loadingScore) return
    createScore({
      variables: {
        value: num,
        brandId: brand.id,
      },
    })
  }

  const imageUrl = brand?.logo?.url ? `${PHOTO_URL}${brand.logo.url}` : ''

  return (
    <>
      <ContentLeft>
        <TitleBlock>
          <BrandName>{name}</BrandName>
          <Notification>
            <Favorite
              isFavorite={isFavorite}
              onClick={e => addFavorite(e, brand)}
            >
              <HeartFullFill fill={isFavorite} />
            </Favorite>
            <Bell />
          </Notification>
        </TitleBlock>
        <CountryName>{name}</CountryName>
        <Rating>
          <RatingEdit
            handleChangeRating={handleChangeRating}
            userValue={scoreBrandCount || 0}
            count={Math.round(brand?.averageScore)}
            me={me}
          />
          <Count>{Math.round(brand?.numberScore) || 0}</Count>
        </Rating>
      </ContentLeft>
      <ContentRight>
        <LogoBlock>
          <Photo>
            <img src={imageUrl} alt="Logo" />
          </Photo>
        </LogoBlock>
        <Socials>
          <noindex>
            {socialUrl?.youTube ? (
              <SocialYou
                href={socialUrl.youTube}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null}
            {socialUrl?.vKontakte ? (
              <SocialVk
                href={socialUrl.vKontakte}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null}
            {socialUrl?.odnoklassniki ? (
              <SocialOk
                href={socialUrl.odnoklassniki}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null}
          </noindex>
        </Socials>
        <BrandWeb href={`mailto:${brandUrl}`}>{brandUrl}</BrandWeb>
      </ContentRight>
    </>
  )
}

export default Title
