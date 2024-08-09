import { MouseEvent, useState } from 'react'
import Link from 'next/link'
import {
  Wrapper,
  Item,
  Title,
  SubTitle,
  Container,
  Avatar,
  Content,
  Name,
  Type,
  MobileWrapper,
  DeleteButton,
  TrashIconStyled,
  ButtonStyled,
} from './styles'
import CreateProfiles from '../CreateProfiles'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { PHOTO_URL } from '../../../../../api/variables'
import { TrashIcon } from 'src/components/ui/Icons/Trash'
import { IID } from 'src/types/common'
import { useMutation } from '@apollo/client'
import { UPDATE_MASTER } from 'src/api/graphql/master/mutations/updateMaster'
import { UPDATE_SALON } from 'src/api/graphql/salon/mutations/updateSalon'
import { UPDATE_BRAND } from 'src/api/graphql/brand/mutations/updateBrand'
import Error from 'src/components/blocks/Form/Error'
import Popup from 'src/components/ui/Popup'
import Button from 'src/components/ui/Button'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'

type TypeItem = 'master' | 'salon' | 'brand'

const CabinetProfiles = () => {
  const { city, user } = useAuthStore(getStoreData)
  const { setUser } = useAuthStore(getStoreEvent)

  const salons = user?.owner?.salons
  const masters = user?.owner?.masters
  const brands = user?.owner?.brands
  const [openCreate, setOpenCreate] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [deleteItem, setDeleteItem] = useState<
    IMaster | ISalon | IBrand | null
  >(null)
  const [deleteItemType, setDeleteItemType] = useState<TypeItem | null>(null)

  if (!user || !user.owner) return null

  const deleteCB = () => {
    setOpenPopup(false)
  }

  const [updateMaster, { loading: masterLoading }] = useMutation(
    UPDATE_MASTER,
    { onCompleted: deleteCB },
  )
  const [updateSalon, { loading: salonLoading }] = useMutation(UPDATE_SALON, {
    onCompleted: deleteCB,
  })
  const [updateBrand, { loading: brandLoading }] = useMutation(UPDATE_BRAND, {
    onCompleted: deleteCB,
  })

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

  const handleDelete = (id: IID, type: TypeItem) => {
    switch (type) {
      case 'master':
        console.log(`Удаление мастера с ID: ${id}`)
        updateMaster({
          variables: {
            masterId: id,
            input: { publishedAt: null },
          },
        })
        const newMasters = masters?.filter(e => e.id !== id)
        setUser({ ...user, owner: { ...user.owner, masters: newMasters } })
        break
      case 'salon':
        console.log(`Удаление салона с ID: ${id}`)
        updateSalon({
          variables: {
            salonId: id,
            input: { publishedAt: null },
          },
        })
        const newSalon = salons?.filter(e => e.id !== id)
        setUser({ ...user, owner: { ...user.owner, salons: newSalon } })
        break
      case 'brand':
        console.log(`Удаление бренда с ID: ${id}`)
        updateBrand({
          variables: {
            brandId: id,
            input: { publishedAt: null },
          },
        })
        const newBrands = brands?.filter(e => e.id !== id)
        setUser({ ...user, owner: { ...user.owner, brands: newBrands } })
        break
      default:
        console.error(`Неизвестный тип: ${type}`)
    }
  }

  return (
    <>
      <Wrapper>
        <Title>{user.info.username}</Title>
        <SubTitle>Пользователь </SubTitle>
        {!!masters && !!masters.length ? (
          <>
            {masters.map(item => (
              <Link
                key={item.id}
                href={`/${masters[0]?.city?.slug || city?.slug}/master/${
                  item.id
                }`}
              >
                <Item>
                  <Container>
                    <Avatar
                      alt="avatar"
                      src={
                        `${PHOTO_URL}${item?.photo?.url}` || 'empty-photo.svg'
                      }
                    />
                    <Content>
                      <Name>{item.name}</Name>
                      <Type>Профиль мастера</Type>
                    </Content>
                    <DeleteButton
                      onClick={e => handeleDeleteOpenPopup(e, item, 'master')}
                    >
                      <TrashIconStyled />
                    </DeleteButton>
                  </Container>
                </Item>
              </Link>
            ))}
          </>
        ) : null}
        {!!salons && salons.length
          ? salons.map(item => (
              <div key={item.id}>
                <Link
                  href={
                    item.workplacesCount
                      ? `/${item.city?.slug || city?.slug}/rent/${item.id}`
                      : `/${item.city?.slug || city?.slug}/salon/${item.id}`
                  }
                >
                  <Item>
                    <Container>
                      <Avatar
                        alt="avatar"
                        src={PHOTO_URL + item?.logo?.url || 'empty-photo.svg'}
                      />
                      <Content>
                        <Name>{item.name}</Name>
                        <Type>
                          {item?.workplacesCount
                            ? 'Профиль салона арендодателя'
                            : 'Профиль салона'}
                        </Type>
                      </Content>
                    </Container>
                    <DeleteButton
                      onClick={e => handeleDeleteOpenPopup(e, item, 'salon')}
                    >
                      <TrashIconStyled />
                    </DeleteButton>
                  </Item>
                </Link>
              </div>
            ))
          : null}
        {!!brands && brands.length
          ? brands.map(item => (
              <div key={item.id}>
                <Link
                  href={`/${item.city?.slug || city?.slug}/brand/${item.id}`}
                >
                  <Item>
                    <Container>
                      <Avatar
                        alt="avatar"
                        src={
                          item.logo
                            ? `${PHOTO_URL}${item.logo.url}`
                            : 'empty-photo.svg'
                        }
                      />
                      <Content>
                        <Name>{item.name}</Name>
                        <Type>Профиль бренда</Type>
                      </Content>
                      <DeleteButton
                        onClick={e => handeleDeleteOpenPopup(e, item, 'brand')}
                      >
                        <TrashIconStyled />
                      </DeleteButton>
                    </Container>
                  </Item>
                </Link>
              </div>
            ))
          : null}
        {!openCreate ? (
          <ButtonStyled onClick={() => setOpenCreate(true)}>
            Добавить профиль
          </ButtonStyled>
        ) : (
          <CreateProfiles user={user} />
        )}
        {deleteItem && deleteItemType && (
          <Popup
            isOpen={openPopup}
            onClose={() => setOpenPopup(false)}
            title=""
            description=""
            content={() => {
              return (
                <p>
                  Вы действительно хотите удалить <span>{deleteItem.name}</span>
                </p>
              )
            }}
          >
            <Button
              onClick={() => {
                handleDelete(deleteItem.id, deleteItemType)
              }}
              style={{ marginTop: 25 }}
              variant="gray"
              loading={masterLoading || salonLoading || brandLoading}
            >
              Удалить
            </Button>
            <Button
              onClick={() => setOpenPopup(false)}
              style={{ marginTop: 25 }}
              variant="red"
            >
              Закрыть
            </Button>
          </Popup>
        )}
      </Wrapper>
      <MobileWrapper>
        <CreateProfiles user={user} />
      </MobileWrapper>
    </>
  )
}

export default CabinetProfiles
