import React, { useState, useEffect, Dispatch, SetStateAction, FC } from 'react'
import styled from 'styled-components'
import { Checkbox, FormControlLabel } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { styled as muiStyled } from '@mui/material/styles'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import CatalogItem from '../CatalogItem'
import { IService, IServiceCategory } from 'src/types/services'

export const BpIcon = muiStyled('span')(() => ({
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

export const BpCheckedIcon = muiStyled(BpIcon)({
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
`

const Title = styled.h4`
  font-weight: 600;
  font-size: 26px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 18px;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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

const Item = styled.div``

const ucFirst = (str: string) => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}

interface ICatalogGroup {
  serviceBlock: IServiceCategory
  entriesItems: IService[]
  allServices: IServiceCategory[]
  setEntriesItems: Dispatch<SetStateAction<IService[]>>
  handleDeleteEntries: (serviceBlock: IServiceCategory) => void
  handleAddEntries: (serviceBlock: IServiceCategory) => void
}

const CatalogGroup: FC<ICatalogGroup> = ({
  serviceBlock,
  entriesItems,
  allServices,
  setEntriesItems,
  handleDeleteEntries,
  handleAddEntries,
}) => {
  const classes = useStyles()
  const [collapsed, setCollapsed] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const [checkedLength, setCheckedLength] = useState(0)

  useEffect(() => {
    let count = 0
    for (let i = 0; i < entriesItems?.length; i++) {
      for (let j = 0; j < serviceBlock?.services?.length; j++) {
        if (entriesItems[i]?.id === serviceBlock?.services[j]?.id) {
          count++
          if (serviceBlock?.services?.length) {
            for (let k = 0; k < serviceBlock?.services?.length; k++) {
              if (
                entriesItems.find(
                  item => item?.id === serviceBlock?.services[j]?.id,
                )
              ) {
                count++
              }
            }
          }
        }
      }
    }
    setCheckedLength(count)
  }, [entriesItems])

  useEffect(() => {
    let count = 0
    for (let i = 0; i < serviceBlock?.services?.length; i++) {
      count++
      if (serviceBlock?.services?.length) {
        for (let j = 0; j < serviceBlock?.services?.length; j++) {
          count++
        }
      }
    }
    if (checkedLength === count) {
      setCheckAll(true)
    } else {
      setCheckAll(false)
    }
  }, [checkedLength])

  if (!serviceBlock?.services) {
    return null
  }

  const services = serviceBlock?.services?.map((service, idx) => {
    return (
      <CatalogItem
        key={idx}
        item={service}
        entriesItems={entriesItems}
        setEntriesItems={setEntriesItems}
        allServices={allServices}
      />
    )
  })

  if (services?.length === 0) {
    return null
  }

  const visibleItems = services?.slice(0, 3)
  const collapsedItems = services?.slice(3)
  const collapsedText = collapsed ? 'Развернуть' : 'Скрыть'

  const handleChange = () => {
    setCollapsed(!collapsed)
  }

  const handleCheckAll = () => {
    if (checkAll) {
      handleDeleteEntries(serviceBlock)
    } else {
      handleAddEntries(serviceBlock)
    }
  }

  return (
    <Wrapper>
      <Content>
        <FormControlLabel
          label={<Title>{ucFirst(serviceBlock?.title)}</Title>}
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
      {services?.length > 3 && (
        <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
      )}
    </Wrapper>
  )
}

export default CatalogGroup
