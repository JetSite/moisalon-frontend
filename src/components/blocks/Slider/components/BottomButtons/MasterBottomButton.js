import { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { MeContext } from '../../../../../searchContext'
import { Plus, BottomText } from './styles'
import goalIdObjects from '../../../../../lib/goalIdObjects'

const MasterBottomButton = ({ bgColor }) => {
  const router = useRouter()
  const [me] = useContext(MeContext)
  const isLoggedIn = me?.info !== undefined && me?.info !== null
  const { addMaster } = goalIdObjects(router.pathname)

  return (
    <Link href={isLoggedIn ? '/createMaster' : '/login'}>
      <BottomText
        bgColor={bgColor}
        onClick={() => {
          window.dataLayer.push({
            event: 'event',
            eventProps: {
              category: 'click',
              action: addMaster,
            },
          })
        }}
      >
        <Plus bgColor={bgColor} />
        Заявить о себе как о мастере
      </BottomText>
    </Link>
  )
}

export default MasterBottomButton
