import {
  Details,
  DetailsLeft,
  BrandName,
  BrandPhone,
  DetailsRight,
  SocialsWrapper,
} from '../styles'
import ViberIcon from './ViberIcon'
import WhatsappIcon from './WhatsappIcon'
import TelegramIcon from './TelegramIcon'
import { IPhone } from 'src/types'

const BrandContacts = ({
  phone = { phoneTitle: 'Телефон не указан' },
}: {
  phone: Partial<IPhone>
}) => {
  return (
    <Details>
      <DetailsLeft>
        <BrandName>{phone.phoneTitle}</BrandName>
        <BrandPhone>{phone?.phoneNumber}</BrandPhone>
      </DetailsLeft>
      <DetailsRight>
        <SocialsWrapper>
          <ViberIcon active={phone?.haveViber} />
          <WhatsappIcon active={phone?.haveWhatsApp} />
          <TelegramIcon active={phone?.haveTelegram} />
        </SocialsWrapper>
      </DetailsRight>
    </Details>
  )
}

export default BrandContacts
