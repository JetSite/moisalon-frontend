import { useContext } from "react";
import {
  Wrapper,
  TitleCabinet,
  TextCabinet,
  ButtonWrapper,
  ButtonWrapperMaster,
} from "./styled";
import Button from "../../../../../ui/Button";
import Link from "next/link";
import MasterCabinetReviews from "../MasterCabinetReviews";
import catalogOrDefault from "../../../../../../utils/catalogOrDefault";
import MasterCabinetProfiles from "../MasterCabinetProfiles";
import MasterCabinetRequests from "../MasterCabinetRequests";
import MobileServicesComponent from "../../../../ViewMaster/components/MobileServicesComponent/MobileServicesForClient";
import MasterCabinetOrders from "../MasterCabinetOrders";
import { CatalogsContext } from "../../../../../../searchContext";

const CabinetForm = ({
  allTabs,
  ref1,
  ref2,
  ref3,
  ref4,
  ref5,
  master,
  masterId,
  reviews,
  me,
}) => {

  const catalogs = useContext(CatalogsContext);

  const masterSpecializationsCatalog = catalogOrDefault(
    catalogs?.masterSpecializationsCatalog
  );

  return (
    <Wrapper id="profiles">
      <TitleCabinet ref={ref1}>{me?.info?.displayName}</TitleCabinet>
      <TextCabinet>Мой кабинет</TextCabinet>
      {!master ? (
        <ButtonWrapper>
          <Link href="/createMaster">
            <Button size="fullWidth" variant="darkTransparent" font="medium">
              Зарегистрироваться как мастер
            </Button>
          </Link>
        </ButtonWrapper>
      ) : null}
      {master ? (
        <div ref={ref2} id="master">
          <MobileServicesComponent
            services={master?.servicesMaster}
            master={master}
            masterPage
            isOwner={true}
            catalogs={catalogs}
          />
        </div>
      ) : null}
      {master ? (
        <ButtonWrapperMaster>
          <Link href="/createMaster">
            <Button size="fullWidth" variant="darkTransparent" font="medium">
              Редактировать профиль мастера
            </Button>
          </Link>
        </ButtonWrapperMaster>
      ) : null}
      {master ? <MasterCabinetReviews reviews={reviews} /> : null}
      <MasterCabinetProfiles ref3={ref3} ref4={ref4} me={me} master={master} />
      {me?.salons?.length ? (
        <MasterCabinetRequests
          me={me}
          masterSpecializationsCatalog={masterSpecializationsCatalog}
        />
      ) : null}
      <MasterCabinetOrders me={me} ref5={ref5} />
    </Wrapper>
  );
};

export default CabinetForm;
