import { useState } from 'react'
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
import EditIcons from '../../../../../ui/EditIcons/index.tsx'
import { updateServiceMasterMutation } from '../../../../../../_graphql-legacy/master/updateServiceMasterMutation'
import EditSalonServicesForClient from '../../../../../pages/Salon/EditSalonServicesForClient'

const MobileServicesComponent = ({
  servicesData,
  isOwner,
  master,
  masterPage = false,
  // refetchMaster,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [entriesItems, setEntriesItems] = useState(servicesData)
  const servicesCount = servicesData?.reduce((acc, category) => {
    return acc + category.services.length
  }, 0)

  const handleEditConfirm = () => {}

  const groups = servicesData?.map((serviceBlock, idx) => {
    return (
      <MobileCatalogGroupForClient
        masterPage={masterPage}
        withPrice
        key={idx}
        serviceBlock={serviceBlock}
        entriesItems={entriesItems}
      />
    )
  })

  return (
    <MainContainer id="services">
      <Wrapper masterPage={masterPage}>
        <Top masterPage={masterPage}>
          <TitleWrap>
            <Title masterPage={masterPage}>Услуги</Title>
            {isOwner && (
              <EditIcons
                handleEditConfirm={handleEditConfirm}
                setIsEditing={() => {}}
              />
            )}
          </TitleWrap>
          <Count>{servicesCount || 0}</Count>
        </Top>
        {!isEditing ? (
          groups?.length ? (
            <Content>{groups}</Content>
          ) : (
            <NoServicesText>Мастер пока не добавил услуги</NoServicesText>
          )
        ) : (
          <EditSalonServicesForClient
            masterPage={masterPage}
            setEntriesItems={setEntriesItems}
            entriesItems={entriesItems}
            services={services}
            salonServicesMasterCatalog={salonServicesMasterCatalog}
            mobile
          />
        )}
      </Wrapper>
    </MainContainer>
  )
}

export default MobileServicesComponent
