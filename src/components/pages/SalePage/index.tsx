import { useRouter } from 'next/router'
import Link from 'next/link'
import MainLayout from '../../../layouts/MainLayout'
import SearchBlock from '../../blocks/SearchBlock'
import BackButton from '../../ui/BackButton'
import Ribbon from '../MainPage/components/Ribbon'
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
import { ISale } from 'src/types/sale'
import { FC } from 'react'

interface SalePageProps {
  sale: ISale
  beautyCategories: any
  beautyAllContent: any
}

const SalePage: FC<SalePageProps> = ({
  sale,
  beautyCategories,
  beautyAllContent,
}) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)

  const originInfo = (item: ISale) => {
    if (item.master) {
      return {
        originType: 'Мастер',
        originName: item.master?.name,
        customTitle: `у мастера ${item.master?.name}`,
        buttonLink: 'master',
        originLink: `/${city.slug}/master/${item?.master?.id}`,
        originUserId: item?.user?.id,
      }
    }
    if (item.salon) {
      return {
        originType: 'Салон',
        originName: item.salon?.name,
        customTitle: `в салоне ${item.salon?.name}`,
        buttonLink: 'salon',
        originLink: `/${city.slug}/salon/${item?.salon?.id}`,
        originUserId: item?.user?.id,
      }
    }
    if (item.brand) {
      return {
        originType: 'Бренд',
        originName: item.brand?.name,
        customTitle: `у бренда ${item.brand?.name}`,
        buttonLink: 'brand',
        originLink: `/${city.slug}/brand/${item?.brand?.id}`,
        originUserId: item?.user?.id,
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
            name={originInfo(sale)?.originName}
            link={'/sales'}
          />
          <Content>
            <Left>
              <ImageWrap>
                <Image alt="photo" src={`${PHOTO_URL}${sale.cover.url}`} />
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
                  {originInfo(sale)?.customTitle}
                </Title>
                <Link href={originInfo(sale)?.originLink || ''} passHref>
                  <Subtitle>
                    {originInfo(sale)?.originType}{' '}
                    {originInfo(sale)?.originName}
                  </Subtitle>
                </Link>
              </MobileHidden>
              <MobileVisible>
                <Link href={originInfo(sale)?.originLink || ''} passHref>
                  <Subtitle>
                    {originInfo(sale)?.originType}{' '}
                    {originInfo(sale)?.originName}
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
                {/* {sale?.promo ? (
                  <Promo>
                    Промокод <br />
                    {sale?.promo}
                  </Promo>
                ) : null} */}
              </DatePromoWrap>
              <SaleInfo
                dangerouslySetInnerHTML={{
                  __html: sale.fullDescription || sale.shortDescription,
                }}
              />
              {/* {sale?.conditions ? (
                <SaleConditions>{sale?.conditions}</SaleConditions>
              ) : null} */}
              <MobileHidden>
                <Button
                  onClick={() => router.push(`${originInfo(sale)?.originLink}`)}
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
                  onClick={() => router.push(`${originInfo(sale)?.originLink}`)}
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
