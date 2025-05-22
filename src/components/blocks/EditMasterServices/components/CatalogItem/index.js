import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Checkbox,
  FormControlLabel,
  styled as styledMaterial,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { laptopBreakpoint } from '../../../../../styles/variables'

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

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
})

const Wrapper = styled.div``

const Content = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Title = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-right: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
  }
`

export const CatalogItem = ({
  item,
  setEntriesItems,
  entriesItems,
  setCheckedLength,
  checkedLength,
}) => {
  const classes = useStyles()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (entriesItems.find(el => el.id === item.id)) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [entriesItems])

  const handleChecked = () => {
    if (entriesItems.find(el => el.id === item.id)) {
      setEntriesItems(entriesItems.filter(entry => entry.id !== item.id))
      setCheckedLength(checkedLength - 1)
    } else {
      setEntriesItems([...entriesItems, item])
      setCheckedLength(checkedLength + 1)
    }
  }

  return (
    <Wrapper>
      <Content>
        <FormControlLabel
          label={<Title>{item.title}</Title>}
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
    </Wrapper>
  )
}
