import { useRouter } from 'next/router'
import {
  MainContainer,
  MobileHidden,
  MobileVisible,
} from '../../../../../styles/common'
import { Wrapper, Content } from './styles'
import {
  LeftBlock,
  RightBlock,
  Title,
  Text,
  ImageWrap,
  Image,
} from '../RegInvite/styles'
import Button from '../../../../ui/Button'
import { FC } from 'react'

interface RentProps {
  redirectLink: string
}

const Rent: FC<RentProps> = ({ redirectLink }) => {
  const { push } = useRouter()
  return (
    <MainContainer>
      <Wrapper>
        <Content>
          <LeftBlock>
            <Title>
              Персональный график для полной загрузки и максимальной
              эффективности
            </Title>
            <Text>
              Как владелец или управляющий вы самостоятельно устанавливаете
              время работы для внештатных мастеров. Они приходят только когда у
              ваших сотрудников выходные или перерыв между клиентами. На
              платформе нет обязательств предоставлять определенное количество
              часов — действуйте, как удобно вам.
            </Text>
          </LeftBlock>
          <RightBlock>
            <ImageWrap>
              <Image src="/for-salon-rent-image1.jpg" alt="photo" />
            </ImageWrap>
          </RightBlock>
        </Content>
        <Content>
          <LeftBlock>
            <Title>Цену часа или квадратного метра определяете вы</Title>
            <Text>
              Стоимость аренды назначаете вы — у нас нет минимальных и
              максимальных порогов. Вы вправе установить как 28 рублей за
              квадратный метр, так и 10 000 рублей в час. При необходимости
              проконсультируем и поможем рассчитать оптимальный вариант для
              вашего города, однако итоговое решение будет за вами.
            </Text>
            <MobileHidden>
              <Button
                onClick={() => push(redirectLink)}
                size="mediumNoPadding"
                variant="red"
                font="medium"
                mt="63"
              >
                Сдать в аренду
              </Button>
            </MobileHidden>
          </LeftBlock>
          <RightBlock>
            <ImageWrap>
              <Image src="/for-salon-rent-image2.jpg" alt="photo" />
            </ImageWrap>
          </RightBlock>
        </Content>
        <MobileVisible>
          <Button
            onClick={() => push(redirectLink)}
            size="fullWidth"
            variant="red"
            font="medium"
            mt="43"
          >
            Сдать в аренду
          </Button>
        </MobileVisible>
      </Wrapper>
    </MainContainer>
  )
}

export default Rent
