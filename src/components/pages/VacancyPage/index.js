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
  VacancyConditionsTitle,
  VacancyConditions,
  Salary,
} from './styles'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { cyrToTranslit } from '../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import MainLayout from '../../../layouts/MainLayout'
import { PHOTO_URL } from '../../../api/variables'
import ReactMarkdown from 'react-markdown'

const VacancyPage = ({ vacancy, beautyCategories, beautyAllContent }) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)

  const photoUrl =
    vacancy?.cover && vacancy?.cover?.url ? vacancy.cover.url : ''

  const originInfo = item => {
    switch (item?.vacancy_type?.title || 'SALON') {
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
          originName: item.salon?.name,
          customTitle: `в салоне ${item.salon?.name}`,
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
                <Image alt="photo" src={`${PHOTO_URL}${photoUrl}`} width={350} height={350} />
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
                    {format(parseISO(vacancy.createdAt), 'dd MMMM yyyy', { locale: ru })}
                  </Date>
                  {/* <Date>
                    Дата окончания:&nbsp;
                    {format(parseISO(sale.dateEnd), 'dd MMMM yyyy', { locale: ru })}
                  </Date> */}
                </DateWrap>
                {vacancy?.promo ? (
                  <Promo>
                    Промокод <br />
                    {vacancy?.promo}
                  </Promo>
                ) : null}
              </DatePromoWrap>
              {vacancy.fullDescription || vacancy.shortDescription ? (
                <VacancyInfo>
                  <ReactMarkdown>
                    {vacancy.fullDescription || vacancy.shortDescription}
                  </ReactMarkdown>
                </VacancyInfo>
              ) : null}
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
                <>
                  <VacancyConditionsTitle>Условия</VacancyConditionsTitle>
                  <VacancyConditions>
                    <ReactMarkdown>{vacancy.conditions}</ReactMarkdown>
                  </VacancyConditions>
                </>
              ) : null}
              {vacancy?.requirements ? (
                <>
                  <VacancyConditionsTitle>Требования</VacancyConditionsTitle>
                  <VacancyConditions>
                    <ReactMarkdown>{vacancy.requirements}</ReactMarkdown>
                  </VacancyConditions>
                </>
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
