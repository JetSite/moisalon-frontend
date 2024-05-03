import { useRouter } from 'next/router'
import {
  MainContainer,
  MobileHidden,
  MobileVisible,
} from '../../../../../styles/common'
import { Wrapper, Content, List, ListItem } from './styles'
import {
  LeftBlock,
  RightBlock,
  Title,
  Text,
  ImageWrap,
  Image,
} from '../RegInvite/styles'
import Button from '../../../../ui/Button'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const Rent = () => {
  const { push } = useRouter()
  const { me } = useAuthStore(getStoreData)
  const isLoggedIn = me?.info !== undefined && me?.info !== null

  return (
    <MainContainer>
      <Wrapper>
        <Content>
          <LeftBlock>
            <Title>Продаем товары по вашей цене</Title>
            <List>
              <ListItem>Транслируем ваши цены напрямую, без наценок.</ListItem>
              <ListItem>
                Сотрудничаем с салонами по всей России, поддерживаем только что
                открывшихся и тех, кто на рынке давно.
              </ListItem>
              <ListItem>
                Строго проверяем анкеты частных мастеров, чтобы вы выбирали из
                квалифицированных и надежных.
              </ListItem>
              <ListItem>
                Всегда остаемся на связи, консультируем по всем вопросам, рады
                личным встречам, но можем обо всём договориться онлайн.
              </ListItem>
              <ListItem>
                Постоянно работаем над удобством и функциональностью платформы,
                поэтому ваши возможности будут расти.{' '}
              </ListItem>
            </List>
          </LeftBlock>
          <RightBlock>
            <ImageWrap>
              <Image src="/for-brand-rent-image1.jpg" alt="photo" />
            </ImageWrap>
          </RightBlock>
        </Content>
        <Content>
          <LeftBlock>
            <Title>
              Легко управлять, <br /> приятно презентовать
            </Title>
            <Text>
              Заботливо представим ваш бренд пользователям, расскажем историю и
              миссию, а также грамотно разместим товары с подробной информацией
              о каждом. Грамотная подача и продуманный дизайн упростят заказы —
              без вложений с вашей стороны. А история заказов в личном кабинете
              позволит вашим клиентам повторять заказ в один клик.
            </Text>
            <MobileHidden>
              <Button
                onClick={() => push(isLoggedIn ? '/masterCabinet' : '/login')}
                size="mediumNoPadding"
                variant="red"
                font="medium"
                mt="63"
              >
                Разместить каталог
              </Button>
            </MobileHidden>
          </LeftBlock>
          <RightBlock>
            <ImageWrap>
              <Image src="/for-brand-rent-image2.jpg" alt="photo" />
            </ImageWrap>
          </RightBlock>
        </Content>
        <MobileVisible>
          <Button
            onClick={() => push(isLoggedIn ? '/masterCabinet' : '/login')}
            size="fullWidth"
            variant="red"
            font="medium"
            mt="43"
          >
            Разместить каталог
          </Button>
        </MobileVisible>
      </Wrapper>
    </MainContainer>
  )
}

export default Rent
