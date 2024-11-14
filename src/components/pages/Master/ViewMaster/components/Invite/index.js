import Link from 'next/link'
import {
  Wrapper,
  ImageRight,
  Content,
  ContentWrap,
  Title,
  Text,
  ButtonWrapper,
  ButtonWrapperMobile,
} from './styles'
import Button from '../../../../../ui/Button'

const InviteMaster = ({ me }) => {
  const isLoggedIn = me?.info !== undefined && me?.info !== null
  return (
    <Wrapper>
      <ImageRight />
      <Content>
        <ContentWrap>
          <Title>Вы – мастер?</Title>
          <Text>
            Расскажите о себе, бронируйте удобное место рядом с клиентом в
            подходящее вам время. Укажите свои навыки в анкете – и добро
            пожаловать в сообщество!
          </Text>
        </ContentWrap>
      </Content>
      <ButtonWrapper>
        <Link href={isLoggedIn ? '/createMaster' : '/login'}>
          <Button size="fullWidth" variant="red">
            Зарегистрироваться как мастер
          </Button>
        </Link>
        <noindex>
          <Link href="/for_master" target="_blank" rel="nofollow">
            <Button size="fullWidth" variant="darkBorder">
              Больше информации
            </Button>
          </Link>
        </noindex>
      </ButtonWrapper>
      <ButtonWrapperMobile>
        <Link href={isLoggedIn ? '/createMaster' : '/login'}>
          <Button size="fullWidth" variant="red" font="small">
            Зарегистрироваться как мастер
          </Button>
        </Link>
        <noindex>
          <Link href="/for_master" target="_blank" rel="nofollow">
            <Button size="fullWidth" variant="darkTransparent" font="small">
              Больше информации
            </Button>
          </Link>
        </noindex>
      </ButtonWrapperMobile>
    </Wrapper>
  )
}

export default InviteMaster
