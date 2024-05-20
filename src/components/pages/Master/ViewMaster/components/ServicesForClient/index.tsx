import { FC, useState } from 'react'
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
import EditSalonServicesForClient from '../../../../Salon/EditSalonServicesForClient'
import { updateServiceMasterMutation } from '../../../../../../_graphql-legacy/master/updateServiceMasterMutation'
import { IGroupedServices } from 'src/types'
import { IMaster } from 'src/types/masters'
import { ISetState } from 'src/types/common'

interface Props {
  servicesData: IGroupedServices[]
  isOwner: boolean
  master: IMaster
  salonServicesMasterCatalog: any[]
}

const Services: FC<Props> = ({
  servicesData,
  isOwner,
  master,
  salonServicesMasterCatalog,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const [entriesItems, setEntriesItems] = useState(servicesData)
  const servicesCount = servicesData?.reduce((acc, category) => {
    return acc + category.services.length
  }, 0)

  // const [updateServices] = useMutation(updateServiceMasterMutation, {
  //   onCompleted: () => {
  //     masterDataQuery()
  //   },
  // })

  const handleEditConfirm = () => {}

  const groups = servicesData?.map((serviceBlock, idx) => {
    return (
      <CatalogGroupForClient
        entriesItems={entriesItems}
        key={idx}
        serviceBlock={serviceBlock}
      />
    )
  })

  const secondColumnStart = Math.round(groups?.length / 2)

  const phone = master?.masterPhone

  return (
    <MainContainer id="services">
      <Wrapper>
        <Top>
          <Title>
            Услуги
            {isOwner && (
              <EditIcons
                handleEditConfirm={handleEditConfirm}
                setIsEditing={() => {}}
              />
            )}
          </Title>
          <Count>{servicesCount || 0}</Count>
        </Top>
        {!isEditing ? (
          groups?.length ? (
            <Content>
              <LeftColumn>{groups.slice(0, secondColumnStart)}</LeftColumn>
              <RightColumn>{groups.slice(secondColumnStart)}</RightColumn>
            </Content>
          ) : (
            <NoServicesText>Мастер пока не добавил услуги</NoServicesText>
          )
        ) : (
          <EditSalonServicesForClient
            setEntriesItems={setEntriesItems}
            entriesItems={entriesItems}
            services={servicesData}
            salonServicesMasterCatalog={salonServicesMasterCatalog}
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
            <PhoneButton href={`tel:${phone}`}>Онлайн запись</PhoneButton>
          )}
        </noindex>
      </Wrapper>
    </MainContainer>
  )
}

export default Services
