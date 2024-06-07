import DictionaryField from '../../../../../../blocks/Form/DictionaryField/index.tsx'

const TechnicalList = ({ catalog, mbDesc, mbWrapper }) => {
  return (
    <DictionaryField
      name="technical"
      groups={catalog}
      withButton={true}
      mbDesc={mbDesc}
      mbWrapper={mbWrapper}
    />
  )
}

export default TechnicalList
