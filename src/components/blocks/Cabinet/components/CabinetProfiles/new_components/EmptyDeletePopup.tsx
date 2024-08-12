import { FC } from 'react'
import { useMutation } from '@apollo/client'
import Popup from 'src/components/ui/Popup'
import Button from 'src/components/ui/Button'
import { UPDATE_MASTER } from 'src/api/graphql/master/mutations/updateMaster'
import { UPDATE_SALON } from 'src/api/graphql/salon/mutations/updateSalon'
import { UPDATE_BRAND } from 'src/api/graphql/brand/mutations/updateBrand'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { IID } from 'src/types/common'
import { TypeItem } from './EmptyListItem'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'

interface DeleteEntityPopupProps {
  isOpen: boolean
  onClose: () => void
  deleteItem: IMaster | ISalon | IBrand | null
  deleteItemType: TypeItem | null
}

const DeleteEntityPopup: FC<DeleteEntityPopupProps> = ({
  isOpen,
  onClose,
  deleteItem,
  deleteItemType,
}) => {
  const { user } = useAuthStore(getStoreData)
  const { setUser } = useAuthStore(getStoreEvent)

  if (!user || !user.owner) return null

  const deleteCB = () => {
    onClose()
  }

  const [updateMaster, { loading: masterLoading }] = useMutation(
    UPDATE_MASTER,
    {
      onCompleted: deleteCB,
    },
  )
  const [updateSalon, { loading: salonLoading }] = useMutation(UPDATE_SALON, {
    onCompleted: deleteCB,
  })
  const [updateBrand, { loading: brandLoading }] = useMutation(UPDATE_BRAND, {
    onCompleted: deleteCB,
  })

  const handleDelete = (id: IID, type: TypeItem) => {
    switch (type) {
      case 'master':
        updateMaster({
          variables: {
            masterId: id,
            input: { publishedAt: null },
          },
        })
        const newMasters = user.owner.masters?.filter(e => e.id !== id)
        setUser({ ...user, owner: { ...user.owner, masters: newMasters } })
        break
      case 'salon':
        updateSalon({
          variables: {
            salonId: id,
            input: { publishedAt: null },
          },
        })
        const newSalons = user.owner.salons?.filter(e => e.id !== id)
        setUser({ ...user, owner: { ...user.owner, salons: newSalons } })
        break
      case 'brand':
        updateBrand({
          variables: {
            brandId: id,
            input: { publishedAt: null },
          },
        })
        const newBrands = user.owner.brands?.filter(e => e.id !== id)
        setUser({ ...user, owner: { ...user.owner, brands: newBrands } })
        break
      default:
        console.error(`Неизвестный тип: ${type}`)
    }
  }

  if (!deleteItem || !deleteItemType) return null

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={
        <p>
          Вы действительно хотите удалить <span>{deleteItem.name}</span>?
        </p>
      }
      description=""
    >
      <p></p>
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
      <Button onClick={onClose} style={{ marginTop: 25 }} variant="red">
        Закрыть
      </Button>
    </Popup>
  )
}

export default DeleteEntityPopup
