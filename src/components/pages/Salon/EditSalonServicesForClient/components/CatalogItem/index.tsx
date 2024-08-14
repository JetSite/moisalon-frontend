import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Checkbox,
  FormControlLabel,
  styled as styledMaterial,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import { IService, IServiceCategory } from 'src/types/services'

export const BpIcon = styledMaterial('span')(() => ({
  borderRadius: 3,
  width: 23,
  height: 23,
  backgroundColor: '#fff',
  border: '1px solid #E3E3E3',
  '&:hover': { bgcolor: 'transparent' },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },
}))

export const BpCheckedIcon = styledMaterial(BpIcon)({
  backgroundColor: '#E3E3E3',
  border: '1px solid #E3E3E3',
  '&:before': {
    display: 'block',
    width: 23,
    height: 19,
    background: 'url(/icon-check.svg) no-repeat center',
    content: '""',
  },
})

export const Input = styledMaterial(TextField)({
  width: laptopBreakpoint ? 70 : 100,
})

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
})

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 0;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  flex-shrink: 0;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h4`
  font-weight: 500;
  font-size: 16px;
  color: #727272;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
  }
`

interface ICatalogItem {
  item: IService
  entriesItems: IService[]
  setEntriesItems: any
  allServices: IServiceCategory[]
}

const CatalogItem: FC<ICatalogItem> = ({
  item,
  entriesItems,
  setEntriesItems,
  allServices,
}) => {
  const classes = useStyles()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (entriesItems?.find(el => el?.id === item?.id)) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [entriesItems])

  const handleChecked = () => {
    if (entriesItems?.find(el => el?.id === item?.id)) {
      setEntriesItems(entriesItems?.filter(entry => entry?.id !== item?.id))
    } else {
      let foundService;
      allServices?.map(category => {
        category.services.forEach(el => {
          if (el?.id === item?.id) {
            foundService = el
          }
        })
      })
      setEntriesItems([...entriesItems, foundService])
    }
  }

  // const setHandlePrice = value => {
  //   setEntriesItems(
  //     entriesItems.map(el => {
  //       if (el?.id === item?.id) {
  //         return {
  //           id: el?.id,
  //           price: Number(value),
  //         }
  //       } else {
  //         return el
  //       }
  //     }),
  //   )
  // }

  return (
    <Wrapper>
      <Top>
        <Content>
          <FormControlLabel
            label={<Title>{item?.title}</Title>}
            control={
              <Checkbox
                className={classes.root}
                icon={<BpIcon />}
                checkedIcon={<BpCheckedIcon />}
                checked={checked}
                onClick={() => handleChecked()}
              />
            }
          />
        </Content>
        {/* {checked ? (
          <Input
            id="standard-number"
            label=""
            size="small"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={item?.priceFrom || ''}
            onChange={e => setHandlePrice(e.target.value)}
          />
        ) : null} */}
      </Top>
    </Wrapper>
  )
}

export default CatalogItem;