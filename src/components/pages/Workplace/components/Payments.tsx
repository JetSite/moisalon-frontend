import { FC } from 'react'
import * as Styled from '../styles'
import { IWorkplacePageHeaderProps } from './Header'
import { localeNumber } from 'src/utils/formatNumber'

interface Props extends Omit<IWorkplacePageHeaderProps, 'city' | 'salonData'> {}

export const Payments: FC<Props> = ({ workplace }) => {
  return (
    <>
      {workplace.payment_methods.length || workplace.rentalPeriod?.length ? (
        <Styled.InfoBlock>
          <Styled.Title>Оплата</Styled.Title>
          <Styled.InfoBlockContent>
            {workplace.rentalPeriod?.length ? (
              <Styled.InfoItem>
                <Styled.InfoItemTitle>Стоимость</Styled.InfoItemTitle>
                {workplace.rentalPeriod?.map(period => (
                  <Styled.PriceLine>
                    <Styled.Time>{period.rental_period.title}</Styled.Time>
                    <Styled.Dotted />
                    <Styled.Price>
                      от {localeNumber(period.rentalCost)} ₽
                    </Styled.Price>
                  </Styled.PriceLine>
                ))}
              </Styled.InfoItem>
            ) : null}
            {workplace.payment_methods.length ? (
              <Styled.InfoItem>
                <Styled.InfoItemTitle>Способ оплаты</Styled.InfoItemTitle>
                {workplace.payment_methods.map(method => (
                  <Styled.Item>
                    <Styled.IconCircle src="/service-rent-icon.svg" />
                    <Styled.Text>{method.title}</Styled.Text>
                  </Styled.Item>
                ))}
              </Styled.InfoItem>
            ) : null}
          </Styled.InfoBlockContent>
        </Styled.InfoBlock>
      ) : null}
      {workplace.subRent || workplace.shareRent ? (
        <Styled.InfoBlock>
          <Styled.Title>Общая информация</Styled.Title>
          <Styled.InfoItemHorisontal>
            <Styled.InfoItemTitleWide>Вид аренды</Styled.InfoItemTitleWide>
            <Styled.InfoItemContent>
              {workplace.shareRent ? (
                <Styled.ItemWide>
                  <Styled.IconCircle src="/service-rent-icon.svg" />
                  <Styled.Text>Совместная аренда</Styled.Text>
                </Styled.ItemWide>
              ) : null}
              {workplace.subRent ? (
                <Styled.ItemWide>
                  <Styled.IconCircle src="/service-rent-icon.svg" />
                  <Styled.Text>Возможность субаренды</Styled.Text>
                </Styled.ItemWide>
              ) : null}
              {!workplace.withLicense ? (
                <Styled.ItemWide>
                  <Styled.IconCircle src="/service-rent-icon.svg" />
                  <Styled.Text>Лицензия</Styled.Text>
                </Styled.ItemWide>
              ) : null}
            </Styled.InfoItemContent>
          </Styled.InfoItemHorisontal>
        </Styled.InfoBlock>
      ) : null}
    </>
  )
}
