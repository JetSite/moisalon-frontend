import { AdvList } from '../../styles'
import AdviceItem from './AdviceItem'

const AdvicesList = ({
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
  )
}

export default AdvicesList
