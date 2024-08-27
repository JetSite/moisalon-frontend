import { IService, IServiceCategory } from 'src/types/services'
import {
  Content,
  LeftColumn,
  RightColumn,
} from '../../Master/ViewMaster/components/ServicesComponent/styles'
import CatalogGroup from './components/CatalogGroup'
import { Dispatch, FC, SetStateAction } from 'react'

interface IEditSalonServices {
  setEntriesItems: Dispatch<SetStateAction<IService[]>>
  entriesItems: IService[]
  mobile?: boolean
  services: IServiceCategory[]
  masterPage?: boolean
}

const EditSalonServices: FC<IEditSalonServices> = ({
  setEntriesItems,
  entriesItems,
  mobile = false,
  services,
  masterPage = false,
}) => {
  const handleDeleteEntries = (serviceBlock: IServiceCategory) => {
    const newItems = entriesItems.filter(
      entry => !serviceBlock.services.find(service => service.id === entry.id),
    )
    setEntriesItems(newItems)
  }

  const handleAddEntries = (serviceBlock: IServiceCategory) => {
    const newItems = [...entriesItems, ...serviceBlock.services]
    const uniqueServices = newItems.filter(
      (service, index, self) =>
        index === self.findIndex(s => s.id === service.id),
    )
    setEntriesItems(uniqueServices)
  }

  const groups = services?.map((serviceBlock, idx) => {
    return (
      <CatalogGroup
        entriesItems={entriesItems}
        setEntriesItems={setEntriesItems}
        key={idx}
        serviceBlock={serviceBlock}
        allServices={services}
        handleAddEntries={handleAddEntries}
        handleDeleteEntries={handleDeleteEntries}
      />
    )
  })

  const secondColumnStart = Math.round(groups.length / 2)
  return !mobile ? (
    <Content>
      <LeftColumn>{groups.slice(0, secondColumnStart)}</LeftColumn>
      <RightColumn>{groups.slice(secondColumnStart)}</RightColumn>
    </Content>
  ) : (
    <Content masterPage={masterPage}>{groups}</Content>
  )
}

export default EditSalonServices
