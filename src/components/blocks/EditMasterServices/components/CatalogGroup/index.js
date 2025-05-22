import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CatalogItem } from '../CatalogItem'
import {
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { styled as styledMaterial } from '@mui/material/styles'
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
    paddingBottom: 0,
    paddingTop: 0,
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
})

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
  min-height: 165px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h4`
  font-weight: 600;
  font-size: 18px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
  }
`

const Item = styled.div`
  font-size: 18px;
`

const ShowMore = styled.span`
  display: block;
  width: fit-content;
  margin-top: 10px;
  font-size: 14px;
  line-height: 27px;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #ff0033;
  }
`

export function CatalogGroup({
  group,
  entriesItems,
  setEntriesItems,
  handleDeleteEntries,
  handleAddEntries,
}) {
  const classes = useStyles()
  const [collapsed, setCollapsed] = useState(true)
  const [checkAll, setCheckAll] = useState(true)
  const [checkedLength, setCheckedLength] = useState(0)

  useEffect(() => {
    let count = 0
    for (let i = 0; i < entriesItems.length; i++) {
      for (let j = 0; j < group?.items?.length; j++) {
        if (entriesItems[i].id === group?.items[j].id) {
          count++
        }
      }
    }
    setCheckedLength(count)
  }, [])

  useEffect(() => {
    if (checkedLength === group?.items?.length) {
      setCheckAll(true)
    } else {
      setCheckAll(false)
    }
  }, [checkedLength])

  if (group.items === undefined) {
    return null
  }

  const items = group.items.map(item => (
    <CatalogItem
      key={item.id}
      item={item}
      checkedLength={checkedLength}
      setCheckedLength={setCheckedLength}
      setEntriesItems={setEntriesItems}
      entriesItems={entriesItems}
    />
  ))

  if (items.length === 0) {
    return null
  }

  const visibleItems = items?.slice(0, 3)
  const collapsedItems = items?.slice(3)
  const collapsedText = collapsed ? 'Показать все' : 'Скрыть'

  const handleChange = () => {
    setCollapsed(!collapsed)
  }

  const handleCheckAll = () => {
    if (checkAll) {
      handleDeleteEntries(group.items)
      setCheckedLength(0)
    } else {
      handleAddEntries(group.items)
      setCheckedLength(group.items.length)
    }
  }

  return (
    <Wrapper>
      <Content>
        <FormControlLabel
          label={<Title>{group.title}</Title>}
          control={
            <Checkbox
              className={classes.root}
              icon={<BpIcon />}
              checkedIcon={<BpCheckedIcon />}
              checked={checkAll}
              onChange={() => handleCheckAll()}
            />
          }
        />
      </Content>
      <Item>{visibleItems}</Item>
      {!collapsed && <Item>{collapsedItems}</Item>}
      {items?.length > 3 && (
        <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
      )}
    </Wrapper>
  )
}
