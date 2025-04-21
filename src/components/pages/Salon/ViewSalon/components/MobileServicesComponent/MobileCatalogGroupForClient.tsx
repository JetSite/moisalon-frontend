import { FC, useState } from 'react';
import styled from 'styled-components';
import { laptopBreakpoint } from '../../../../../../styles/variables';
import MobileCatalogSubGroup from './MobileCatalogSubGroup';
import { IGroupedCategories } from 'src/utils/getGrupedServices';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

const Wrapper = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

const Title = styled.h4`
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
  }
`;

const Item = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TickIcon = styled.div<{ open: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11px;
  height: 11px;
  transform: ${({ open }) => (open ? 'rotate(90deg) translateX(-2px)' : '')};
  transition: all 0.2s;
`;

const Icon = styled(LazyImage)`
  height: auto;
  width: 100%;
`;

const ItemWrapper = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  margin-bottom: ${({ open }) => (open ? '40px' : '0')};
`;

const ucFirst = (str?: string) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

interface Props {
  group: IGroupedCategories;
  withPrice?: boolean;
}

export const MobileCatalogGroupForClient: FC<Props> = ({
  group,
  withPrice,
}) => {
  const [openGroup, setOpenGroup] = useState(false);

  if (!group.services) {
    return null;
  }

  const openGroupHandler = () => {
    setOpenGroup(!openGroup);
  };

  const subGroups = group?.services
    ?.map((subGroup, key) => {
      return <MobileCatalogSubGroup key={key} subGroup={subGroup} />;
    })
    .filter(element => element !== null);

  if (subGroups?.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <TitleWrapper onClick={openGroupHandler}>
        <Title>{ucFirst(group?.title)}</Title>
        <TickIcon open={openGroup}>
          <Icon src="/services-tick.svg" />
        </TickIcon>
      </TitleWrapper>
      <ItemWrapper open={openGroup}>
        <Item>{subGroups}</Item>
      </ItemWrapper>
    </Wrapper>
  );
};
