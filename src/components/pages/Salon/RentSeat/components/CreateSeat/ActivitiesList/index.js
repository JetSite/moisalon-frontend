import DictionaryField from '../../../../../../blocks/Form/DictionaryField/index.tsx'

const ActivitiesList = ({ catalog, mbDesc, onlyOneChoose }) => {
  return (
    <DictionaryField
      name="activities"
      groups={catalog}
      withButton={true}
      mbDesc={mbDesc}
      onlyOneChoose={onlyOneChoose}
    />
  )
}

export default ActivitiesList
