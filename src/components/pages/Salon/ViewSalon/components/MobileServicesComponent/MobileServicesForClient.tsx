import { FC, useState } from 'react'
import { MobileCatalogGroupForClient } from './MobileCatalogGroupForClient'
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
import catalogOrDefault from '../../../../../../utils/catalogOrDefault'
import EditIcons from '../../../../../ui/EditIcons'
import { updateSalonServiceMasterMutation } from '../../../../../../_graphql-legacy/salon/updateSalonMasterServiceMutation'
import EditSalonServicesForClient from '../../../EditSalonServicesForClient'
import { IGroupedCategories } from 'src/utils/getGrupedServices'
import { ISalonPage } from 'src/types/salon'
import { IApolloRefetch } from 'src/types/common'

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

  const [updateServices] = useMutation(updateSalonServiceMasterMutation, {
    onCompleted: () => {
      refetchSalon()
    },
  })

  const handleEditConfirm = () => {}

  const groups = groupedServices
    .map(group => {
      return (
        <MobileCatalogGroupForClient withPrice key={group.id} group={group} />
      )
    })
    .filter(element => element !== null)

  return (
    <MainContainer id="services">
      <Wrapper>
        <Top>
          <TitleWrap>
            <Title>Для клиентов</Title>
            {isOwner && (
              <EditIcons
                handleEditConfirm={handleEditConfirm}
                setIsEditing={setIsEditing}
              />
            )}
          </TitleWrap>
          <Count>{groupedServices?.length || 0}</Count>
        </Top>
        {!isEditing ? (
          groups?.length ? (
            <Content>{groups}</Content>
          ) : (
            <NoServicesText>Салон пока не добавил услуги</NoServicesText>
          )
        ) : (
          <></>
          // <EditSalonServicesForClient
          //   setEntriesItems={setEntriesItems}
          //   entriesItems={entriesItems}
          //   services={services}
          //   salonServicesMasterCatalog={salonServicesMasterCatalog}
          //   mobile
          // />
        )}
      </Wrapper>
    </MainContainer>
  )
}

export default MobileServicesComponent
