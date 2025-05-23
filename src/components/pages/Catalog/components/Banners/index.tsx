import styled from 'styled-components'
import {
  tabletBreakpoint,
  laptopBreakpoint,
} from '../../../../../styles/variables'
import { PHOTO_URL } from 'src/api/variables'
import { FC } from 'react'
import { IBannerHook } from 'src/types/banners'
import Link from 'next/link'
import { LazyImage } from '@/components/newUI/common/LazyIMage'

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
  height: 100%;
  padding: 40px;
  position: absolute;
  z-index: 100;
`

const WrapBig = styled.div`
  width: 70%;
  max-width: 785px;
  height: 275px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  color: #000;
  overflow: hidden;
  transition: 0.3s;
  position: relative;

  &:hover {
    box-shadow: 0px 0px 24px 1px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    height: 161px;
  }
`

const BannerImage = styled(LazyImage)`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  z-index: 50;
`

const WrapSmall = styled.div`
  width: 100%;
  height: 125px;
  color: #000;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  transition: 0.3s;

  &:hover {
    box-shadow: 0px 0px 24px 1px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

const Small = styled(Link)`
  color: #000;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 15px;
  position: absolute;
  z-index: 100;
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
        <WrapBig>
          <BannerImage
            alt={banner?.title || 'big banner'}
            src={bannerImage}
            width={785}
            height={275}
            priority
            sizes="(max-width: 768px) 100vw, 70vw"
            quality={85}
          />
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
            <WrapSmall>
              <BannerImage
                alt={bannerLeft?.title || 'top small banner'}
                src={bannerLeftImage}
                width={350}
                height={125}
                sizes="(max-width: 768px) 49vw, 30vw"
                quality={85}
                priority
              />
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
            <WrapSmall>
              <BannerImage
                alt={bannerRight?.title || 'bottom small banner'}
                src={bannerRightImage}
                width={350}
                height={125}
                sizes="(max-width: 768px) 49vw, 30vw"
                quality={85}
                priority
              />
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
