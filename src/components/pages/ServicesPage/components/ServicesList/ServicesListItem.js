import {
  ListItemWrapper,
  ImageWrapper,
  Image,
  TextBlock,
  TitlePriceWrap,
  Title,
  Price,
  Quantity,
} from "./styles.js";

const ServicesListItem = ({ popularService, popularServiceHandler }) => {
  return (
    <ListItemWrapper onClick={() => popularServiceHandler(popularService)}>
      <ImageWrapper>
        <Image src={popularService.photo} alt="service-card-image" />
      </ImageWrapper>
      <TextBlock>
        <TitlePriceWrap>
          <Title>{popularService.title}</Title>
          <Price>{popularService.price}</Price>
        </TitlePriceWrap>
        <Quantity>{popularService.offer}</Quantity>
      </TextBlock>
    </ListItemWrapper>
  );
};

export default ServicesListItem;
