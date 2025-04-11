import Link from 'next/link';
import { PHOTO_URL } from '../../../../../api/variables';
import {
  SliderItem,
  SliderContent,
  SliderImage,
  SliderImageWrap,
  SliderText,
} from './styles';
import { IFeed } from '@/types/feed';

const RibbonSlide = ({ item }: { item: IFeed }) => {
  const imageUrl = item?.cover?.url ? `${PHOTO_URL}${item?.cover.url}` : '';

  return (
    <Link
      href={{
        pathname: '/advices',
        query: {
          category: item.feed_category[0].id,
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
          <SliderText>{item?.title}</SliderText>
        </SliderContent>
      </SliderItem>
    </Link>
  );
};

export default RibbonSlide;
