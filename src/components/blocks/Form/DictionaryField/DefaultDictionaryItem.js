import styled from 'styled-components'
import { useState } from 'react'
import { laptopBreakpoint } from '../../../../styles/variables'

const Input = styled.input`
  margin: 5px;
  background: ${props => (!props.check ? '#fff' : '#f03')};
  border: ${props => (!props.check ? '1px solid #000000' : '1px solid #f03')};
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  outline: none;
  padding: 9px 55px;
  color: ${props => (!props.check ? '#000' : '#fff')};

  @media (max-width: ${laptopBreakpoint}) {
    padding: 6px 23px;
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`

const Description = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin: 35px 0px 15px 0px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 30px;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    margin: 15px 0px 5px 0px;
  }
`

const AllChecked = styled.div`
  margin: 5px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  padding: 9px 55px;
  display: inline;
  text-decoration: underline;
  font-weight: 700;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    padding: 6px 0;
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`

const DictionaryItem = ({ items, group, onChangeDefault }) => {
  const [showAll, setShowAll] = useState(false)
  const allCheckedValue = !showAll ? 'Выбрать другую' : 'Отмена'
  return (
    <>
      <Description>Выберите Вашу основную специализацию:</Description>
      {showAll ? (
        <>
          {items?.map((item, i) => (
            <Input
              check={i === 0}
              onClick={() => {
                onChangeDefault(item, i)
                setShowAll(!showAll)
              }}
              type="button"
              value={group?.find(el => el?.id === item)?.title}
              name="defaultItem"
            />
          ))}
          {items?.length > 1 ? (
            <AllChecked onClick={() => setShowAll(!showAll)}>
              {allCheckedValue}
            </AllChecked>
          ) : null}
        </>
      ) : (
        <>
          <Input
            check={true}
            type="button"
            value={group?.find(el => el?.id === items[0])?.title}
            name="defaultItem"
          />
          {items?.length > 1 ? (
            <AllChecked onClick={() => setShowAll(!showAll)}>
              {allCheckedValue}
            </AllChecked>
          ) : null}
        </>
      )}
    </>
  )
}

export default DictionaryItem
