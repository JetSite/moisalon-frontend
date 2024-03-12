import { useState } from "react";
import { MainContainer, MobileHidden } from "../../../../styles/common";
import Header from "../../../pages/MainPage/components/Header";
import Controls from "../../../blocks/Form/Controls";
import { Wrapper } from "./styles";
import CabinetHeaderMobile from "../../../blocks/Cabinet/components/CabinetHeaderMobile";
import RentSeatForm from "./components/RentSeatForm";

const RentSeat = ({ salon, refetchSalon, seatActivities, seatEquipment }) => {
  const [tabs] = useState([
    {
      id: "1",
      value: "Данные салона",
      anchor: "cabinet",
      href: "/createSalon",
      link: salon.id,
      back: true,
    },
  ]);

  return (
    <>
      <Header />
      <MainContainer>
        <CabinetHeaderMobile category={salon} />
        <Wrapper>
          <MobileHidden>
            <Controls
              tabs={tabs}
              photoType={"salon"}
              noSetPhoto={true}
              photo={salon?.logo ? salon?.logo : null}
            />
          </MobileHidden>
          {salon?.lessor ? (
            <RentSeatForm
              refetchSalon={refetchSalon}
              salon={salon}
              seatActivities={seatActivities}
              seatEquipment={seatEquipment}
            />
          ) : null}
        </Wrapper>
      </MainContainer>
    </>
  );
};

export default RentSeat;
