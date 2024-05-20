import Link from 'next/link'
import Button from '../../ui/Button'
import { MobileVisible, MobileHidden } from '../../../styles/common'
import { Wrapper, Title, Text } from './styles'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { FC } from 'react'

const NotFound: FC = () => {
  const { city } = useAuthStore(getStoreData)
  return (
    <Wrapper>
      <Title>404:</Title>
      <Text>Страница не найдена</Text>
      <MobileHidden>
        <Link href={`/${city.citySlug}`} passHref>
          <Button size="medium" variant="red" mt="103" z="10">
            На главную
          </Button>
        </Link>
      </MobileHidden>
      <MobileVisible>
        <Link href={`/${city.citySlug}`} passHref>
          <Button size="fullWidth" variant="red" mt="300" z="10">
            На главную
          </Button>
        </Link>
      </MobileVisible>
    </Wrapper>
  )
}

export default NotFound
