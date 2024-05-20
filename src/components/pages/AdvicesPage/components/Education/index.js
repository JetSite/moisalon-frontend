import {
  Wrapper,
  ImageWrap,
  Image,
  Title,
  Name,
  ContentWrap,
  SaleData,
  Date,
  Promo,
  PromoText,
  Desc,
  ButtonWrap,
} from './styles'
import moment from 'moment'
import 'moment/locale/ru'
import Button from '../../../../ui/Button'
import Link from 'next/link'
import { cyrToTranslit } from '../../../../../utils/translit'
import { PHOTO_URL } from '../../../../../api/variables'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const Education = ({ item }) => {
  const { city } = useAuthStore(getStoreData)
  return (
    <Wrapper>
      <ImageWrap>
        <Image alt="photo" src={`${PHOTO_URL}${item.photoId}/original`} />
      </ImageWrap>
      <Title>{item.title}</Title>
      <Name>{`${
        item?.origin.toLowerCase() === 'master'
          ? 'Мастер'
          : item.origin.toLowerCase() === 'salon'
          ? 'Салон'
          : item.origin.toLowerCase() === 'brand'
          ? 'Бренд'
          : ''
      } ${
        item?.masterOrigin?.name ||
        item?.salonOrigin?.name ||
        item?.brandOrigin?.name
      }`}</Name>
      <ContentWrap>
        <SaleData>
          <Date>
            {moment(item.dateStart).format('DD MMMM YYYY HH:MM')} - <br />
          </Date>
          <Date>
            {moment(item.dateEnd).format('DD MMMM YYYY HH:MM')} <br />
          </Date>
        </SaleData>
        {item?.amount ? (
          <Promo>
            <PromoText>Стоимость</PromoText>
            <PromoText>
              {' '}
              {new Intl.NumberFormat('ru-RU').format(item.amount)} руб.
            </PromoText>
          </Promo>
        ) : null}
      </ContentWrap>
      <Desc>{item?.desc}</Desc>
      <ButtonWrap>
        <Link
          href={
            item.origin === 'MASTER'
              ? `/${
                  cyrToTranslit(item?.masterOrigin?.addressFull?.city) ||
                  city.citySlug
                }/master/${item.originId}`
              : item.origin === 'SALON'
              ? `/${
                  cyrToTranslit(item?.salonOrigin?.address?.city) ||
                  city.citySlug
                }/salon/${item.originId}`
              : `/${
                  cyrToTranslit(item?.brandOrigin?.addressFull?.city) ||
                  city.citySlug
                }/brand/${item.originId}`
          }
        >
          <Button variant="red" size="fullWidth">
            Перейти к обучению
          </Button>
        </Link>
      </ButtonWrap>
    </Wrapper>
  )
}

export default Education
