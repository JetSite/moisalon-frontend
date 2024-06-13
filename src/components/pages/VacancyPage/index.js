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
  Salary,
} from './styles'
import moment from 'moment'
import 'moment/locale/ru'
import { cyrToTranslit } from '../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import MainLayout from '../../../layouts/MainLayout'
import { PHOTO_URL } from '../../../api/variables'

const VacancyPage = ({ vacancy, beautyCategories, beautyAllContent }) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)

  console.log('vacancy', vacancy)

  const photoUrl =
    vacancy?.cover && vacancy?.cover[0]?.url ? vacancy.cover[0].url : ''

  const originInfo = item => {
    switch (item?.vacancy_type?.title) {
      case 'MASTER':
        return {
          originType: 'Мастер',
          originName: item.master?.name,
          customTitle: `у мастера ${item.master?.name}`,
          buttonLink: 'master',
          originLink: `/master/${item.master?.id}`,
        }
      case 'SALON':
        return {
          originType: 'Салон',
          originName: item.salon?.salonName,
          customTitle: `в салоне ${item.salon?.salonName}`,
          buttonLink: 'salon',
          originLink: `/${
            cyrToTranslit(item?.salonOrigin?.address?.city) || city.slug
          }/salon/${item?.salon?.id}`,
        }
      case 'BRAND':
        return {
          originType: 'Бренд',
          originName: item.brand?.brandName,
          customTitle: `у бренда ${item.bran?.brandName}`,
          buttonLink: 'brand',
          originLink: `/${
            cyrToTranslit(item?.brandOrigin?.addressFull?.city) || city.slug
          }/brand/${item?.brand?.id}`,
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
                <Image alt="photo" src={`${PHOTO_URL}${photoUrl}`} />
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
                    {moment(vacancy.createdAt).format('DD MMMM YYYY')}
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
              {vacancy?.amountFrom || vacancy?.amountTo ? (
                <Salary>
                  Зарплата:&nbsp;
                  {`${new Intl.NumberFormat('ru-RU').format(
                    vacancy.amountFrom,
                  )} - `}
                  {`${new Intl.NumberFormat('ru-RU').format(vacancy.amountTo)}`}
                  &nbsp; руб.
                </Salary>
              ) : null}
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
