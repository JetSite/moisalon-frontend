import { FC } from 'react'
import {
  SuccessOrderLink,
  SuccessOrderText,
  SuccessOrderWrapper,
} from '../styles'
import BackButton from '../../../ui/BackButton'
import { routes } from 'src/config/routes'

export const SuccesOrderPage: FC = ({}) => {
  return (
    <>
      <BackButton type="На главную" link="/" onlyType />
      <SuccessOrderWrapper>
        <SuccessOrderText>Заказ успешно оформлен</SuccessOrderText>
        <SuccessOrderLink
          href={{ pathname: routes.caninet, query: 'tab=orders' }}
        >
          Посмотреть заказ в личном кабинете
        </SuccessOrderLink>
      </SuccessOrderWrapper>
    </>
  )
}
