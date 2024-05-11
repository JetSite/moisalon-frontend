import { useRouter } from 'next/router'
import Link from 'next/link'
import MainLayout from '../../../layouts/MainLayout'
import SearchBlock from '../../../components/blocks/SearchBlock'
import BackButton from '../../../components/ui/BackButton'
import Ribbon from '../../pages/MainPage/components/Ribbon'
import Button from '../../ui/Button'
import {
  MainContainer,
  MobileHidden,
  MobileVisible,
} from '../../../styles/common'
import {
  Wrapper,
  Content,
  Left,
  ImageWrap,
  Image,
  Right,
  Title,
  Subtitle,
  DatePromoWrap,
  DateWrap,
  Date,
  Promo,
  SaleInfo,
  SaleConditions,
  CountdownWrap,
} from './styles'
import moment from 'moment'
import 'moment/locale/ru'
import Countdown from '../../blocks/Countdown'
import { cyrToTranslit } from '../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { PHOTO_URL } from '../../../api/variables'

const SalePage = ({ sale, loading, beautyCategories, beautyAllContent }) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)

  const originInfo = item => {
    switch (item?.origin) {
      case 'MASTER':
        return {
          originType: 'Мастер',
          originName: item.masterOrigin?.name,
          customTitle: `у мастера ${item.masterOrigin?.name}`,
          buttonLink: 'master',
          originLink: `/${
            cyrToTranslit(item?.masterOrigin?.addressFull?.city) ||
            city.citySlug
          }/master/${item?.originId}`,
        }
      case 'SALON':
        return {
          originType: 'Салон',
          originName: item.salonOrigin?.name,
          customTitle: `в салоне ${item.salonOrigin?.name}`,
          buttonLink: 'salon',
          originLink: `/${
            cyrToTranslit(item?.salonOrigin?.address?.city) || city.citySlug
          }/salon/${item?.originId}`,
        }
      case 'BRAND':
        return {
          originType: 'Бренд',
          originName: item.brandOrigin?.name,
          customTitle: `у бренда ${item.brandOrigin?.name}`,
          buttonLink: 'brand',
          originLink: `/${
            cyrToTranslit(item?.brandOrigin?.addressFull?.city) || city.citySlug
          }/brand/${item?.originId}`,
        }
    }
  }

  return (
    <MainLayout>
      <SearchBlock />
      <MainContainer>
        <Wrapper>
          <BackButton
            type="Все акции"
            name={originInfo(sale).originName}
            link={'/sales'}
          />
          <Content>
            <Left>
              <ImageWrap>
                <Image
                  alt="photo"
                  src={`${PHOTO_URL}${sale.photoId}/original`}
                />
              </ImageWrap>
              <CountdownWrap>
                <Countdown
                  titleStart="До начала акции"
                  titleEnd="До окончания акции"
                  text="Акция закончилась"
                  dateStart={sale.dateStart}
                  dateEnd={sale.dateEnd}
                  align="right"
                />
              </CountdownWrap>
            </Left>
            <Right>
              <MobileHidden>
                <Title>
                  {sale.title}&nbsp;
                  {originInfo(sale).customTitle}
                </Title>
                <Link href={originInfo(sale).originLink} passHref>
                  <Subtitle>
                    {originInfo(sale).originType} {originInfo(sale).originName}
                  </Subtitle>
                </Link>
              </MobileHidden>
              <MobileVisible>
                <Link href={originInfo(sale).originLink} passHref>
                  <Subtitle>
                    {originInfo(sale).originType} {originInfo(sale).originName}
                  </Subtitle>
                </Link>
                <Title>{sale.title}</Title>
              </MobileVisible>
              <DatePromoWrap>
                <DateWrap>
                  <Date>
                    Дата начала:&nbsp;
                    {moment(sale.dateStart).format('DD MMMM YYYY')}
                  </Date>
                  <Date>
                    Дата окончания:&nbsp;
                    {moment(sale.dateEnd).format('DD MMMM YYYY')}
                  </Date>
                </DateWrap>
                {sale?.promo ? (
                  <Promo>
                    Промокод <br />
                    {sale?.promo}
                  </Promo>
                ) : null}
              </DatePromoWrap>
              <SaleInfo
                dangerouslySetInnerHTML={{
                  __html: sale.desc,
                }}
              />
              {sale?.conditions ? (
                <SaleConditions>{sale?.conditions}</SaleConditions>
              ) : null}
              <MobileHidden>
                <Button
                  onClick={() => router.push(`${originInfo(sale).originLink}`)}
                  size="mediumNoPadding"
                  variant="red"
                  font="medium"
                  mt="70"
                >
                  Воспользоваться акцией
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  onClick={() => router.push(`${originInfo(sale).originLink}`)}
                  size="mediumNoPadding"
                  variant="red"
                  font="popUp"
                >
                  Воспользоваться акцией
                </Button>
              </MobileVisible>
            </Right>
          </Content>
        </Wrapper>
      </MainContainer>
      <Ribbon
        title="Бьюти-лента"
        beautyCategories={beautyCategories}
        beautyAllContent={beautyAllContent}
      />
    </MainLayout>
  )
}

export default SalePage
