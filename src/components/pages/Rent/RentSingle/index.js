import { MainContainer } from "../../../../../styles/common";
import { cyrToTranslit } from "../../../../../utils/translit";
import BackButton from "../../../../ui/BackButton";
import { Wrapper } from "./styles";

const RentHeader = ({ city, salonData, roomData }) => {
  return (
    <MainContainer>
      <Wrapper>
        <BackButton
          type="Аренда – Салон"
          link={`/${cyrToTranslit(city)}/rent/${salonData?.id}`}
          name={roomData?.seat?.seatNumber}
        />
      </Wrapper>
    </MainContainer>
  );
};

export default RentHeader;
