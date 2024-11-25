import { FC } from 'react'
import {
  SuccessOrderLink,
  SuccessOrderText,
  SuccessOrderWrapper,
} from '../styles'
import BackButton from '../../../ui/BackButton'

interface Props {}

export const SuccesOrderPage: FC<Props> = ({}) => {
  return (
    <>
      <BackButton type="На главную" link="/" onlyType />
      <SuccessOrderWrapper>
        <SuccessOrderText>Заказ успешно оформлен</SuccessOrderText>
        <SuccessOrderLink href="/masterCabinet?tab=orders">
          Посмотреть заказ в личном кабинете
        </SuccessOrderLink>
      </SuccessOrderWrapper>
    </>
  )
}
