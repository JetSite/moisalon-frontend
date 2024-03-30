import Link from 'next/link'
import { PHOTO_URL } from '../../../../../variables'

import {
  SliderItem,
  SliderContent,
  SliderImage,
  SliderImageWrap,
  SliderText,
} from './styles'

const RibbonSlide = ({ item }) => {
  const imageUrl = item?.beautyFeedCover?.url
    ? `${PHOTO_URL}${item.beautyFeedCover.url}`
    : ''

  return (
    <Link
      href="#"
      // href={{
      //   pathname: '/advices',
      //   query: { category: item.categoryId, item: item.id },
      // }}
    >
      <SliderItem>
        <SliderContent>
          <SliderImageWrap imageUrl={imageUrl}>
            {/* <SliderImage alt={item.title} src={item.image} /> */}
          </SliderImageWrap>
          <SliderText>{item?.beautyFeedTitle}</SliderText>
        </SliderContent>
      </SliderItem>
    </Link>
  )
}

export default RibbonSlide
