import styled from "styled-components";
import {
  tabletBreakpoint,
  laptopBreakpoint,
} from "../../../../../../styles/variables";

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
`;

const Big = styled.a`
  display: flex;
  justify-content: space-between;
  color: #000;
  width: 100%;
`;

const WrapBig = styled.div`
  width: 785px;
  height: 275px;
  background: ${(props) => `url(${props.image}) no-repeat center`};
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
  }
`;

const WrapSmall = styled.div`
  width: 357px;
  height: 125px;
  color: #000;
  background: ${(props) => `url(${props.image}) no-repeat center`};
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
    background-position: right;
  }
`;

const Small = styled.a`
  color: #000;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

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
`;

const LeftBig = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const LeftSmall = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const RightBig = styled.div`
  max-width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 45%;
  }
`;

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
`;

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
`;

const SubTitle = styled.p`
  font-size: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    text-transform: uppercase;
  }
`;

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
`;

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
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
  height: 100%;
`;

const Banners = ({
  bannersByHookWide,
  bannersByHookSmall1,
  bannersByHookSmall2,
}) => {
  return (
    <Wrapper>
      {bannersByHookWide?.length ? (
        <noindex>
          <WrapBig image={bannersByHookWide[0]?.photo?.url}>
            <Big
              href={bannersByHookWide[0].link}
              rel="nofollow"
              target="_blank"
            >
              <LeftBig>
                <div>
                  <Title
                    dangerouslySetInnerHTML={{
                      __html: bannersByHookWide[0].title,
                    }}
                  />
                  {bannersByHookWide[0]?.subTitle ? (
                    <SubTitle
                      dangerouslySetInnerHTML={{
                        __html: bannersByHookWide[0].subTitle,
                      }}
                    />
                  ) : null}
                </div>
                {bannersByHookWide[0].link ? (
                  <Link
                    href={bannersByHookWide[0].link}
                    target="_blank"
                    rel="nofollow"
                  >
                    {bannersByHookWide[0].titleLink}
                  </Link>
                ) : null}
              </LeftBig>
              {/* <RightBig>
            <Image alt="logoBig" src={bannersByHookWide[0]?.photo?.url} />
          </RightBig> */}
            </Big>
          </WrapBig>
        </noindex>
      ) : null}
      {bannersByHookSmall1?.length || bannersByHookSmall2?.length ? (
        <Right>
          {bannersByHookSmall1?.length ? (
            <noindex>
              <WrapSmall image={bannersByHookSmall1[0]?.photo?.url}>
                <Small
                  href={bannersByHookSmall1[0].link}
                  target="_blank"
                  rel="nofollow"
                >
                  <LeftSmall>
                    <TitleSmall
                      dangerouslySetInnerHTML={{
                        __html: bannersByHookSmall1[0].title,
                      }}
                    />
                    {bannersByHookSmall1[0].link ? (
                      <Link
                        href={bannersByHookSmall1[0].link}
                        target="_blank"
                        rel="nofollow"
                      >
                        {bannersByHookSmall1[0].titleLink}
                      </Link>
                    ) : null}
                  </LeftSmall>
                  {/* <RightSmall>
                <Image
                  alt="logoSmall"
                  src={bannersByHookSmall1[0]?.photo?.url}
                />
              </RightSmall> */}
                </Small>
              </WrapSmall>
            </noindex>
          ) : null}
          {bannersByHookSmall2?.length ? (
            <noindex>
              <WrapSmall image={bannersByHookSmall2[0]?.photo?.url}>
                <Small
                  href={bannersByHookSmall2[0].link}
                  target="_blank"
                  rel="nofollow"
                >
                  <LeftSmall>
                    <TitleSmall
                      dangerouslySetInnerHTML={{
                        __html: bannersByHookSmall2[0].title,
                      }}
                    />
                    {bannersByHookSmall2[0].link ? (
                      <Link
                        href={bannersByHookSmall2[0].link}
                        target="_blank"
                        rel="nofollow"
                      >
                        {bannersByHookSmall2[0].titleLink}
                      </Link>
                    ) : null}
                  </LeftSmall>
                  {/* <RightSmall>
                <Image
                  alt="logoSmall"
                  src={bannersByHookSmall2[0]?.photo?.url}
                />
              </RightSmall> */}
                </Small>
              </WrapSmall>
            </noindex>
          ) : null}
        </Right>
      ) : null}
    </Wrapper>
  );
};

export default Banners;
