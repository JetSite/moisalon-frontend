import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Plus, BottomText } from './styles'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

export interface IBottomButtons {
  bgColor?: string
}

const AdBottomButton: FC<IBottomButtons> = ({ bgColor }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const isLoggedIn = me?.info !== undefined && me?.info !== null

  return (
    <Link
      href={
        isLoggedIn
          ? {
              pathname: '/masterCabinet',
              query: { tab: 'sales' },
            }
          : '/login'
      }
    >
      <BottomText bgColor={bgColor}>
        <Plus bgColor={bgColor} />
        Разместить свое объявление
      </BottomText>
    </Link>
  )
}

export default AdBottomButton
