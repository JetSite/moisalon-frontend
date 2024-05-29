import NavAdvicesListItem from './NavAdvicesListItem'
import { NavAdvicesList } from '../../styles'

const CategoryAdvicesList = ({
  categoryAdvices,
  adviceClicked,
  setAdviceClicked,
}) => {
  return (
    <NavAdvicesList>
      {categoryAdvices?.map(item => (
        <NavAdvicesListItem
          key={item.id}
          item={item}
          active={item.id === adviceClicked}
          setAdviceClicked={setAdviceClicked}
        />
      ))}
    </NavAdvicesList>
  )
}

export default CategoryAdvicesList
