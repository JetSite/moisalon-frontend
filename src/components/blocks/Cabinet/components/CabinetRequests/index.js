import RequestsList from "./components/RequestsList";
import { Wrapper } from "./styles";

const CabinetRequests = ({ me, masterSpecializationsCatalog }) => {
  const requests = me?.requests;

  return (
    <Wrapper>
      <RequestsList
        requests={requests}
        masterSpecializationsCatalog={masterSpecializationsCatalog}
      />
    </Wrapper>
  );
};

export default CabinetRequests;
