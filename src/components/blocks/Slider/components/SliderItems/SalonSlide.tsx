import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SalonCard from '../../../SalonCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import Button from '../../../../ui/Button'
import { DeleteSalon } from './styles'
import { IDeleteFunction } from './BrandSlide'
import { ISalonPage } from 'src/types/salon'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

interface Props {
  item: ISalonPage
  isEditing: boolean
  deleteFunction: IDeleteFunction
}

const SalonSlide: FC<Props> = ({ item, isEditing, deleteFunction }) => {
  const { city } = useAuthStore(getStoreData)

  const router = useRouter()
  const landingMaster = router.pathname === '/for_master'

  return (
    <Link
      href={
        !landingMaster
          ? `/${cyrToTranslit(city)}/salon/${item?.id}`
          : `/${cyrToTranslit(city)}/rent`
      }
    >
      <SalonCard
        item={item}
        shareLink={`https://moi.salon/${cyrToTranslit(city)}/salon/${item?.id}`}
      />
      {isEditing && (
        <DeleteSalon onClick={() => deleteFunction(item.id)}>
          <Button
            variant="withRoundBorder"
            size="roundMedium"
            font="roundMedium"
            mt="40"
          >
            Больше тут не работаю
          </Button>
        </DeleteSalon>
      )}
    </Link>
  )
}

export default SalonSlide
