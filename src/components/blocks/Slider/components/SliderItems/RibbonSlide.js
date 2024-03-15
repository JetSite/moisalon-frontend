import Link from 'next/link'
import { PHOTO_URL } from '../../../../../../variables'

import {
  SliderItem,
  SliderContent,
  SliderImage,
  SliderImageWrap,
  SliderText,
} from './styles'

const RibbonSlide = ({ item }) => {
  const imageUrl = item?.attributes?.beautyFeedCover?.data?.attributes?.url
    ? `${PHOTO_URL}${item?.attributes?.beautyFeedCover?.data?.attributes?.url}`
    : ''

  return (
    <Link
      href={{
        pathname: '/advices',
        query: { category: item.categoryId, item: item.id },
      }}
    >
      <SliderItem>
        <SliderContent>
          <SliderImageWrap imageUrl={imageUrl}>
            {/* <SliderImage alt={item.title} src={item.image} /> */}
          </SliderImageWrap>
          <SliderText>{item.attributes?.beautyFeedTitle}</SliderText>
        </SliderContent>
      </SliderItem>
    </Link>
  )
}

export default RibbonSlide
