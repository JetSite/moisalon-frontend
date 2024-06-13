import { useState, useEffect, FC, MouseEvent } from 'react'
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
import { getRating } from 'src/utils/newUtils/getRating'
import { IBrand } from 'src/types/brands'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { RATE_BRAND } from 'src/api/graphql/brand/mutations/rateBrand'

interface Props {
  brand: IBrand
  isOwner: boolean
}

const Title: FC<Props> = ({ brand, isOwner }) => {
  const [isFavorite, setIsFavorit] = useState<boolean>(false)
  const { me } = useAuthStore(getStoreData)
  const [newRating, setNewRating] = useState<number>(0)
  const { rating, ratingCount } = getRating(brand.ratings, newRating)
  const isRateBefore = brand.ratings.find(e => e.user.id === me?.info.id)
  const socials: { [K: string]: string } = {}
  brand.socialNetworks.forEach(e => {
    socials[e.title] = e.link
  })
  const [rateBrand, { loading }] = useMutation(RATE_BRAND)

  const addFavorite = (e: MouseEvent<HTMLDivElement>, brand: IBrand) => {
    e.preventDefault()
    e.stopPropagation()
    // setIsFavorit(!isFavorite)
  }

  const handleChangeRating = (num: number) => {
    if (loading || isOwner || isRateBefore) {
      console.log(isOwner || !!isRateBefore)
      return
    }
    setNewRating(num)
    rateBrand({
      variables: {
        user: me?.info.id,
        value: num,
        brand: brand.id,
      },
    })
  }

  return (
    <>
      <ContentLeft>
        <TitleBlock>
          <BrandName>{brand.name}</BrandName>
          <Notification>
            <Favorite
              isFavorite={isFavorite}
              onClick={e => addFavorite(e, brand)}
            />
            <Bell />
          </Notification>
        </TitleBlock>
        <CountryName>{brand.country?.name}</CountryName>
        <Rating>
          <RatingEdit
            handleChangeRating={handleChangeRating}
            newRating={newRating}
            rating={rating}
          />
          <Count>{`${rating}(${ratingCount})`}</Count>
        </Rating>
      </ContentLeft>
      <ContentRight>
        <Socials>
          <noindex>
            {socials?.Facebook ? (
              <SocialFb
                href={socials.Facebook}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null}
            {socials?.Instagram ? (
              <SocialInst
                href={socials.Instagram}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null}
            {socials?.YouTube ? (
              <SocialYou
                href={socials.YouTube}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null}
            {socials?.vKontakte ? (
              <SocialVk
                href={socials.vKontakte}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null}
            {socials?.Odnoklassniki ? (
              <SocialOk
                href={socials.Odnoklassniki}
                target="_blank"
                rel="noreferrer nofollow"
              />
            ) : null}
          </noindex>
        </Socials>
        <BrandWeb href={`mailto:${brand.email}`}>{brand.email}</BrandWeb>
      </ContentRight>
    </>
  )
}

export default Title
