import { useState, useRef, useEffect, FC } from 'react'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'

import { Wrapper, FilterColumn, BackText, ScrollDiv } from './styles'
import ServiceFilterItem from './ServicesFilterItem'
import { IServiceCategory, IServiceInCategory } from 'src/types/services'
import Back from '../Back'

interface IServicesFilterProps {
  servicesCategoriesList: IServiceCategory[]
  clickedService: IServiceInCategory | null
  setClickedService: (service: IServiceInCategory | null) => void
  masters: any
  setMasters: any
  salons: any
  setSalons: any
}

const ServicesFilter: FC<IServicesFilterProps> = ({
  servicesCategoriesList,
  setClickedService,
  clickedService,
  masters,
  setMasters,
  salons,
  setSalons,
}) => {
  const [clickedCategory, setClickedCategory] =
    useState<IServiceCategory | null>(null)
  const [items, setItems] = useState<IServiceInCategory[] | null>(null)
  const [clickedItem, setClickedItem] = useState<IServiceInCategory | null>(
    null,
  )
  const scrollFiltersTop = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (clickedCategory) {
      scrollFiltersTop.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [clickedCategory])

  const resetFilters = () => {
    setMasters(null)
    setSalons(null)
    setItems(null)
    setClickedCategory(null)
    setClickedItem(null)
    setClickedService(null)
  }

  // useEffect(() => {
  //   if (clickedService?.id) {
  //     setClickedItem(null)
  //     servicesList?.groups?.map(el => {
  //       const elSubgroups = el.subGroups.find(
  //         subGroup => subGroup.id === clickedService?.id,
  //       )
  //       if (elSubgroups) {
  //         setSubgroups(el.subGroups)
  //         setItems(elSubgroups?.items)
  //         setClickedSubgroup([elSubgroups])
  //         setClickedGroup([el])
  //       }
  //     })
  //   }
  // }, [clickedService, servicesList])

  const chooseHandler = (type: string, element: any) => {
    if (type === 'category') {
      setClickedCategory(element)
      setItems(element.services)
    }
    if (type === 'item') {
      setClickedItem(element)
      setClickedService(element)
    }
  }

  return (
    <>
      <Back
        clickedCategory={clickedCategory}
        clickedItem={clickedItem}
        setItems={setItems}
        setClickedCategory={setClickedCategory}
        setClickedItem={setClickedItem}
      />
      <MobileHidden>
        {masters || salons ? (
          <BackText onClick={resetFilters}>Сбросить фильтр</BackText>
        ) : null}
        <ScrollDiv ref={scrollFiltersTop} />
        <Wrapper>
          {servicesCategoriesList ? (
            <FilterColumn>
              {servicesCategoriesList?.map(serviceCategory => (
                <ServiceFilterItem
                  key={serviceCategory.id}
                  item={serviceCategory}
                  clickType="category"
                  clickHandler={chooseHandler}
                  active={
                    clickedCategory &&
                    serviceCategory.id === clickedCategory?.id
                  }
                />
              ))}
            </FilterColumn>
          ) : null}
          {items ? (
            <FilterColumn>
              {items.map(item => (
                <ServiceFilterItem
                  key={item.id}
                  item={item}
                  isEndElement
                  clickHandler={chooseHandler}
                  clickType="item"
                  active={clickedItem && item.id === clickedItem?.id}
                  withCount
                />
              ))}
            </FilterColumn>
          ) : null}
        </Wrapper>
      </MobileHidden>
      {/* <MobileVisible>
        <Wrapper>
          {items ? (
            <FilterColumn>
              {items.map(item => (
                <ServiceFilterItem
                  key={item.id}
                  item={item}
                  isEndElement
                  clickHandler={chooseHandler}
                  clickType="lastElement"
                  active={clickedItem && item.id === clickedItem[0]?.id}
                  withCount
                  isEmpty={item.count === 0}
                />
              ))}
            </FilterColumn>
          ) : subgroups ? (
            <FilterColumn>
              {subgroups?.map(subgroup => (
                <ServiceFilterItem
                  key={subgroup.id}
                  item={subgroup}
                  clickType="item"
                  clickHandler={chooseHandler}
                  isEndElement={!subgroup.items || subgroup.items?.length === 0}
                  active={
                    clickedSubgroup && subgroup.id === clickedSubgroup[0]?.id
                  }
                  withCount
                  isEmpty={subgroup.count === 0}
                />
              ))}
            </FilterColumn>
          ) : servicesList ? (
            <FilterColumn>
              {servicesList?.groups?.map(group => (
                <ServiceFilterItem
                  key={group.id}
                  item={group}
                  clickType="subgroup"
                  clickHandler={chooseHandler}
                  active={clickedGroup && group.id === clickedGroup[0]?.id}
                />
              ))}
            </FilterColumn>
          ) : null}
        </Wrapper>
      </MobileVisible> */}
    </>
  )
}

export default ServicesFilter
