import { LazyImage } from '@/components/newUI/common/LazyIMage';
import { MainContainer } from '../../../../../../styles/common';
import { cyrToTranslit } from '../../../../../../utils/translit';

import {
  Wrapper,
  ActionItem,
  ActionDiscount,
  TextBlock,
  Link,
  ActionDeadline,
  ActionItemImage,
} from './styles';
import useAuthStore from '@/store/authStore';
import { getStoreData } from '@/store/utils';

const Actions = () => {
  const { city } = useAuthStore(getStoreData);
  return (
    <>
      <MainContainer>
        <Wrapper>
          <ActionItem>
            <TextBlock>
              Акция: уход + окрашивание <br /> air touch 7 500
            </TextBlock>
            <Link href={`/${city.slug}`}>Записаться</Link>
            <ActionDeadline>До 1 августа</ActionDeadline>
            <ActionItemImage>
              <LazyImage src="/master-page-woman.png" alt="woman image" />
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
  );
};

export default Actions;
