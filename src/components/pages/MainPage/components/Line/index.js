import { Wrapper, Text } from './styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import goalIdObjects from '../../../../../lib/goalIdObjects'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const Line = ({ text }) => {
  const router = useRouter()
  const { line } = goalIdObjects(router.pathname)

  const { me } = useAuthStore(getStoreData)
  const isLoggedIn = me?.info !== undefined && me?.info !== null

  return (
    <Wrapper
      onClick={() => {
        window.dataLayer.push({
          event: 'event',
          eventProps: {
            category: 'click',
            action: line,
          },
        })
      }}
    >
      <Link href={isLoggedIn ? '/createMaster' : '/login'}>
        <Text>{text}</Text>
      </Link>
    </Wrapper>
  )
}

export default Line
