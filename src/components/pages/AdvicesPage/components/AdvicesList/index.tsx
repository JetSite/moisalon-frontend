import { FC } from 'react';
import { AdvList } from '../../styles';
import AdviceItem, { AdviceItemProps } from './AdviceItem';
import { IFeed } from '@/types/feed';

interface Props extends Omit<AdviceItemProps, 'item'> {
  items: IFeed[];
}

const AdvicesList: FC<Props> = ({
  items,
  adviceClicked,
  setCategoryClicked,
  setAdviceClicked,
}) => {
  return (
    <>
      <AdvList>
        {items?.map(item => (
          <AdviceItem
            item={item}
            key={item.id}
            adviceClicked={adviceClicked}
            setCategoryClicked={setCategoryClicked}
            setAdviceClicked={setAdviceClicked}
          />
        ))}
      </AdvList>
    </>
  );
};

export default AdvicesList;
