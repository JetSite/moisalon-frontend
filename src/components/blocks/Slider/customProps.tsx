import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import {
  ShowAll,
  ButtonWrap,
  ButtonWrapBrandLanding,
  SeeAllGoods,
  SeeAllMain,
  SeeAllBody,
  SeeAllText,
  SeeAllBodyText,
} from './styles'
import Link from 'next/link'
import {
  MasterSlide,
  SalonSlide,
  BrandSlide,
  GoodSlide,
  PortfolioSlide,
  VacancySlide,
  AdSlide,
  RentSalonSlide,
  WorkplaceSlide,
  RibbonSlide,
} from './components/SliderItems'
import {
  AllMastersSlide,
  AllSalonsSlide,
  AllBrandsSlide,
  AllGoodsSlide,
  AllAdsSlide,
  AllRentSalons,
  AllRentWorkplaces,
} from './components/ShowAllSlides'
import {
  MasterBottomButton,
  SalonBottomButton,
  BrandBottomButton,
  GoodBottomButton,
  AdBottomButton,
  WorkplaceBottomButton,
} from './components/BottomButtons'
import Button from '../../ui/Button'
import { cyrToTranslit } from '../../../utils/translit'

import { LazyType } from 'src/types/common'
import { IBrand } from 'src/types/brands'
import { IMaster } from 'src/types/masters'
import { ISalon, ISalonPage } from 'src/types/salon'
import { IDeleteFunction } from './components/SliderItems/BrandSlide'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { SlideType } from '.'
import { ICity, IPhoto } from 'src/types'
import { IProduct } from 'src/types/product'
import { IVacancy } from 'src/types/vacancies'

interface PropsICustomProps {
  type: SlideType
  item?: IMaster | IBrand | ISalon | IPhoto | IProduct | IVacancy | null
  typeObject?: IMaster | IBrand | ISalon | IPhoto | IProduct | IVacancy | null
  bgColor?: string
  isEditing?: boolean
  deleteFunction?: IDeleteFunction
  salon?: ISalon | null
  landingMaster?: boolean
  city: ICity
}

type ICustomProps = (props: PropsICustomProps) => {
  sliderItem: ReactElement
  isAllPage?: boolean
  slidesCountWhenAllShow?: number
  showAllSlide?: ReactElement
  showAllLink?: ReactElement
  bottom?: ReactElement
  landingItem?: ReactElement
  firstSlide?: ReactElement
}

