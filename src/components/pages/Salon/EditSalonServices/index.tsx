import { CatalogGroup } from './components/CatalogGroup'
import {
  Content,
  LeftColumn,
  RightColumn,
} from '../../Master/ViewMaster/components/ServicesComponent/styles'
import { Dispatch, FC, SetStateAction } from 'react'
import { IEntries } from '../ViewSalon/components/Services'
import {
  IGroupedCategories,
  IGroupedService,
} from 'src/utils/getGrupedServices'
import { ISetState } from 'src/types/common'

interface Props {
  groupedServices: IGroupedCategories[]
  setEntriesItems: ISetState<IEntries[]>
  entriesItems: IEntries[]
  mobile?: boolean
}

const EditSalonServices: FC<Props> = ({
  groupedServices,
  setEntriesItems,
  entriesItems,
  mobile = false,
}) => {
  const handleDeleteEntries = (items: IGroupedService[]) => {
    let newItems = entriesItems
    for (let i = newItems.length - 1; i >= 0; i--) {
      for (let j = 0; j < items.length; j++) {
        if (newItems[i]?.id === items[j]?.id) {
          newItems.splice(i, 1)
        }
      }
    }
    setEntriesItems([...newItems])
  }

  const handleAddEntries = (items: IGroupedService[]) => {
    //TODO: not working func
    let newItems = entriesItems
    for (let i = newItems.length - 1; i >= 0; i--) {
      for (let j = 0; j < items.length; j++) {
        if (newItems[i]?.id === items[j]?.id) {
          newItems.splice(i, 1)
        }
      }
    }
    setEntriesItems([...newItems])
    for (let j = 0; j < items.length; j++) {
      const newItem = {
        services: { ...items[j], value: 1 },
        value: 1,
      }
      newItems.push(newItem as unknown as IEntries) //TODO: not working func
    }
    setEntriesItems([...newItems])
  }

  const groups = groupedServices
    ?.map(group => {
      return (
        <CatalogGroup
          entriesItems={entriesItems}
          setEntriesItems={setEntriesItems}
          key={group.id}
          group={group}
          handleDeleteEntries={handleDeleteEntries}
          handleAddEntries={handleAddEntries}
        />
      )
    })
    .filter(element => element !== null)

  const secondColumnStart = Math.round(groups.length / 2)
  return !mobile ? (
    <Content>
      <LeftColumn>{groups.slice(0, secondColumnStart)}</LeftColumn>
      <RightColumn>{groups.slice(secondColumnStart)}</RightColumn>
    </Content>
  ) : (
    <Content>{groups}</Content>
  )
}

export default EditSalonServices
