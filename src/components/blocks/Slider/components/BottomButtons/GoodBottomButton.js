import { useContext } from 'react'
import Link from 'next/link'
import { cyrToTranslit } from '../../../../../utils/translit'
import { Plus, BottomText } from './styles'
import { CityContext } from '../../../../../searchContext'

const GoodBottomButton = () => {
  const [city] = useContext(CityContext)
  return (
    <Link href={`/${cyrToTranslit(city)}`}>
      <Plus />
      <BottomText>Разместить свой товар</BottomText>
    </Link>
  )
}

export default GoodBottomButton
