import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Plus, BottomText } from './styles'
import { IBottomButtons } from './AdBottomButton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const WorkplaceBottomButton: FC<IBottomButtons> = ({ bgColor }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const isLoggedIn = me?.info !== undefined && me?.info !== null

  return (
    <Link href={isLoggedIn ? '/createLessorSalon' : '/login'}>
      <BottomText bgColor={bgColor}>
        <Plus bgColor={bgColor} />
        Разместить рабочее место
      </BottomText>
    </Link>
  )
}

export default WorkplaceBottomButton
