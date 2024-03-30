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
  serviceCategories,
  isOwner,
  master,
  masterPage = false,
  // refetchMaster,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [entriesItems, setEntriesItems] = useState(serviceCategories)
  const servicesCount = serviceCategories?.reduce((acc, category) => {
    return acc + category.services.length
  }, 0)

  // const [updateServices] = useMutation(updateServiceMasterMutation, {
  //   onCompleted: () => {
  //     refetchMaster()
  //   },
  // })

  const handleEditConfirm = () => {
    updateServices({
      variables: {
        input: {
          masterId: master?.id,
          serviceMaster: entriesItems,
        },
      },
    })
  }

  const groups = serviceCategories?.map((serviceCategory, idx) => {
    return (
      <MobileCatalogGroupForClient
        masterPage={masterPage}
        withPrice
        key={idx}
        serviceCategory={serviceCategory}
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
                setIsEditing={setIsEditing}
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
