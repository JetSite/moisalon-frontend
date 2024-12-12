import { MouseEvent, useState } from 'react'
import { Wrapper, Title, SubTitle, MobileWrapper, ButtonStyled } from './styles'
import CreateProfiles from '../CreateProfiles'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import EmptyListItem, { TypeItem } from './new_components/EmptyListItem'
import DeleteEntityPopup from './new_components/EmptyDeletePopup'

const CabinetProfiles = () => {
  const { city, user } = useAuthStore(getStoreData)
  const [openCreate, setOpenCreate] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [deleteItem, setDeleteItem] = useState<
    IMaster | ISalon | IBrand | null
  >(null)
  const [deleteItemType, setDeleteItemType] = useState<TypeItem | null>(null)

  if (!user || !user.owner) return null
  const { salons, masters, brands } = user.owner

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
    <>
      <Wrapper>
        <Title>{user.info.username}</Title>
        <SubTitle>Пользователь </SubTitle>
        <ul>
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
        </ul>
        {!openCreate ? (
          <ButtonStyled onClick={() => setOpenCreate(true)}>
            Добавить профиль
          </ButtonStyled>
        ) : (
          <CreateProfiles user={user} />
        )}
        {deleteItem && deleteItemType && (
          <DeleteEntityPopup
            isOpen={openPopup}
            onClose={() => setOpenPopup(false)}
            deleteItem={deleteItem}
            deleteItemType={deleteItemType}
          />
        )}
      </Wrapper>
      <MobileWrapper>
        <CreateProfiles user={user} />
      </MobileWrapper>
    </>
  )
}

export default CabinetProfiles
