import { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SearchBlock from '../../blocks/SearchBlock'
import BackButton from '../../ui/BackButton'
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
  VacancyInfo,
  VacancyConditions,
} from './styles'
import moment from 'moment'
import 'moment/locale/ru'
import { cyrToTranslit } from '../../../utils/translit'
import { CityContext } from '../../../searchContext'
import MainLayout from '../../../layouts/MainLayout'
import { PHOTO_URL } from '../../../variables'

const VacancyPage = ({ vacancy, beautyCategories, beautyAllContent }) => {
  const router = useRouter()
  const [city] = useContext(CityContext)

  const originInfo = item => {
    switch (item?.origin) {
      case 'MASTER':
        return {
          originType: 'Мастер',
          originName: item.masterOrigin?.name,
          customTitle: `у мастера ${item.masterOrigin?.name}`,
          buttonLink: 'master',
          originLink: `/master/${item.originId}`,
        }
      case 'SALON':
        return {
          originType: 'Салон',
          originName: item.salonOrigin?.name,
          customTitle: `в салоне ${item.salonOrigin?.name}`,
          buttonLink: 'salon',
          originLink: `/${cyrToTranslit(
            item?.salonOrigin?.address?.city || city,
          )}/salon/${item?.originId}`,
        }
      case 'BRAND':
        return {
          originType: 'Бренд',
          originName: item.brandOrigin?.name,
          customTitle: `у бренда ${item.brandOrigin?.name}`,
          buttonLink: 'brand',
          originLink: `/${cyrToTranslit(
            item?.brandOrigin?.addressFull?.city || city,
          )}/brand/${item?.originId}`,
        }
    }
  }

  return (
    <MainLayout>
      <SearchBlock />
      <MainContainer>
        <Wrapper>
          <BackButton
            type="Все вакансии"
            name={originInfo(vacancy).originName}
            link={'/vacancies'}
          />
          <Content>
            <Left>
              <ImageWrap>
                <Image
                  alt="photo"
                  src={`${PHOTO_URL}${vacancy.photoId}/original`}
                />
              </ImageWrap>
            </Left>
            <Right>
              <MobileHidden>
                <Title>
                  {vacancy.title}&nbsp;
                  {originInfo(vacancy).customTitle}
                </Title>
                <Link href={originInfo(vacancy).originLink} passHref>
                  <Subtitle>
                    {originInfo(vacancy).originType}{' '}
                    {originInfo(vacancy).originName}
                  </Subtitle>
                </Link>
              </MobileHidden>
              <MobileVisible>
                <Link href={originInfo(vacancy).originLink} passHref>
                  <Subtitle>
                    {originInfo(vacancy).originType}{' '}
                    {originInfo(vacancy).originName}
                  </Subtitle>
                </Link>
                <Title>{vacancy.title}</Title>
              </MobileVisible>
              <DatePromoWrap>
                <DateWrap>
                  <Date>
                    Дата публикации:&nbsp;
                    {moment(vacancy.dateStart).format('DD MMMM YYYY')}
                  </Date>
                  {/* <Date>
                    Дата окончания:&nbsp;
                    {moment(sale.dateEnd).format("DD MMMM YYYY")}
                  </Date> */}
                </DateWrap>
                {vacancy?.promo ? (
                  <Promo>
                    Промокод <br />
                    {vacancy?.promo}
                  </Promo>
                ) : null}
              </DatePromoWrap>
              <VacancyInfo
                dangerouslySetInnerHTML={{
                  __html: vacancy.desc,
                }}
              />
              {/* {vacancy?.amountFrom || vacancy?.amountTo ? (
                <Salary>
                  Зарплата:&nbsp;
                  {`${new Intl.NumberFormat("ru-RU").format(
                    vacancy.amountFrom
                  )} - `}
                  {`${new Intl.NumberFormat("ru-RU").format(vacancy.amountTo)}`}
                  &nbsp; руб.
                </Salary>
              ) : null} */}
              {vacancy?.conditions ? (
                <VacancyConditions>{vacancy?.conditions}</VacancyConditions>
              ) : null}
              <MobileHidden>
                <Button
                  onClick={() =>
                    router.push(`${originInfo(vacancy).originLink}`)
                  }
                  size="mediumNoPadding"
                  variant="red"
                  font="medium"
                  mt="70"
                >
                  Отправить резюме
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  onClick={() =>
                    router.push(`${originInfo(vacancy).originLink}`)
                  }
                  size="mediumNoPadding"
                  variant="red"
                  font="popUp"
                >
                  Отправить резюме
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

export default VacancyPage
