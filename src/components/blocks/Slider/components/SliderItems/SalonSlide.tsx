import { FC, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SalonCard from '../../../SalonCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import { CityContext } from '../../../../../searchContext'
import Button from '../../../../ui/Button'
import { DeleteSalon } from './styles'
import { IDeleteFunction } from './BrandSlide'
import { ISalon } from 'src/types/salon'

interface Props {
  item: ISalon
  isEditing: boolean
  deleteFunction: IDeleteFunction
}

const SalonSlide: FC<Props> = ({ item, isEditing, deleteFunction }) => {
  const [city] = useContext(CityContext)
  const router = useRouter()
  const landingMaster = router.pathname === '/for_master'

  return (
    <Link
      href={
        !landingMaster
          ? `/${cyrToTranslit(item?.cities?.citySlug)}/salon/${item?.id}`
          : `/${cyrToTranslit(city)}/rent`
      }
    >
      <SalonCard
        item={item}
        shareLink={`https://moi.salon/${cyrToTranslit(
          item.cities?.citySlug,
        )}/salon/${item?.id}`}
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
