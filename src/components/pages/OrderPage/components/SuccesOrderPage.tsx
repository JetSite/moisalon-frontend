import { FC, Fragment } from 'react'
import {
  SuccessOrderLink,
  SuccessOrderText,
  SuccessOrderWrapper,
} from '../styles'
import BackButton from '../../../ui/BackButton'
import { routes } from 'src/config/routes'
import MainHead from '../../../../pages/MainHead'

export const SuccesOrderPage: FC = () => {
  return (
    <Fragment>
      <MainHead
        title="Заказ успешно оформлен | MOI salon"
        description="Ваш заказ успешно оформлен на платформе MOI salon. Спасибо за покупку!"
        image="/mobile-main-bg.jpg"
      />
      <BackButton type="На главную" link="/" onlyType />
      <SuccessOrderWrapper>
        <SuccessOrderText>Заказ успешно оформлен</SuccessOrderText>
        <SuccessOrderLink
          href={{ pathname: routes.caninet, query: { tab: 'orders' } }}
        >
          Посмотреть заказ в личном кабинете
        </SuccessOrderLink>
      </SuccessOrderWrapper>
    </Fragment>
  )
}
