import DictionaryField from "../../../../../../blocks/Form/DictionaryField";

const ActivitiesList = ({ catalog, mbDesc, onlyOneChoose }) => {
  return (
    <DictionaryField
      name="activities"
      groups={catalog}
      withButton={true}
      mbDesc={mbDesc}
      onlyOneChoose={onlyOneChoose}
    />
  );
};

export default ActivitiesList;