export const customProps: ICustomProps = ({
  type,
  item = null,
  typeObject = null,
  bgColor = '#fff',
  isEditing = false,
  deleteFunction,
  salon,
  landingMaster,
  city,
}) => {
  const router = useRouter()

  switch (type) {
    case 'masters':
      return {
        sliderItem: <MasterSlide city={city.slug} item={item as IMaster} />,
        isAllPage: router.pathname === '/[city]/master',
        slidesCountWhenAllShow: 5,
        showAllSlide: <AllMastersSlide city={city.slug} />,
        showAllLink: (
          <Link href={`/${city.slug}/master`}>
            <ShowAll bgColor={bgColor}>Показать все</ShowAll>
          </Link>
        ),
        bottom: <MasterBottomButton bgColor={bgColor} />,
      }
    case 'salons':
      return {
        sliderItem: (
          <SalonSlide
            item={item as ISalonPage}
            isEditing={isEditing}
            deleteFunction={deleteFunction as IDeleteFunction}
          />
        ),
        isAllPage: router.pathname === `/[city]/salon`,
        slidesCountWhenAllShow: 3,
        showAllSlide: <AllSalonsSlide />,
        showAllLink: (
          <Link
            href={!landingMaster ? `/${city.slug}/salon` : `/${city.slug}/rent`}
          >
            <ShowAll bgColor={bgColor}>Показать все</ShowAll>
          </Link>
        ),
        bottom: <SalonBottomButton bgColor={bgColor} />,
        landingItem: (
          <ButtonWrap>
            <Button
              style={{ padding: 0 }}
              onClick={() => router.push('/createLessorSalon')}
              size="medium"
              variant="red"
              font="medium"
            >
              Зарегистрировать салон
            </Button>
          </ButtonWrap>
        ),
      }
    case 'brands':
      return {
        sliderItem: (
          <BrandSlide
            item={item as IBrand}
            isEditing={isEditing}
            deleteFunction={deleteFunction}
          />
        ),
        isAllPage: router.pathname === `/${city.slug}/brand`,
        slidesCountWhenAllShow: 6,
        showAllSlide: <AllBrandsSlide />,
        showAllLink: (
          <Link href={`/${city.slug}/brand`}>
            <ShowAll bgColor={bgColor}>Показать все</ShowAll>
          </Link>
        ),
        bottom: <BrandBottomButton bgColor={bgColor} />,
        landingItem: (
          <ButtonWrapBrandLanding>
            <Button
              onClick={() => router.push('/login')}
              size="medium"
              variant="red"
              font="medium"
            >
              Разместить каталог
            </Button>
          </ButtonWrapBrandLanding>
        ),
      }
    case 'goods':
      return {
        firstSlide: (
          <Link
            href={
              router.query.id === '62fb9f7884fe720001f6771c'
                ? `/${city.slug}/beautyFreeShop`
                : `/${city.slug}/brand/${router.query.id}/products`
            }
          >
            <SeeAllMain>
              <SeeAllGoods>
                <SeeAllText>Показать все товары бренда</SeeAllText>
              </SeeAllGoods>
              <SeeAllBody>
                <SeeAllBodyText>Перейти в магазин</SeeAllBodyText>
              </SeeAllBody>
            </SeeAllMain>
          </Link>
        ),
        sliderItem: item ? (
          <GoodSlide
            href={{
              pathname: `/${(item as IProduct).brand.city.slug}/product/${
                item.id
              }`,
              query: {
                catalog: false,
              },
            }}
            item={item as IProduct}
          />
        ) : (
          <></>
        ),
        slidesCountWhenAllShow: 6,
        showAllSlide: <AllGoodsSlide />,
        bottom: <GoodBottomButton />,
        showAllLink: (
          <Link href={`/${city.slug}/beautyFreeShop`}>
            <ShowAll bgColor={bgColor}>Показать все</ShowAll>
          </Link>
        ),
      }
    case 'ribbon':
      return {
        sliderItem: <RibbonSlide item={item} />,
        // bottom: <RibbonBottomButton />,
      }
    case 'portfolio':
      return {
        sliderItem: (
          <PortfolioSlide
            item={item}
            isEditing={isEditing}
            deleteFunction={deleteFunction}
          />
        ),
      }
    case 'diploms':
      return {
        sliderItem: (
          <PortfolioSlide
            item={item}
            isEditing={isEditing}
            deleteFunction={deleteFunction}
          />
        ),
      }
    case 'vacancies':
      return {
        sliderItem: <VacancySlide item={item as IVacancy} />,
      }
    case 'ads':
      return {
        sliderItem: <AdSlide item={item} />,
        bottom: <AdBottomButton bgColor={bgColor} />,
        slidesCountWhenAllShow: 3,
        showAllSlide: <AllAdsSlide />,
        showAllLink: (
          <Link href={`/${city.slug}/sales`}>
            <ShowAll bgColor={bgColor}>Показать все</ShowAll>
          </Link>
        ),
      }
    case 'rentSalons':
      return {
        showAllLink: (
          <Link href={`/${city.slug}/rent`}>
            <ShowAll bgColor={bgColor}>Показать все</ShowAll>
          </Link>
        ),
        sliderItem: <RentSalonSlide item={item as ISalon} />,
        slidesCountWhenAllShow: 3,
        showAllSlide: <AllRentSalons />,

        bottom: <SalonBottomButton bgColor={bgColor} />,
      }
    case 'rentWorkplaces':
      return {
        sliderItem: <WorkplaceSlide item={item} salon={salon} />,
        slidesCountWhenAllShow: 3,
        showAllSlide: <AllRentWorkplaces salon={salon} />,
        showAllLink: (
          <Link href={`/${cyrToTranslit(salon?.address)}/rent/${salon?.id}`}>
            <ShowAll bgColor={bgColor}>Показать все</ShowAll>
          </Link>
        ),
        bottom: <WorkplaceBottomButton bgColor={bgColor} />,
      }
    // default:
    //   return { sliderItem: <></> }
  }
}
