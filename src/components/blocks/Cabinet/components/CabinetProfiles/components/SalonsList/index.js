import { useState } from 'react'
import Link from 'next/link'
import SalonItem from './SalonItem'
import Button from '../../../../../../ui/Button'
import { MobileVisible, MobileHidden } from '../../../../../../../styles/common'
import { SalonsContent, Title, ListWrapper } from './styles'

import { cyrToTranslit } from '../../../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const SalonsList = ({ salons, ref3 }) => {
  const [sliceNumber, setSliceNumber] = useState(3)
  const slicedList = salons?.slice(0, sliceNumber)

  const onFetchMore = () => {
    setSliceNumber(sliceNumber + 3)
  }

  const fetchMoreButton =
    sliceNumber <= salons?.length ? (
      <Button
        size="round218"
        font="roundMedium"
        variant="withRoundBorder"
        mt="43"
        onClick={onFetchMore}
      >
        Смотреть далее
      </Button>
    ) : null

  return (
    <SalonsContent ref={ref3} id="salons">
      <Title>Профиль: Салоны которым я управляю</Title>
      <ListWrapper>
        {slicedList?.map(salon => (
          <Link
            href={`/${cyrToTranslit(salon?.address?.city)}/salon/${
              salon?.seo?.slug || salon.id
            }`}
            key={salon.id}
          >
            <SalonItem salon={salon} />
          </Link>
        ))}
        {fetchMoreButton}
      </ListWrapper>
      <Link href="/createSalon">
        <MobileHidden>
          <Button
            size="width374WithoutPadding"
            variant="darkTransparent"
            font="medium"
          >
            Добавить салон
          </Button>
        </MobileHidden>
      </Link>
      <Link href="/createSalon">
        <MobileVisible>
          <Button size="fullWidth" variant="darkTransparent" font="small">
            Добавить салон
          </Button>
        </MobileVisible>
      </Link>
    </SalonsContent>
  )
}

export default SalonsList
