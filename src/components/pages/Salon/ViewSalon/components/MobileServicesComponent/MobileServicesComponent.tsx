import { useState, useMemo, FC } from 'react'
import { CatalogGroup } from './CatalogGroup'
import { MainContainer } from '../../../../../../styles/common'
import {
  Wrapper,
  Top,
  Title,
  Count,
  Content,
  NoServicesText,
  TitleWrap,
} from './styles'
import { useMutation } from '@apollo/client'
import EditIcons from '../../../../../ui/EditIcons'
import { updateSalonServicesMutation } from '../../../../../../_graphql-legacy/salon/updateSalonServicesMutation'
import EditSalonServices from '../../../EditSalonServices'
import { convertServiceIdsToCatalogEntries } from '../../../../../../utils/serviceCatalog'
import { IGroupedCategories } from 'src/utils/getGrupedServices'
import { ISalonPage } from 'src/types/salon'
import { IApolloRefetch, IID } from 'src/types/common'

interface Props {
  groupedServices: IGroupedCategories[]
  isOwner: boolean
  salon: ISalonPage
  refetchSalon: IApolloRefetch
}

const MobileServicesComponent: FC<Props> = ({
  groupedServices,
  isOwner,
  salon,
  refetchSalon,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const entries = useMemo(
    () => convertServiceIdsToCatalogEntries(groupedServices),
    [groupedServices],
  )
  const [entriesItems, setEntriesItems] =
    useState<{ id: IID; value: number }[]>(entries)

  const [updateServices] = useMutation(updateSalonServicesMutation, {
    onCompleted: () => {
      refetchSalon()
    },
  })

  const handleEditConfirm = () => {
    var services = entriesItems?.filter(s => s.value !== 0)?.map(s => s.id)
    updateServices({
      variables: {
        salonId: salon?.id,
        input: {
          services,
        },
      },
    })
  }

  const categories = groupedServices
    .map(group => {
      if (group?.services === undefined) {
        return null
      }

      return (
        <CatalogGroup key={group.id} group={group} services={groupedServices} />
      )
    })
    .filter(element => element !== null)

  // if (groups.length === 0) {
  //   return null;
  // }

  return (
    <MainContainer id="services">
      <Wrapper>
        <Top>
          <TitleWrap>
            <Title>Для мастеров</Title>
            {isOwner && (
              <EditIcons
                handleEditConfirm={handleEditConfirm}
                setIsEditing={setIsEditing}
              />
            )}
          </TitleWrap>
          <Count>{groupedServices.length ? salon.services.length : 0}</Count>
        </Top>
        {!isEditing ? (
          groupedServices?.length ? (
            <Content>{categories}</Content>
          ) : (
            <NoServicesText>
              Нет добавленных услуг. Нажмите на карандаш, чтобы добавить услуги
            </NoServicesText>
          )
        ) : (
          <EditSalonServices
            groupedServices={groupedServices}
            setEntriesItems={setEntriesItems}
            entriesItems={entriesItems}
            mobile
          />
        )}
      </Wrapper>
    </MainContainer>
  )
}

export default MobileServicesComponent
