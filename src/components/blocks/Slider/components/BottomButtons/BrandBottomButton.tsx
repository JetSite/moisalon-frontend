import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Plus, BottomText } from './styles'
import goalIdObjects from '../../../../../lib/goalIdObjects'
import { IBottomButtons } from './AdBottomButton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const BrandBottomButton: FC<IBottomButtons> = ({ bgColor }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const isLoggedIn = me?.info !== undefined && me?.info !== null
  const { addBrand } = goalIdObjects(router.pathname)

  return (
    <Link href={isLoggedIn ? '/createBrand' : '/login'}>
      <BottomText
        bgColor={bgColor}
        onClick={() => {
          ;(window as any).dataLayer.push({
            event: 'event',
            eventProps: {
              category: 'click',
              action: addBrand,
            },
          })
        }}
      >
        <Plus bgColor={bgColor} />
        Добавить свой бренд
      </BottomText>
    </Link>
  )
}

export default BrandBottomButton
