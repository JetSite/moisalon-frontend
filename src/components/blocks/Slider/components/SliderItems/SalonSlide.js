import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SalonCard from '../../../SalonCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import { CityContext } from '../../../../../searchContext'
import Button from '../../../../ui/Button'
import { DeleteSalon } from './styles'

const SalonSlide = ({ item, isEditing, deleteFunction }) => {
  const [city] = useContext(CityContext)
  const router = useRouter()
  const landingMaster = router.pathname === '/for_master'

  return (
    <Link
      href={
        !landingMaster
          ? `/${cyrToTranslit(item?.address?.city)}/salon/${
              item?.seo?.slug || item?.id
            }`
          : `/${cyrToTranslit(city)}/rent`
      }
    >
      <SalonCard
        item={item.attributes}
        shareLink={`https://moi.salon/${cyrToTranslit(
          item?.address?.city,
        )}/salon/${item?.seo?.slug || item?.id}`}
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
