import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import MobileCatalogGroupForClient from './MobileCatalogGroupForClient'
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
import EditSalonServicesForClient from '../../../../Salon/EditSalonServicesForClient'
import { IMaster } from 'src/types/masters'
import { IGroupedServices } from 'src/types'
import { IService, IServiceCategory, IServices } from 'src/types/services'
import { UPDATE_MASTER } from 'src/api/graphql/master/mutations/updateMaster'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISalon } from 'src/types/salon'
import { UPDATE_SALON } from 'src/api/graphql/salon/mutations/updateSalon'

interface Props {
  servicesData: IGroupedServices[]
  isOwner: boolean
  entries: IMaster | ISalon
  allServices: IServiceCategory[]
  setServices: Dispatch<SetStateAction<IServices[]>>
  masterPage?: boolean
  type?: 'master' | 'salon'
  serviceType?: 'default' | 'forMaster'
  title?: string
}

const MobileServicesComponent: FC<Props> = ({
  servicesData,
  isOwner,
  entries,
  allServices,
  setServices,
  masterPage = false,
  type = 'master',
  serviceType = 'default',
  title = 'Услуги',
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [entriesItems, setEntriesItems] = useState<IService[]>([])
  const servicesCount = servicesData?.reduce((acc, category) => {
    return acc + category.services.length
  }, 0)

  const [updateMaster] = useMutation(UPDATE_MASTER)
  const [updateSalon] = useMutation(UPDATE_SALON)

  useEffect(() => {
    const entriesSerivces: IService[] = []
    servicesData?.map(category => {
      category.services.map(service => {
        entriesSerivces.push(service.service)
      })
    })
    setEntriesItems(entriesSerivces)
  }, [servicesData])

  const handleEditConfirm = async () => {
    const services = entriesItems.map(service => {
      return { service: service.id }
    })
    const input =
      serviceType === 'forMaster'
        ? { servicesM: services }
        : { services: services }
    const response =
      type === 'master'
        ? await updateMaster({
            variables: {
              masterId: entries.id,
              input,
            },
          })
        : type === 'salon'
        ? await updateSalon({
            variables: {
              salonId: entries.id,
              input,
            },
          })
        : null

    if (response?.data?.updateMaster?.data?.id) {
      const newServices = flattenStrapiResponse(
        response?.data?.updateMaster?.data?.attributes?.services,
      )
      setServices(newServices)
    } else if (response?.data?.updateSalon?.data?.id) {
      const newServices =
        serviceType === 'forMaster'
          ? flattenStrapiResponse(
              response?.data?.updateSalon?.data?.attributes?.servicesM,
            )
          : flattenStrapiResponse(
              response?.data?.updateSalon?.data?.attributes?.services,
            )
      setServices(newServices)
    }
    setIsEditing(false)
  }

  const groups = servicesData?.map((serviceBlock, idx) => {
    return (
      <MobileCatalogGroupForClient
        entriesItems={entriesItems}
        key={idx}
        serviceBlock={serviceBlock}
        masterPage={masterPage}
      />
    )
  })

  return (
    <MainContainer id="services">
      <Wrapper masterPage={masterPage}>
        <Top masterPage={masterPage}>
          <TitleWrap>
            <Title masterPage={masterPage}>{title}</Title>
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
            services={allServices}
            mobile
          />
        )}
      </Wrapper>
    </MainContainer>
  )
}

export default MobileServicesComponent
