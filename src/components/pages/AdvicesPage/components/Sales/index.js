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
import { useContext } from 'react'
import { CityContext } from '../../../../../searchContext'
import { PHOTO_URL } from '../../../../../variables'

const Sales = ({ item }) => {
  const [city] = useContext(CityContext)
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
            {moment(item.dateStart).format('DD MMMM YYYY')} - <br />
          </Date>
          <Date>
            {moment(item.dateEnd).format('DD MMMM YYYY')} <br />
          </Date>
        </SaleData>
        {item?.value ? (
          <Promo>
            <PromoText>Промокод</PromoText>
            <PromoText>{item.value}</PromoText>
          </Promo>
        ) : null}
      </ContentWrap>
      <Desc
        dangerouslySetInnerHTML={{
          __html: item?.desc,
        }}
      />
      <ButtonWrap>
        <Link
          href={
            item.origin === 'MASTER'
              ? `/${cyrToTranslit(
                  item?.masterOrigin?.addressFull?.city || city,
                )}/master/${item.originId}`
              : item.origin === 'SALON'
              ? `/${cyrToTranslit(
                  item?.salonOrigin?.address?.city || city,
                )}/salon/${item.originId}`
              : `/${cyrToTranslit(
                  item?.brandOrigin?.addressFull?.city || city,
                )}/brand/${item.originId}`
          }
        >
          <Button variant="red" size="fullWidth">
            Воспользоваться акцией
          </Button>
        </Link>
      </ButtonWrap>
    </Wrapper>
  )
}

export default Sales
