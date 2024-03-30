import { useMemo, useState } from 'react'
import { convertServiceIdsToCatalogEntries } from '../../../../../../utils/serviceCatalog'
import { useMutation } from '@apollo/client'
import { CatalogGroup } from '../CatalogGroup'
import { MainContainer } from '../../../../../../styles/common'
import {
  Wrapper,
  Top,
  Title,
  Count,
  Content,
  LeftColumn,
  RightColumn,
  PhoneButton,
  NoServicesText,
} from './styles'
import EditIcons from '../../../../../ui/EditIcons/index.tsx'
import EditMasterServices from '../../../../../blocks/EditMasterServices'
import { masterQuery } from '../../../../../../_graphql-legacy/master/masterQuery'
import { updateMasterServicesMutation } from '../../../../../../_graphql-legacy/master/updateMasterServicesMutation'

const ServicesComponent = ({
  services,
  isOwner,
  master,
  masterSpecializationsCatalog,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const entries = useMemo(
    () => convertServiceIdsToCatalogEntries(services),
    [services],
  )
  const [entriesItems, setEntriesItems] = useState(entries)

  const [updateServices] = useMutation(updateMasterServicesMutation, {
    refetchQueries: [
      {
        query: masterQuery,
        variables: {
          id: master?.id,
        },
      },
    ],
  })

  const handleEditConfirm = () => {
    var services = entriesItems?.filter(s => s.value !== 0)?.map(s => s.id)
    const mutation = {
      variables: {
        input: {
          specializationsServices: services,
        },
      },
    }
    updateServices(mutation)
  }

  const groups = masterSpecializationsCatalog?.groups
    ?.map(group => {
      if (group.items === undefined || group.items === null) {
        return null
      }

      const items = group.items.filter(item =>
        entries.find(entry => entry.id === item.id),
      )

      if (items.length === 0) {
        return null
      }

      return <CatalogGroup key={group.id} group={group} entries={entries} />
    })
    ?.filter(element => element !== null)

  const secondColumnStart = Math.round(groups.length / 2)

  const phone = master?.phone?.phoneNumber

  return (
    <MainContainer id="services">
      <Wrapper>
        <Top>
          <Title>
            Услуги
            {isOwner && (
              <EditIcons
                handleEditConfirm={handleEditConfirm}
                setIsEditing={setIsEditing}
              />
            )}
          </Title>
          <Count>{services.length}</Count>
        </Top>
        {!isEditing ? (
          groups.length ? (
            <Content>
              <LeftColumn>{groups.slice(0, secondColumnStart)}</LeftColumn>
              <RightColumn>{groups.slice(secondColumnStart)}</RightColumn>
            </Content>
          ) : (
            <NoServicesText>
              Нет добавленных услуг. Нажмите на карандаш, чтобы добавить услуги
            </NoServicesText>
          )
        ) : (
          <EditMasterServices
            setEntriesItems={setEntriesItems}
            entriesItems={entriesItems}
            master={master}
            entries={entries}
            masterSpecializationsCatalog={masterSpecializationsCatalog}
          />
        )}
        <noindex>
          {master?.onlineBookingUrl ? (
            <PhoneButton
              href={master?.onlineBookingUrl}
              target="_blank"
              rel="nofollow"
            >
              Онлайн запись
            </PhoneButton>
          ) : (
            <PhoneButton href={`tel:${phone}`}>Позвонить мастеру</PhoneButton>
          )}
        </noindex>
      </Wrapper>
    </MainContainer>
  )
}

export default ServicesComponent
