import Link from "next/link";
import {
  Wrapper,
  Image,
  Content,
  ContentWrap,
  Title,
  Text,
  ButtonWrapper,
  ButtonWrapperMobile,
} from "./styles";
import Button from "../../../../../ui/Button";

const InviteSalon = ({ me }) => {
  const isLoggedIn = me?.info !== undefined && me?.info !== null;
  return (
    <Wrapper>
      <Image />
      <Content>
        <ContentWrap>
          <Title>вы – владелец салона?</Title>
          <Text>
            Расскажите о своем салоне, рабочих местах и возможностях — и начните
            получать заявки от мастеров. Повышайте рейтинг и привлекайте больше
            крутых профессионалов.
          </Text>
        </ContentWrap>
      </Content>
      <ButtonWrapper>
        <Link href={isLoggedIn ? "/createSalon" : "/login"}>
          <Button size="fullWidth" variant="red">
            Зарегистрироваться как салон
          </Button>
        </Link>
        <noindex>
          <Link href="/for_salon">
            <a target="_blank" rel="nofollow">
              <Button size="fullWidth" variant="darkBorder">
                Больше информации
              </Button>
            </a>
          </Link>
        </noindex>
      </ButtonWrapper>
      <ButtonWrapperMobile>
        <Link href={isLoggedIn ? "/createSalon" : "/login"}>
          <Button size="fullWidth" variant="red" font="small">
            Зарегистрироваться как салон
          </Button>
        </Link>
        <noindex>
          <Link href="/for_salon">
            <a target="_blank" rel="nofollow">
              <Button size="fullWidth" variant="darkTransparent" font="small">
                Больше информации
              </Button>
            </a>
          </Link>
        </noindex>
      </ButtonWrapperMobile>
    </Wrapper>
  );
};

export default InviteSalon;
