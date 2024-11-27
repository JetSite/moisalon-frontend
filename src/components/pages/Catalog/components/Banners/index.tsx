import styled from 'styled-components'
import {
  tabletBreakpoint,
  laptopBreakpoint,
} from '../../../../../styles/variables'
import { PHOTO_URL } from 'src/api/variables'
import { FC } from 'react'
import { IBannerHook } from 'src/types/banners'
import Link from 'next/link'

const Wrapper = styled.div`
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px 45px 140px;
  gap: 24px;
  @media (max-width: ${tabletBreakpoint}) {
    flex-direction: column;
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 0px 20px;
    padding-bottom: 15px;
    flex-direction: column;
  }
`

const Big = styled(Link)`
  display: flex;
  justify-content: space-between;
  color: #000;
  width: 100%;
`

const WrapBig = styled.div<{ image: string }>`
  width: 70%;
  max-width: 785px;
  height: 275px;
  background: ${props => `url(${props.image}) no-repeat center`};
  background-size: cover;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding-left: 43px;
  padding-right: 90px;
  color: #000;
  padding-top: 30px;
  padding-bottom: 30px;
  overflow: hidden;
  transition: 0.3s;
  &:hover {
    box-shadow: 0px 0px 24px 1px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    height: 161px;
    padding-right: 24px;
    padding-left: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
    background-position: left;
  }
`

const WrapSmall = styled.div<{ image: string }>`
  width: 100%;
  height: 125px;
  color: #000;
  background: ${props => `url(${props.image}) no-repeat center`};
  background-size: cover;
  display: flex;
  padding: 15px;
  padding-right: 25px;
  justify-content: space-between;
  border-radius: 5px;
  overflow: hidden;
  transition: 0.3s;
  &:hover {
    box-shadow: 0px 0px 24px 1px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    background-position: left;
  }
`

const Small = styled(Link)`
  color: #000;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Right = styled.div`
  width: 30%;
  max-width: 357px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 785px;
    flex-direction: row;

    noindex {
      width: 49%;
    }
  }
`

const LeftBig = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`

const LeftSmall = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`

const RightBig = styled.div`
  max-width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 45%;
  }
`

const RightSmall = styled.div`
  max-width: 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 47%;
  }
`

const Title = styled.p`
  font-weight: 600;
  font-size: 24px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    text-transform: uppercase;
  }
`

const SubTitle = styled.p`
  font-size: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    text-transform: uppercase;
  }
`

const TitleSmall = styled.p`
  font-weight: 600;
  font-size: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    text-transform: uppercase;
  }
`

const LinkStyled = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  color: #ff0033;
  display: inline;
  text-decoration: underline;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 9px;
  }
`

const Image = styled.img`
  width: 100%;
  object-fit: contain;
  height: 100%;
`

interface Props {
  bannerLarge: IBannerHook | null
  bannerSmallLeft: IBannerHook | null
  bannerSmallRight: IBannerHook | null
}

const Banners: FC<Props> = ({
  bannerLarge,
  bannerSmallLeft,
  bannerSmallRight,
}) => {
  const banner = bannerLarge?.banners?.[0] ?? null
  const bannerImage = banner?.bannerImage?.url
    ? `${PHOTO_URL}${banner.bannerImage.url}`
    : ''

  const bannerLeft = bannerSmallLeft?.banners?.[0] ?? null

  const bannerLeftImage = bannerLeft?.bannerImage?.url
    ? `${PHOTO_URL}${bannerLeft.bannerImage.url}`
    : ''

  const bannerRight = bannerSmallRight?.banners?.[0] ?? null
  const bannerRightImage = bannerRight?.bannerImage?.url
    ? `${PHOTO_URL}${bannerRight.bannerImage.url}`
    : ''

  return (
    <Wrapper>
      {banner ? (
        <WrapBig image={bannerImage}>
          <noindex>
            <Big href={banner.linkUrl ?? '#'} rel="nofollow" target="_blank">
              <LeftBig>
                {banner.linkText ? (
                  <div>
                    <Title>{banner.linkText}</Title>
                  </div>
                ) : null}
              </LeftBig>
            </Big>
          </noindex>
        </WrapBig>
      ) : null}
      <Right>
        {bannerLeft ? (
          <noindex>
            <WrapSmall image={bannerLeftImage}>
              <Small
                href={bannerLeft?.linkUrl ? bannerLeft.linkUrl : '#'}
                target="_blank"
                rel="nofollow"
              >
                <LeftSmall>
                  {bannerLeft.linkText ? (
                    <TitleSmall>{bannerLeft.linkText}</TitleSmall>
                  ) : null}
                </LeftSmall>
              </Small>
            </WrapSmall>
          </noindex>
        ) : null}
        {bannerRight ? (
          <noindex>
            <WrapSmall image={bannerRightImage}>
              <Small
                href={bannerRight.linkUrl ? bannerRight.linkUrl : '#'}
                target="_blank"
                rel="nofollow"
              >
                <LeftSmall>
                  {bannerRight.linkText ? (
                    <TitleSmall>{bannerRight.linkText}</TitleSmall>
                  ) : null}
                </LeftSmall>
              </Small>
            </WrapSmall>
          </noindex>
        ) : null}
      </Right>
    </Wrapper>
  )
}

export default Banners
