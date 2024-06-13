import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CatalogGroupForClient } from './components/CatalogGroupForClient'
import { MainContainer } from '../../../../../../styles/common'
import {
  Wrapper,
  Top,
  Title,
  Count,
  Content,
  PhoneButton,
  LeftColumn,
  RightColumn,
  NoServicesText,
} from './styled'
import EditIcons from '../../../../../ui/EditIcons'
import EditSalonServicesForClient from '../../../EditSalonServicesForClient'
import { updateSalonServiceMasterMutation } from '../../../../../../_graphql-legacy/salon/updateSalonMasterServiceMutation'
import {
  IGroupedCategories,
  IGroupedService,
} from 'src/utils/getGrupedServices'
import { ISalonPage } from 'src/types/salon'
import { IApolloRefetch, ISetState } from 'src/types/common'

interface Props {
  groupedServices: IGroupedCategories[]
  isOwner: boolean
  edit: boolean
  setEdit: ISetState<boolean>
  salon: ISalonPage
  count: number
  refetchSalon: IApolloRefetch
}

const Services: FC<Props> = ({
  groupedServices,
  isOwner,
  edit,
  setEdit,
  salon,
  count,
  refetchSalon,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [updateServices] = useMutation(updateSalonServiceMasterMutation, {
    onCompleted: () => {
      refetchSalon()
    },
  })

  const handleEditConfirm = () => {}

  const groups = groupedServices
    .map(group => {
      return <CatalogGroupForClient withPrice key={group.id} group={group} />
    })
    .filter(element => element !== null)

  const secondColumnStart = Math.round(groups.length / 2)

  const phone = salon.salonPhones && salon?.salonPhones[0]?.phoneNumber

  return (
    <MainContainer id="services">
      <Wrapper>
        <Top>
          <Title>
            Для клиентов
            {isOwner && (
              <EditIcons
                handleEditConfirm={handleEditConfirm}
                setIsEditing={setIsEditing}
              />
            )}
          </Title>
          <Count>{count || 0}</Count>
        </Top>
        {!isEditing ? (
          groups?.length ? (
            <Content>
              <LeftColumn>{groups.slice(0, secondColumnStart)}</LeftColumn>
              <RightColumn>{groups.slice(secondColumnStart)}</RightColumn>
            </Content>
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
          // />
        )}
        <noindex>
          {salon?.onlineBookingUrl ? (
            <PhoneButton
              href={salon?.onlineBookingUrl}
              target="_blank"
              rel="nofollow"
            >
              Онлайн запись
            </PhoneButton>
          ) : (
            <PhoneButton href={`tel:${phone}`}>Онлайн запись</PhoneButton>
          )}
        </noindex>
      </Wrapper>
    </MainContainer>
  )
}

export default Services
