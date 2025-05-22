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
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import Button from '../../../../ui/Button'
import Link from 'next/link'
import { cyrToTranslit } from '../../../../../utils/translit'
import { PHOTO_URL } from '../../../../../api/variables'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const Sales = ({ item }) => {
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
            {format(parseISO(item.dateStart), 'dd MMMM yyyy', { locale: ru })} - <br />
          </Date>
          <Date>
            {format(parseISO(item.dateEnd), 'dd MMMM yyyy', { locale: ru })} <br />
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
              ? `/${
                  cyrToTranslit(item?.masterOrigin?.addressFull?.city) ||
                  city.slug
                }/master/${item.originId}`
              : item.origin === 'SALON'
              ? `/${
                  cyrToTranslit(item?.salonOrigin?.address?.city) || city.slug
                }/salon/${item.originId}`
              : `/${
                  cyrToTranslit(item?.brandOrigin?.addressFull?.city) ||
                  city.slug
                }/brand/${item.originId}`
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
