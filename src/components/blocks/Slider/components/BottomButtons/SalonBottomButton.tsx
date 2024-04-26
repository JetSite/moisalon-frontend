import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Plus, BottomText } from './styles'
import goalIdObjects from '../../../../../lib/goalIdObjects'
import { IBottomButtons } from './AdBottomButton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const SalonBottomButton: FC<IBottomButtons> = ({ bgColor }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const isLoggedIn = me?.info !== undefined && me?.info !== null
  const { addSalon } = goalIdObjects(router.pathname)

  return (
    <Link href={isLoggedIn ? '/createSalon' : '/login'}>
      <BottomText
        bgColor={bgColor}
        onClick={() => {
          ;(window as any).dataLayer.push({
            event: 'event',
            eventProps: {
              category: 'click',
              action: addSalon,
            },
          })
        }}
      >
        <Plus bgColor={bgColor} />
        Разместить свой салон
      </BottomText>
    </Link>
  )
}

export default SalonBottomButton
