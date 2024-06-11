import { FC } from 'react'
import Link from 'next/link'
import { cyrToTranslit } from '../../../../../utils/translit'
import { Plus, BottomText } from './styles'
import { IBottomButtons } from './AdBottomButton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const GoodBottomButton: FC<IBottomButtons> = () => {
  const { city } = useAuthStore(getStoreData)

  return (
    <Link href={`/${city.slug}`}>
      <Plus />
      <BottomText>Разместить свой товар</BottomText>
    </Link>
  )
}

export default GoodBottomButton
