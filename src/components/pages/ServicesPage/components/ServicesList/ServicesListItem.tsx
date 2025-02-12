import { FC } from 'react'
import {
  ListItemWrapper,
  ImageWrapper,
  Image,
  TextBlock,
  TitlePriceWrap,
  Title,
  Price,
  Quantity,
} from './styles'

interface Props {
  popularService: {
    id: string
    [K: string]: any
  }
  popularServiceHandler?: (id: string) => void
}

const ServicesListItem: FC<Props> = ({
  popularService,
  popularServiceHandler,
}) => {
  return (
    <ListItemWrapper
      onClick={() =>
        popularServiceHandler && popularServiceHandler(popularService.id)
      }
    >
      <ImageWrapper>
        <Image src={popularService?.photo} alt="service-card-image" />
      </ImageWrapper>
      <TextBlock>
        <TitlePriceWrap>
          <Title>{popularService?.title || ''}</Title>
          <Price>{popularService?.price}</Price>
        </TitlePriceWrap>
        <Quantity>{popularService?.offer}</Quantity>
      </TextBlock>
    </ListItemWrapper>
  )
}

export default ServicesListItem
