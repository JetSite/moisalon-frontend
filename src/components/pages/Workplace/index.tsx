import { FC, useState } from 'react'
import * as Styled from './styles'
import { OnlineBookingButton } from 'src/components/blocks/OnlineBookingButton'
import { ISalonWorkplace } from 'src/types/workplace'
import { Header, IWorkplacePageHeaderProps } from './components/Header'
import { About } from './components/About'
import { Payments } from './components/Payments'
import { GroupedItems } from './components/GroupedItems'
import { TechnicalItems } from './components/TechnicalItems'
import { getPrepareData } from './utils/getPrepareData'

interface IWorkplacePageProps extends IWorkplacePageHeaderProps {}

export const WorkplacePage: FC<IWorkplacePageProps> = ({
  workplace,
  city,
  salonData,
}) => {
  const { equipment, services, technicalsArr } = getPrepareData(workplace)

  return (
    <>
      <Header city={city} workplace={workplace} salonData={salonData} />
      <Styled.Wrapper>
        <Styled.Content>
          <About city={city} workplace={workplace} salonData={salonData} />
          <Payments workplace={workplace} />
          <GroupedItems data={equipment} title="Оборудование" />
          <GroupedItems data={services} title="Услуги" />
          <TechnicalItems arr={technicalsArr} title="Технические параметры" />
          <Styled.BottomButtons>
            <OnlineBookingButton salon={salonData} workplace={workplace}>
              <Styled.ButtonRequest> Отправить заявку</Styled.ButtonRequest>
            </OnlineBookingButton>
            {salonData?.onlineBookingUrl ? (
              <noindex>
                <Styled.ButtonRequest
                  as={'a'}
                  target="_blank"
                  rel="nofollow"
                  href={salonData?.onlineBookingUrl}
                >
                  Связаться с салоном
                </Styled.ButtonRequest>
              </noindex>
            ) : (
              <Styled.ButtonRequest
                as={'a'}
                href={`tel:${salonData.salonPhones[0]?.phoneNumber}`}
              >
                Связаться с салоном
              </Styled.ButtonRequest>
            )}
          </Styled.BottomButtons>
        </Styled.Content>
      </Styled.Wrapper>
    </>
  )
}
