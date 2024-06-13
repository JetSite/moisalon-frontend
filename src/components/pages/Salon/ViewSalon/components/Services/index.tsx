import {
  useCallback,
  useState,
  useMemo,
  FC,
  Dispatch,
  SetStateAction,
} from 'react'
import { useMutation } from '@apollo/client'
import { CatalogGroup } from '../CatalogGroup'
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
import { createRequestToSalon } from '../../../../../../_graphql-legacy/salon/createRequestToSalon'
import EditIcons from '../../../../../ui/EditIcons/index'
import { updateSalonServicesMutation } from '../../../../../../_graphql-legacy/salon/updateSalonServicesMutation'
import { ISalonPage } from 'src/types/salon'
import { IApolloRefetch, IID, ISetState } from 'src/types/common'
import { IGroupedCategories } from 'src/utils/getGrupedServices'

export interface IEntries {
  id: IID
  value: number
}

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
  const [openWritePopup, setOpenWritePopup] = useState<boolean>(false)
  const [openSuccessPopup, setOpenSuccessPopup] = useState<boolean>(false)

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [updateServices] = useMutation(updateSalonServicesMutation, {
    onCompleted: () => {
      refetchSalon()
    },
  })

  const handleEditConfirm = () => {}

  const handleCloseWritePopup = useCallback(() => {
    setOpenWritePopup(false)
  }, [setOpenWritePopup])

  const closeSuccessPopup = useCallback(() => {
    setOpenSuccessPopup(false)
  }, [setOpenSuccessPopup])

  const [createRequestPopup] = useMutation(createRequestToSalon, {
    onCompleted: () => {
      setOpenWritePopup(false)
      setOpenSuccessPopup(true)
    },
  })

  // const onSubmit = (values) => {
  //   createRequestPopup({
  //     variables: {
  //       input: {
  //         salonId: salon?.id,
  //         ...values,
  //       },
  //     },
  //   });
  // };

  const groups = groupedServices.map(group => {
    return <CatalogGroup key={group.id} group={group} />
  })

  // if (groups.length === 0) {
  //   return null;
  // }

  const secondColumnStart = Math.round(groupedServices.length / 2)

  const phone = salon?.salonPhones && salon?.salonPhones[0]?.phoneNumber

  return (
    <MainContainer id="services">
      <Wrapper>
        <Top>
          <Title>
            Для мастеров
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
            <NoServicesText>
              Нет добавленных услуг. Нажмите на карандаш, чтобы добавить услуги
            </NoServicesText>
          )
        ) : (
          <></>
          // <EditSalonServices
          //   setEntriesItems={setEntriesItems}
          //   entriesItems={entriesItems}
          //   entries={entries}
          //   salonWorkplacesServicesCatalog={salonWorkplacesServicesCatalog}
          // />
        )}
        <noindex>
          {salon?.onlineBookingUrl ? (
            <PhoneButton
              href={salon?.onlineBookingUrl}
              rel="nofollow"
              target="_blank"
            >
              Онлайн запись
            </PhoneButton>
          ) : (
            <PhoneButton href={`tel:${phone}`}>Онлайн запись</PhoneButton>
          )}
        </noindex>
        {/* <WritePopup
            user={user}
            open={openWritePopup}
            handleClose={handleCloseWritePopup}
            onSubmit={onSubmit}
          />
          <Popup
            isOpen={openSuccessPopup}
            onClose={closeSuccessPopup}
            title="Ваше сообщение отправлено"
            description={`Администратор салона свяжется с вами в ближайшее время!`}
          >
            <Button onClick={closeSuccessPopup} className="btn--outline">
              Закрыть
            </Button>
          </Popup> */}
      </Wrapper>
    </MainContainer>
  )
}

export default Services
