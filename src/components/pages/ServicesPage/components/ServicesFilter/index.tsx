import { useState, useRef, useEffect, FC } from 'react'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'

import { Wrapper, FilterColumn, BackText, ScrollDiv } from './styles'
import ServiceFilterItem from './ServicesFilterItem'
import { IServiceCategory, IServiceInCategory } from 'src/types/services'
import Back from '../Back'
import { ISetState } from 'src/types/common'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'

interface IServicesFilterProps {
  servicesCategoriesList: IServiceCategory[]
  clickedService: IServiceInCategory | null
  setClickedService: ISetState<IServiceInCategory | null>
  masters: IMaster[]
  setMasters: ISetState<IMaster[]>
  salons: ISalon[]
  setSalons: ISetState<ISalon[]>
  resetMeta?: () => void
}

const ServicesFilter: FC<IServicesFilterProps> = ({
  servicesCategoriesList,
  setClickedService,
  masters,
  salons,
  resetMeta,
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
    setItems(null)
    setClickedCategory(null)
    setClickedItem(null)
    setClickedService(null)

    if (resetMeta) {
      resetMeta()
    }
  }

  const chooseHandler = (
    type: string,
    element: IServiceCategory | IServiceInCategory,
  ) => {
    if (type === 'category') {
      const typedItem = element as IServiceCategory
      setClickedCategory(typedItem)
      setItems(typedItem.services)
    }
    if (type === 'item') {
      const typedItem = element as IServiceInCategory
      setClickedItem(typedItem)
      setClickedService(typedItem)
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
        {!!masters?.length || !!salons?.length ? (
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
                    !!clickedCategory &&
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
                  active={!!clickedItem && item.id === clickedItem?.id}
                  withCount
                />
              ))}
            </FilterColumn>
          ) : null}
        </Wrapper>
      </MobileHidden>
      <MobileVisible>
        {!!masters?.length || !!salons?.length ? (
          <BackText onClick={resetFilters}>Сбросить фильтр</BackText>
        ) : null}
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
                    !!clickedCategory &&
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
                  active={!!clickedItem && item.id === clickedItem?.id}
                  withCount
                />
              ))}
            </FilterColumn>
          ) : null}
        </Wrapper>
      </MobileVisible>
    </>
  )
}

export default ServicesFilter
