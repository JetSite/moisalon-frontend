import Link from 'next/link'
import Button from '../../ui/Button'
import { MobileVisible, MobileHidden } from '../../../styles/common'
import { Wrapper, Title, Text } from './styles'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { FC } from 'react'
import styled from 'styled-components'
import { laptopBreakpoint } from 'src/styles/variables'

const MobileHiddenWrap = styled(MobileHidden)`
  margin: 0 auto;
  width: fit-content;
`

const MobileVisiblenWrap = styled(MobileVisible)`
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 335px;
    margin: 0 auto;
  }
`

const NotFound: FC = () => {
  const { city } = useAuthStore(getStoreData)
  return (
    <Wrapper>
      <Title>404:</Title>
      <Text>Страница не найдена</Text>
      <MobileHiddenWrap>
        <Link href={`/${city.slug}`} passHref>
          <Button size="medium" variant="red" mt="103" z="10">
            На главную
          </Button>
        </Link>
      </MobileHiddenWrap>
      <MobileVisiblenWrap>
        <Link href={`/${city.slug}`} passHref>
          <Button size="fullWidth" variant="red" mt="300" z="10">
            На главную
          </Button>
        </Link>
      </MobileVisiblenWrap>
    </Wrapper>
  )
}

export default NotFound
