import { FC } from 'react'
import * as Styled from '../styles'
import EntityDescription from 'src/components/newUI/EntityDescription'
import Slider from 'src/components/blocks/Slider'
import { OnlineBookingButton } from 'src/components/blocks/OnlineBookingButton'
import { IWorkplacePageHeaderProps } from './Header'

interface Props extends IWorkplacePageHeaderProps {}

export const About: FC<Props> = ({ salonData, workplace, city }) => {
  return (
    <>
      <Styled.Title>Тип рабочего места</Styled.Title>
      {workplace.workspaces_types.map(type => (
        <Styled.ItemWide key={type.id}>
          <Styled.IconCircle src="/service-rent-icon.svg" />
          <Styled.Text>{type.title}</Styled.Text>
        </Styled.ItemWide>
      ))}
      <Styled.Top>
        <Styled.SalonDescription>
          <EntityDescription description={salonData.description} />
        </Styled.SalonDescription>
        <div>
          <OnlineBookingButton salon={salonData} workplace={workplace}>
            <Styled.ButtonRequest>Отправить заявку</Styled.ButtonRequest>
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
        </div>
      </Styled.Top>
      {workplace.gallery.length ? (
        <Slider
          noAllPadding
          city={city}
          type="photos"
          items={workplace.gallery}
        />
      ) : null}
    </>
  )
}
