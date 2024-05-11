import { MainContainer } from '../../../../../../styles/common'
import { cyrToTranslit } from '../../../../../../utils/translit'

import {
  Wrapper,
  ActionItem,
  ActionDiscount,
  TextBlock,
  Link,
  ActionDeadline,
  ActionItemImage,
} from './styles'

const Actions = () => {
  const { city } = useAuthStore(getStoreData)
  return (
    <>
      <MainContainer>
        <Wrapper>
          <ActionItem>
            <TextBlock>
              Акция: уход + окрашивание <br /> air touch 7 500
            </TextBlock>
            <Link href={`/${city.citySlug}`}>Записаться</Link>
            <ActionDeadline>До 1 августа</ActionDeadline>
            <ActionItemImage>
              <img src="/master-page-woman.png" alt="woman image" />
            </ActionItemImage>
          </ActionItem>
          <ActionDiscount>
            <TextBlock>
              скидка 10% <br /> новым клиентам
            </TextBlock>
            <Link>Записаться</Link>
          </ActionDiscount>
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default Actions
