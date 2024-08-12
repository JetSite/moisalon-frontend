import MenuCards from './components/MenuCards'
import {
  Wrapper,
  Info,
  Logo,
  Text,
  Title,
  Subtitle,
  ProfilesButton,
  Button,
  Item,
  Container,
  Avatar,
  Content,
  Name,
  Type,
  Wrap,
} from './styles'
import Link from 'next/link'
import { cyrToTranslit } from '../../../utils/translit'
import { PHOTO_URL } from '../../../api/variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react'
import { ITab } from 'src/components/ui/TabsSlider'
import { IMasterCabinetTab } from 'src/components/pages/Master/MasterCabinet'
import { IUser } from 'src/types/me'
import { ISetState } from 'src/types/common'
import EmptyListItem, {
  TypeItem,
} from '../Cabinet/components/CabinetProfiles/new_components/EmptyListItem'
import { IBrand } from 'src/types/brands'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import DeleteEntityPopup from '../Cabinet/components/CabinetProfiles/new_components/EmptyDeletePopup'

interface Props {
  setActiveTab: ISetState<string>
  tabs: IMasterCabinetTab[]
  toggle: boolean
  setToggle: ISetState<boolean>
  user: IUser
}

const CabinetHeaderMobile: FC<Props> = ({
  user,
  setActiveTab,
  tabs,
  toggle,
  setToggle,
}) => {
  if (!user || !user.owner) return null
  const { salons, masters, brands } = user.owner
  const { city } = useAuthStore(getStoreData)

  const [openPopup, setOpenPopup] = useState(false)
  const [deleteItem, setDeleteItem] = useState<
    IMaster | ISalon | IBrand | null
  >(null)
  const [deleteItemType, setDeleteItemType] = useState<TypeItem | null>(null)

  const handeleDeleteOpenPopup = (
    e: MouseEvent<HTMLButtonElement>,
    item: IMaster | ISalon | IBrand,
    type: TypeItem,
  ) => {
    e.stopPropagation()
    e.preventDefault()
    setDeleteItem(item)
    setDeleteItemType(type)
    setOpenPopup(true)
  }

  return (
    <Wrapper>
      <Info>
        <Logo
          url={
            user.info.avatar
              ? `${PHOTO_URL}${user.info.avatar.url}`
              : '/empty-photo.svg'
          }
        />
        <Text>
          <Title>{user.info.username}</Title>
          <Subtitle>Кабинет пользователя</Subtitle>
          {salons?.length || masters?.length || brands?.length ? (
            <ProfilesButton toggle={toggle} onClick={() => setToggle(!toggle)}>
              Мои профили
            </ProfilesButton>
          ) : null}
        </Text>
      </Info>
      {masters && toggle ? (
        <Wrap>
          {!!masters && !!masters.length
            ? masters.map(item => (
                <EmptyListItem
                  key={item.id}
                  item={item}
                  itemType="master"
                  citySlug={item.city?.slug || city.slug}
                  handeleDeleteOpenPopup={handeleDeleteOpenPopup}
                />
              ))
            : null}
          {!!salons && salons.length
            ? salons.map(item => (
                <EmptyListItem
                  key={item.id}
                  item={item}
                  itemType="salon"
                  citySlug={item.city?.slug || city.slug}
                  handeleDeleteOpenPopup={handeleDeleteOpenPopup}
                />
              ))
            : null}
          {!!brands && brands.length
            ? brands.map(item => (
                <EmptyListItem
                  key={item.id}
                  item={item}
                  itemType="brand"
                  citySlug={item.city?.slug || city.slug}
                  handeleDeleteOpenPopup={handeleDeleteOpenPopup}
                />
              ))
            : null}
        </Wrap>
      ) : null}
      <Button
        onClick={() => {
          setActiveTab('profiles')
          setToggle(false)
        }}
      >
        Добавить профиль
      </Button>
      <MenuCards
        tabs={tabs}
        setToggle={setToggle}
        setActiveTab={setActiveTab}
      />
      {deleteItem && deleteItemType && (
        <DeleteEntityPopup
          isOpen={openPopup}
          onClose={() => setOpenPopup(false)}
          deleteItem={deleteItem}
          deleteItemType={deleteItemType}
        />
      )}
    </Wrapper>
  )
}

export default CabinetHeaderMobile
