import { useRouter } from "next/router";
import Link from "next/link";
import { MainContainer } from "../../../../../styles/common";
import Button from "../../../../ui/Button";
import {
  Wrapper,
  Title,
  Info,
  Content,
  InfoItem,
  InfoItemTitle,
  InfoItemText,
  Bottom,
  Left,
  Right,
  BottomContentLeft,
  BottomContentTitle,
  BottomContentText,
  BottomContentRight,
  RombIcon,
  ButtonWrapper,
  MobileLogo,
  MobileAssetMaster,
  MobileAssetSalon,
  MobileAssetBusiness,
} from "./styled";
import goalIdObjects from "../../../../../lib/goalIdObjects";

const About = ({ me }) => {
  let leftImage;
  let rightImage;
  let leftImageWidth;
  let rightImageWidth;
  let leftImageHeight;
  let rightImageHeight;
  let leftImageTop;
  let rightImageTop;
  const router = useRouter();
  const type = router.pathname.substring(1);
  if (type == "") {
    leftImage = "leftMain";
    leftImageWidth = 337;
    leftImageHeight = 400;
    leftImageTop = 401;
    rightImage = "rightMain";
    rightImageWidth = 423;
    rightImageHeight = 358;
    rightImageTop = 329;
  } else if (type == "master") {
    leftImage = "leftMaster";
    leftImageWidth = 630;
    leftImageHeight = 426;
    leftImageTop = 426;
    rightImage = "rightMaster";
    rightImageWidth = 490;
    rightImageHeight = 407;
    rightImageTop = 353;
  } else {
    leftImage = "left";
    leftImageWidth = 381;
    leftImageHeight = 452;
    leftImageTop = 452;
    rightImage = "right";
    rightImageWidth = 432;
    rightImageHeight = 358;
    rightImageTop = 326;
  }

  const isLoggedIn = me?.info !== undefined && me?.info !== null;

  const { regMaster, moreInfoMaster, regSalon, moreInfoSalon } = goalIdObjects(
    router.pathname
  );

  return (
    <Wrapper>
      <MainContainer>
        <Content>
          <RombIcon />
          <Title>О платформе</Title>
          <MobileLogo />
          <Info>
            <InfoItem>
              <InfoItemTitle>Свободные мастера</InfoItemTitle>
              <InfoItemText>
                Здесь профессионалы индустрии красоты и здоровья заявляют о себе
              </InfoItemText>
              <MobileAssetMaster />
            </InfoItem>
            <InfoItem>
              <InfoItemTitle>Более 2000 салонов</InfoItemTitle>
              <InfoItemText>
                Каждый день к нам присоединяются новые мастера и партнёры
              </InfoItemText>
              <MobileAssetSalon />
            </InfoItem>
            <InfoItem>
              <InfoItemTitle>География — весь мир</InfoItemTitle>
              <InfoItemText>
                Открывайте новые бизнес-возможности, где бы вы ни находились
              </InfoItemText>
              <MobileAssetBusiness />
            </InfoItem>
          </Info>
        </Content>
        <Bottom>
          <Left>
            <BottomContentLeft
              leftImage={leftImage}
              leftImageWidth={leftImageWidth}
              leftImageHeight={leftImageHeight}
              leftImageTop={leftImageTop}
            >
              <BottomContentTitle>Вы – мастер?</BottomContentTitle>
              <BottomContentText>
                Расскажите о себе, бронируйте удобное место рядом с клиентом в
                подходящее вам время. Укажите свои навыки в анкете – и добро
                пожаловать в сообщество!
              </BottomContentText>
            </BottomContentLeft>
            <ButtonWrapper>
              <Link href={isLoggedIn ? "/createMaster" : "/login"}>
                <Button
                  size="fullWidth"
                  variant="red"
                  onClick={() => {
                    window.dataLayer.push({
                      event: "event",
                      eventProps: {
                        category: "click",
                        action: regMaster,
                      },
                    });
                  }}
                >
                  Зарегистрироваться как мастер
                </Button>
              </Link>
              <noindex>
                <Link href="/for_master">
                  <a target="_blank" rel="nofollow">
                    <Button
                      size="fullWidth"
                      variant="darkTransparent"
                      onClick={() => {
                        window.dataLayer.push({
                          event: "event",
                          eventProps: {
                            category: "click",
                            action: moreInfoMaster,
                          },
                        });
                      }}
                    >
                      Больше информации
                    </Button>
                  </a>
                </Link>
              </noindex>
            </ButtonWrapper>
          </Left>
          <Right>
            <BottomContentRight
              rightImage={rightImage}
              rightImageWidth={rightImageWidth}
              rightImageHeight={rightImageHeight}
              rightImageTop={rightImageTop}
            >
              <BottomContentTitle>вы – владелец салона?</BottomContentTitle>
              <BottomContentText>
                Расскажите о своем салоне, рабочих местах и возможностях — и
                начните получать заявки от мастеров. Повышайте рейтинг и
                привлекайте больше крутых профессионалов.
              </BottomContentText>
            </BottomContentRight>
            <ButtonWrapper>
              <Link href={isLoggedIn ? "/createSalon" : "/login"}>
                <Button
                  size="fullWidth"
                  variant="red"
                  onClick={() => {
                    window.dataLayer.push({
                      event: "event",
                      eventProps: {
                        category: "click",
                        action: regSalon,
                      },
                    });
                  }}
                >
                  Зарегистрироваться как салон
                </Button>
              </Link>
              <noindex>
                <Link href="/for_salon">
                  <a target="_blank" rel="nofollow">
                    <Button
                      size="fullWidth"
                      variant="darkBorder"
                      onClick={() => {
                        window.dataLayer.push({
                          event: "event",
                          eventProps: {
                            category: "click",
                            action: moreInfoSalon,
                          },
                        });
                      }}
                    >
                      Больше информации
                    </Button>
                  </a>
                </Link>
              </noindex>
            </ButtonWrapper>
          </Right>
        </Bottom>
      </MainContainer>
    </Wrapper>
  );
};

export default About;
