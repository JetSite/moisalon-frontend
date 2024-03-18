import Link from 'next/link'
import {
  Wrapper,
  Image,
  Content,
  ContentWrap,
  Title,
  Text,
  ButtonWrapper,
  ButtonWrapperMobile,
} from './styles'
import Button from '../../../../../ui/Button'

const InviteBrand = ({ me }) => {
  const isLoggedIn = me?.info !== undefined && me?.info !== null

  return (
    <Wrapper>
      <Image />
      <Content>
        <ContentWrap>
          <Title>вы – представитель бренда?</Title>
          <Text>
            Расскажите о своем бренде и мы поможем вам найти новых покупателей и
            клиентов. Добро пожаловать в сообщество!
          </Text>
        </ContentWrap>
      </Content>
      <ButtonWrapper>
        <Link href={isLoggedIn ? '/createBrand' : '/login'}>
          <Button size="fullWidth" variant="red">
            Зарегистрировать бренд
          </Button>
        </Link>
        <noindex>
          <Link href="/for_brand" target="_blank" rel="nofollow">
            <Button size="fullWidth" variant="darkBorder">
              Больше информации
            </Button>
          </Link>
        </noindex>
      </ButtonWrapper>
      <ButtonWrapperMobile>
        <Link href={isLoggedIn ? '/createBrand' : '/login'}>
          <Button size="fullWidth" variant="red" font="small">
            Зарегистрироваться бренд
          </Button>
        </Link>
        <noindex>
          <Link href="/for_brand" target="_blank" rel="nofollow">
            <Button size="fullWidth" variant="darkBorder" font="small">
              Больше информации
            </Button>
          </Link>
        </noindex>
      </ButtonWrapperMobile>
    </Wrapper>
  )
}

export default InviteBrand
