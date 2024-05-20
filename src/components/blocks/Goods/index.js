import { useRef } from 'react'
import { MainContainer } from '../../../styles/common'
import {
  Title,
  Wrapper,
  Top,
  Good,
  TopGoodWrapper,
  SwiperWrap,
  Image,
  Favorite,
  BottomGoodWrapper,
  Name,
  Price,
  OldPrice,
  NewPrice,
  AllGoods,
  AllText,
  AllIcon,
  BottomText,
  Plus,
  ActionPercentBlock,
} from './styled'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import Link from 'next/link'
import {
  Bottom,
  ButtonNext,
  ButtonPrev,
  NavigationWrapper,
  SliderWpapper,
} from '../../../styles/sliderBlocks'
import { cyrToTranslit } from '../../../utils/translit'

SwiperCore.use([Navigation])

const Goods = ({ items, title }) => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const { city, me } = useAuthStore(getStoreData)
  const b2bClient = !!me?.master?.id || !!me?.salons?.length

  const onBeforeInit = Swiper => {
    if (typeof Swiper.params.navigation !== 'boolean') {
      const navigation = Swiper.params.navigation
      navigation.prevEl = navigationPrevRef.current
      navigation.nextEl = navigationNextRef.current
    }
  }

  const addFavorite = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <MainContainer id="stock">
      <Wrapper>
        <Top>
          <Title>{title}</Title>
          <NavigationWrapper>
            <ButtonPrev ref={navigationPrevRef} />
            <ButtonNext ref={navigationNextRef} />
          </NavigationWrapper>
        </Top>
        <SliderWpapper>
          <SwiperWrap>
            <Swiper
              style={{ padding: '5px', marginLeft: '-5px' }}
              mousewheel={true}
              pagination={{ clickable: true }}
              slidesPerView={5}
              spaceBetween={22}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onBeforeInit={onBeforeInit}
            >
              {items.map((item, i) => (
                <SwiperSlide
                  style={{ minHeight: '100%', height: 'auto' }}
                  key={i}
                >
                  <Link href={`/${cyrToTranslit(city?.citySlug)}`}>
                    <Good>
                      <TopGoodWrapper>
                        <Image
                          alt="image"
                          src={
                            item?.node?.image?.sourceUrl ||
                            '/cosmetic_placeholder.jpg'
                          }
                        />
                        <Favorite onClick={e => addFavorite(e)} />
                        <ActionPercentBlock>50%</ActionPercentBlock>
                      </TopGoodWrapper>
                      <BottomGoodWrapper>
                        <Name>{item.node.name}</Name>
                        {item?.node?.productCategories?.nodes[0].name?.toLowerCase() ===
                          'perfleor' && !me?.info ? null : (
                          <Price>
                            <OldPrice>{item.node.regularPrice}</OldPrice>
                            <NewPrice>{item.node.price}</NewPrice>
                          </Price>
                        )}
                      </BottomGoodWrapper>
                    </Good>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrap>
          <Link href={`/${cyrToTranslit(city?.citySlug)}/beautyFreeShop`}>
            <AllGoods>
              <AllIcon />
              <AllText>Показать все товары</AllText>
            </AllGoods>
          </Link>
        </SliderWpapper>
        <Bottom>
          <Link href={`/${cyrToTranslit(city?.citySlug)}`}>
            <Plus />
            <BottomText>Разместить свой товар</BottomText>
          </Link>
        </Bottom>
      </Wrapper>
    </MainContainer>
  )
}

export default Goods
