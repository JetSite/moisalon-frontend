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
  const bannerLeft = bannerLarge?.banners?.[0] ?? null

  const optimizedBannerLeftImageFormat = bannerLeft?.bannerImage?.formats?.large
    ?.url
    ? bannerLeft.bannerImage.formats.large.url
    : bannerLeft?.bannerImage?.url
    ? bannerLeft.bannerImage.url
    : null

  const bannerLeftImage = optimizedBannerLeftImageFormat
    ? `${PHOTO_URL}${optimizedBannerLeftImageFormat}`
    : ''

  const bannerRightTop = bannerSmallLeft?.banners?.[0] ?? null

  console.log('bannerRightTop', bannerRightTop)

  const optimizedBannerRightTopImageFormat = bannerRightTop?.bannerImage
    ?.formats?.medium?.url
    ? bannerRightTop?.bannerImage.formats.medium.url
    : bannerRightTop?.bannerImage?.formats?.large?.url
    ? bannerRightTop?.bannerImage.formats.large.url
    : bannerRightTop?.bannerImage?.url
    ? bannerRightTop?.bannerImage.url
    : null

  const bannerRightTopImage = optimizedBannerRightTopImageFormat
    ? `${PHOTO_URL}${optimizedBannerRightTopImageFormat}`
    : ''

  const bannerRightBottom = bannerSmallRight?.banners?.[0] ?? null

  const optimizedBannerRightBottomImageFormat = bannerRightBottom?.bannerImage
    ?.formats?.medium?.url
    ? bannerRightBottom?.bannerImage.formats.medium.url
    : bannerRightBottom?.bannerImage?.formats?.large?.url
    ? bannerRightBottom?.bannerImage.formats.large.url
    : bannerRightBottom?.bannerImage?.url
    ? bannerRightBottom?.bannerImage.url
    : null

  const bannerRightBottomImage = optimizedBannerRightBottomImageFormat
    ? `${PHOTO_URL}${optimizedBannerRightBottomImageFormat}`
    : ''

  return (
    <Wrapper>
      {bannerLeft ? (
        <WrapBig>
          <BannerImage
            alt={bannerLeft?.title || 'big banner'}
            src={bannerLeftImage}
            width={785}
            height={275}
            priority
            sizes="(max-width: 768px) 100vw, 785px"
            quality={75}
            loading="eager"
          />
          <noindex>
            <Big
              href={bannerLeft.linkUrl ?? '#'}
              rel="nofollow"
              target="_blank"
            >
              <LeftBig>
                {bannerLeft.linkText ? (
                  <div>
                    <Title>{bannerLeft.linkText}</Title>
                  </div>
                ) : null}
              </LeftBig>
            </Big>
          </noindex>
        </WrapBig>
      ) : null}
      <Right>
        {bannerRightTop ? (
          <noindex>
            <WrapSmall>
              <BannerImage
                alt={bannerRightTop?.title || 'top small banner'}
                src={bannerRightTopImage}
                width={357}
                height={125}
                sizes="(max-width: 768px) 49vw, 357px"
                quality={75}
                loading="eager"
                priority
              />
              <Small
                href={bannerLeft?.linkUrl ? bannerLeft.linkUrl : '#'}
                target="_blank"
                rel="nofollow"
              >
                <LeftSmall>
                  {bannerRightTop.linkText ? (
                    <TitleSmall>{bannerRightTop.linkText}</TitleSmall>
                  ) : null}
                </LeftSmall>
              </Small>
            </WrapSmall>
          </noindex>
        ) : null}
        {bannerRightBottom ? (
          <noindex>
            <WrapSmall>
              <BannerImage
                alt={bannerRightBottom?.title || 'bottom small banner'}
                src={bannerRightBottomImage}
                width={357}
                height={125}
                sizes="(max-width: 768px) 49vw, 357px"
                quality={75}
                loading="eager"
                priority
              />
              <Small
                href={
                  bannerRightBottom.linkUrl ? bannerRightBottom.linkUrl : '#'
                }
                target="_blank"
                rel="nofollow"
              >
                <LeftSmall>
                  {bannerRightBottom.linkText ? (
                    <TitleSmall>{bannerRightBottom.linkText}</TitleSmall>
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
