import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
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
import { updateServiceMasterMutation } from '../../../../../../_graphql-legacy/master/updateServiceMasterMutation'
import { IGroupedServices } from 'src/types'
import { IMaster } from 'src/types/masters'
import EditSalonServicesForClient from '../../../../Salon/EditSalonServicesForClient'
import { IService, IServiceCategory, IServices } from 'src/types/services'
import { UPDATE_MASTER } from 'src/api/graphql/master/mutations/updateMaster'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

interface Props {
  servicesData: IGroupedServices[]
  isOwner: boolean
  master: IMaster
  allServices: IServiceCategory[]
  setServices: Dispatch<SetStateAction<IServices[]>>
}

const Services: FC<Props> = ({
  servicesData,
  isOwner,
  master,
  allServices,
  setServices,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [entriesItems, setEntriesItems] = useState<IService[]>([])
  const servicesCount = servicesData?.reduce((acc, category) => {
    return acc + category.services.length
  }, 0)

  const [updateMaster] = useMutation(UPDATE_MASTER)

  useEffect(() => {
    const masterSerivces: IService[] = []
    servicesData?.map(category => {
      category.services.map(service => {
        masterSerivces.push(service.service)
      })
    })
    setEntriesItems(masterSerivces)
  }, [servicesData])

  const handleEditConfirm = async () => {
    const servicesDataCount = servicesData?.reduce((acc, category) => {
      return acc + category.services.length
    }, 0)
    if (servicesDataCount === entriesItems.length) {
      setIsEditing(false)
      return
    }

    const services = entriesItems.map(service => {
      return { service: service.id }
    })
    const response = await updateMaster({
      variables: {
        masterId: master.id,
        input: {
          services,
        }
      },
    })
    if (response?.data?.updateMaster?.data?.id) {
      const newServices = flattenStrapiResponse(response?.data?.updateMaster?.data?.attributes?.services)
      setServices(newServices)
    }
    setIsEditing(false)
  }

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

  const phone = master?.phone

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
            services={allServices}
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
