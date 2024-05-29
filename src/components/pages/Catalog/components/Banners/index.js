import styled from 'styled-components'
import {
  tabletBreakpoint,
  laptopBreakpoint,
} from '../../../../../styles/variables'
import { PHOTO_URL } from 'src/api/variables'

const Wrapper = styled.div`
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px 45px 140px;
  justify-content: space-between;
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

const Big = styled.a`
  display: flex;
  justify-content: space-between;
  color: #000;
  width: 100%;
`

const WrapBig = styled.div`
  width: 785px;
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

const WrapSmall = styled.div`
  width: 357px;
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

const Small = styled.a`
  color: #000;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${tabletBreakpoint}) {
    width: 100%;
    flex-direction: row;
    margin-top: 10px;

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

const Link = styled.a`
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

const Banners = ({
  bannersByHookWide,
  bannersByHookSmall1,
  bannersByHookSmall2,
}) => {
  const bannerWide = bannersByHookWide?.attributes?.banners?.data[0]?.attributes
  const bannerWideImage = bannerWide?.bannerImage?.data?.attributes?.url
    ? `${PHOTO_URL}${bannerWide?.bannerImage?.data?.attributes?.url}`
    : ''

  const bannerSmall1 =
    bannersByHookSmall1?.attributes?.banners?.data[0]?.attributes
  const bannerSmall1Image = bannerSmall1?.bannerImage?.data?.attributes?.url
    ? `${PHOTO_URL}${bannerSmall1?.bannerImage?.data?.attributes?.url}`
    : ''

  const bannerSmall2 =
    bannersByHookSmall2?.attributes?.banners?.data[0]?.attributes
  const bannerSmall2Image = bannerSmall2?.bannerImage?.data?.attributes?.url
    ? `${PHOTO_URL}${bannerSmall2?.bannerImage?.data?.attributes?.url}`
    : ''

  return (
    <Wrapper>
      {bannersByHookWide?.attributes?.banners?.data?.length ? (
        <noindex>
          <WrapBig image={bannerWideImage}>
            <Big
              href={bannerWide?.linkUrl ? bannerWide.linkUrl : '#'}
              rel="nofollow"
              target="_blank"
            >
              <LeftBig>
                {bannerWide?.title ? (
                  <div>
                    <Title>{bannerWide.title}</Title>
                  </div>
                ) : null}
              </LeftBig>
            </Big>
          </WrapBig>
        </noindex>
      ) : null}
      {bannersByHookSmall1?.attributes?.banners?.data?.length ? (
        <Right>
          {bannerSmall1 ? (
            <noindex>
              <WrapSmall image={bannerSmall1Image}>
                <Small
                  href={bannerSmall1?.linkUrl ? bannerSmall1.linkUrl : '#'}
                  target="_blank"
                  rel="nofollow"
                >
                  <LeftSmall>
                    {bannerSmall1?.title ? (
                      <TitleSmall>{bannerSmall1.title}</TitleSmall>
                    ) : null}
                  </LeftSmall>
                </Small>
              </WrapSmall>
            </noindex>
          ) : null}
          {bannerSmall2 ? (
            <noindex>
              <WrapSmall image={bannerSmall2Image}>
                <Small
                  href={bannerSmall2?.linkUrl ? bannerSmall2.linkUrl : '#'}
                  target="_blank"
                  rel="nofollow"
                >
                  <LeftSmall>
                    {bannerSmall2?.title ? (
                      <TitleSmall>{bannerSmall2.title}</TitleSmall>
                    ) : null}
                  </LeftSmall>
                </Small>
              </WrapSmall>
            </noindex>
          ) : null}
        </Right>
      ) : null}
    </Wrapper>
  )
}

export default Banners
