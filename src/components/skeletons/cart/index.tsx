import { FC } from 'react'
import { WrapperSceleton } from '../reviews/style'
import { Wrapper } from 'src/components/pages/Cart/styled'
import BackButton from '../../ui/BackButton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import styled from 'styled-components'
import { skeletonsAnimation } from '../stile'

interface Props {}

const SkeletonWrapper = styled.div`
  animation: ${skeletonsAnimation} 3s infinite;
  display: flex;
  background-color: gray;
  opacity: 0.1;
  width: 100%;
  height: 100%; // Добавляем высоту на 100%
  margin-bottom: 30px;
  flex-grow: 1;
`

export const SkeletonCart: FC<Props> = ({}) => {
  const { city } = useAuthStore(getStoreData)

  return (
    <>
      <Wrapper>
        <BackButton
          type="Вернуться к покупкам"
          onlyType
          link={`/${city.slug}/beautyFreeShop`}
        />
        <SkeletonWrapper></SkeletonWrapper>
      </Wrapper>
    </>
  )
}
