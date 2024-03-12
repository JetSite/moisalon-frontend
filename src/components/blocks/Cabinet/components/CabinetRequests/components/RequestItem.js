import { useState } from "react";
import Button from "../../../../../ui/Button";
import { selectedGroupNamesMax } from "../../../../../../utils/serviceCatalog";
import {
  ItemWrapper,
  MasterContent,
  MasterPhoto,
  SalonPhoto,
  Photo,
  Info,
  Name,
  Spec,
  Phone,
  Email,
  Request,
  RequestInfo,
  Text,
  PositionWrap,
  Position,
  SalonName,
  ButtonWrapper,
  ButtonStyled,
} from "../styles";

const RequestItem = ({ request, masterSpecializationsCatalog }) => {
  const [accept, setAccept] = useState();
  const [deny, setDeny] = useState();

  const name = request?.master?.name || null;
  const phone = request?.master?.phone || null;
  const email = request?.master?.email || null;
  const salonName = request?.salon?.name || null;
  const salonPhoto = request?.salon?.rentalRequestListLogo?.url || null;
  const specializations = request?.master?.specializations || [];
  return (
    <ItemWrapper>
      <MasterContent>
        <MasterPhoto>
          <Photo />
        </MasterPhoto>
        <Info>
          <Name>{name}</Name>
          <Spec>
            {selectedGroupNamesMax(
              specializations,
              masterSpecializationsCatalog,
              ", ",
              2
            )}
          </Spec>
          <Phone>{phone}</Phone>
          <Email>{email}</Email>
        </Info>
      </MasterContent>
      <Request>
        <SalonPhoto photo={salonPhoto} />
        <RequestInfo>
          <PositionWrap>
            <Text>Хочет арендовать</Text>
            <Position>Помещение №1</Position>
          </PositionWrap>
          <SalonName>{salonName}</SalonName>
        </RequestInfo>
      </Request>
      <ButtonWrapper>
        <ButtonStyled
          size="roundMedium"
          variant="redWithRoundBorder"
          font="roundMedium"
          disabled={accept || deny}
          onClick={() => setAccept(true)}
        >
          {deny ? "Отклонено" : "Подтвердить"}
        </ButtonStyled>
        <Button
          size="roundMedium"
          variant="withRoundBorder"
          font="roundMedium"
          onClick={() => setDeny(true)}
        >
          {accept || deny ? "Удалить заявку" : "Отклонить"}
        </Button>
      </ButtonWrapper>
    </ItemWrapper>
  );
};

export default RequestItem;
