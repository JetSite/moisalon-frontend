import { IServiceCategory, IServiceInCategory } from 'src/types/services'
import { Wrapper, Text } from './styles'
import { FC } from 'react'

interface IBackProps {
  clickedCategory: IServiceCategory | null
  clickedItem: IServiceInCategory | null
  setItems: any
  setClickedCategory: any
  setClickedItem: any
}

const Back: FC<IBackProps> = ({
  clickedCategory,
  clickedItem,
  setItems,
  setClickedCategory,
  setClickedItem,
}) => {
  return (
    <Wrapper>
      {clickedCategory ? (
        <>
          {clickedCategory ? (
            <>
              <Text
                onClick={() => {
                  setClickedCategory(null)
                  setClickedItem(null)
                  setItems(null)
                }}
              >
                Услуги –&nbsp;
              </Text>
              <Text
                onClick={() => {
                  setClickedItem(null)
                  setItems(null)
                }}
              >
                {clickedCategory.title}
              </Text>
            </>
          ) : null}
          {clickedItem ? <Text>&nbsp;{` – ${clickedItem.title}`}</Text> : null}
        </>
      ) : null}{' '}
    </Wrapper>
  )
}

export default Back
