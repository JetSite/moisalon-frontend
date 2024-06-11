import Link from 'next/link'
import { PHOTO_URL } from '../../../../../api/variables'

import {
  SliderItem,
  SliderContent,
  SliderImage,
  SliderImageWrap,
  SliderText,
} from './styles'

const RibbonSlide = ({ item }) => {
  const imageUrl = item?.attributes?.cover?.data?.attributes?.url
    ? `${PHOTO_URL}${item?.attributes.cover.data.attributes.url}`
    : ''

  return (
    <Link
      href={{
        pathname: '/advices',
        query: {
          category: item.attributes.feed_category.data[0].id,
          item: item.id,
        },
      }}
      as="/advices"
    >
      <SliderItem>
        <SliderContent>
          <SliderImageWrap imageUrl={imageUrl}>
            {/* <SliderImage alt={item.title} src={item.image} /> */}
          </SliderImageWrap>
          <SliderText>{item?.attributes?.title}</SliderText>
        </SliderContent>
      </SliderItem>
    </Link>
  )
}

export default RibbonSlide
