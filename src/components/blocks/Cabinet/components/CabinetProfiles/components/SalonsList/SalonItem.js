import {
  ItemWrapper,
  TopInfo,
  BottomInfo,
  Name,
  Address,
  WorkingPlaces,
  Published,
  Info,
  AdditionalText,
} from "./styles";

const SalonItem = ({ salon }) => {
  const logoUrl = salon?.logo?.url;
  return (
    <ItemWrapper logoUrl={logoUrl}>
      <TopInfo>
        <Name>{salon.name}</Name>
        <Address>{salon.address.full}</Address>
      </TopInfo>
      <BottomInfo>
        <WorkingPlaces>
          <Info>
            {salon.seatsCount.availableForRent} из {salon.seatsCount.total}
          </Info>
          <AdditionalText>Рабочих мест</AdditionalText>
        </WorkingPlaces>
        <Published>
          <Info>{salon.isPublished ? "Опубликован" : "Не опубликован"}</Info>
          <AdditionalText>Статус салона</AdditionalText>
        </Published>
      </BottomInfo>
    </ItemWrapper>
  );
};

export default SalonItem;
