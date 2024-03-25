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
  SocialFb,
  SocialInst,
  Socials,
  SocialVk,
  SocialYou,
  CountryName,
  BrandWeb,
  Rating,
  SocialOk,
  Count,
} from './styled'
import RatingEdit from '../../../../../ui/RatingEdit'
import {
  favoritesInStorage,
  inStorage,
} from '../../../../../../utils/favoritesInStorage'
import { createScopesBrand } from '../../../../../../_graphql-legacy/brand/createScopesBrand'

const Title = ({
  brandName,
  countryName,
  socials,
  brandUrl,
  brand,
  // scoreBrandCount,
  // loadingScore,
  me,
  // refetchBrand,
  // refetchScore,
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

  return (
    <>
      <ContentLeft>
        <TitleBlock>
          <BrandName>{brandName}</BrandName>
          <Notification>
            <Favorite
              isFavorite={isFavorite}
              onClick={e => addFavorite(e, brand)}
            />
            <Bell />
          </Notification>
        </TitleBlock>
        <CountryName>{countryName}</CountryName>
        <Rating>
          <RatingEdit
            handleChangeRating={handleChangeRating}
            userValue={0}
            count={Math.round(brand?.averageScore)}
            me={me}
          />
          <Count>{Math.round(brand?.numberScore) || 0}</Count>
        </Rating>
      </ContentLeft>
      <ContentRight>
        <Socials>
          <noindex>
            {/* {socialUrl?.facebook ? (
              <SocialFb
                href={socialUrl.facebook}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null}
            {socialUrl?.instagram ? (
              <SocialInst
                href={socialUrl.instagram}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null} */}
            {socials?.youTube ? (
              <SocialYou
                href={socialUrl.youTube}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null}
            {socials?.vKontakte ? (
              <SocialVk
                href={socialUrl.vKontakte}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null}
            {socials?.odnoklassniki ? (
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
