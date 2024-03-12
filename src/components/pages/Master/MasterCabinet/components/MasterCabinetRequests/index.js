import CabinetRequests from "../../../../../blocks/Cabinet/components/CabinetRequests";

const MasterCabinetRequests = ({ me, masterSpecializationsCatalog }) => {
  return (
    <div id="requests">
      <CabinetRequests
        me={me}
        masterSpecializationsCatalog={masterSpecializationsCatalog}
      />
    </div>
  );
};

export default MasterCabinetRequests;
