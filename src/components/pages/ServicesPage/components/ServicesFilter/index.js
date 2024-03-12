import { useState, useRef, useEffect } from "react";
import Back from "../Back";
import ServiceFilterItem from "./ServicesFilterItem";
import { MobileVisible, MobileHidden } from "../../../../../styles/common";

import {
  Wrapper,
  FilterColumn,
  BackText,
  ScrollDiv,
} from "./styles";

const ServicesFilter = ({
  servicesList,
  setClickedService,
  mastersData,
  setMastersData,
  salonsData,
  setSalonsData,
  clickedService,
}) => {
  const [subgroups, setSubgroups] = useState(null);
  const [items, setItems] = useState(null);
  const [clickedGroup, setClickedGroup] = useState(null);
  const [clickedSubgroup, setClickedSubgroup] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const scrollFiltersTop = useRef();

  useEffect(() => {
    if (clickedGroup) {
      scrollFiltersTop.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [clickedGroup]);

  const resetFilters = () => {
    setMastersData(null);
    setSalonsData(null);
    setSubgroups(null);
    setItems(null);
    setClickedGroup(null);
    setClickedSubgroup(null);
    setClickedItem(null);
    setClickedService(null);
  };

  useEffect(() => {
    if (clickedService?.id) {
      setClickedItem(null);
      servicesList?.groups?.map((el) => {
        const elSubgroups = el.subGroups.find(
          (subGroup) => subGroup.id === clickedService?.id
        );
        if (elSubgroups) {
          setSubgroups(el.subGroups);
          setItems(elSubgroups?.items);
          setClickedSubgroup([elSubgroups]);
          setClickedGroup([el]);
        }
        if (
          el?.subGroups?.map((elItem) => {
            elItem?.items?.map((item) => {
              if (item?.id === clickedService?.id) {
                setSubgroups(el.subGroups);
                setItems(elItem?.items);
                setClickedGroup([el]);
                setClickedSubgroup([elItem]);
                setClickedItem([item]);
              }
            });
          })
        ) {
        }
      });
    }
  }, [clickedService, servicesList]);

  const chooseHandler = (type, element) => {
    if (type === "subgroup") {
      setClickedGroup(null);
      setClickedSubgroup(null);
      setClickedItem(null);
      setClickedService(null);
      const clickedGroup = servicesList.groups.filter(
        (group) => group.id === element.id
      );
      setSubgroups(clickedGroup[0].subGroups);
      setClickedGroup(clickedGroup);
      setItems(null);
    }
    if (type === "item") {
      setClickedService(element);
    }
    if (type === "lastElement") {
      setClickedService(element);
    }
  };

  return (
    <>
      <Back
        servicesList={servicesList}
        clickedGroup={clickedGroup}
        clickedSubgroup={clickedSubgroup}
        clickedItem={clickedItem}
        setSubgroups={setSubgroups}
        setItems={setItems}
        setClickedGroup={setClickedGroup}
        setClickedSubgroup={setClickedSubgroup}
        setClickedItem={setClickedItem}
      />
      <MobileHidden>
        {mastersData || salonsData ? (
          <BackText onClick={resetFilters}>Сбросить фильтр</BackText>
        ) : null}
        <ScrollDiv ref={scrollFiltersTop} />
        <Wrapper>
          {servicesList ? (
            <FilterColumn>
              {servicesList?.groups?.map((group) => (
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
          {subgroups ? (
            <FilterColumn>
              {subgroups?.map((subgroup) => (
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
          ) : null}
          {items ? (
            <FilterColumn>
              {items.map((item) => (
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
          ) : null}
        </Wrapper>
      </MobileHidden>
      <MobileVisible>
        <Wrapper>
          {items ? (
            <FilterColumn>
              {items.map((item) => (
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
              {subgroups?.map((subgroup) => (
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
              {servicesList?.groups?.map((group) => (
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
          {/* {servicesList ? (
          <FilterColumn>
            {servicesList?.groups?.map((group) => (
              <ServiceFilterItem
                key={group.id}
                item={group}
                clickType="subgroup"
                clickHandler={chooseHandler}
                active={clickedGroup && group.id === clickedGroup[0]?.id}
              />
            ))}
          </FilterColumn>
        ) : subgroups ? (
          <FilterColumn>
            {subgroups?.map((subgroup) => (
              <ServiceFilterItem
                key={subgroup.id}
                item={subgroup}
                clickType="item"
                clickHandler={chooseHandler}
                isEndElement={!subgroup.items || subgroup.items?.length === 0}
                active={
                  clickedSubgroup && subgroup.id === clickedSubgroup[0]?.id
                }
              />
            ))}
          </FilterColumn>
        ) : items ? (
          <FilterColumn>
            {items.map((item) => (
              <ServiceFilterItem
                key={item.id}
                item={item}
                isEndElement
                clickHandler={chooseHandler}
                clickType="lastElement"
                active={clickedItem && item.id === clickedItem[0]?.id}
              />
            ))}
          </FilterColumn>
        ) : (
          <FilterColumn>
            <FilterItemWrapper onClick={() => chooseMainCategory("salon")}>
              <Text active={servicesType === "salon"}>Услуги салонов</Text>
              <Icon />
            </FilterItemWrapper>
            <FilterItemWrapper onClick={() => chooseMainCategory("master")}>
              <Text active={servicesType === "master"}>Услуги мастеров</Text>
              <Icon />
            </FilterItemWrapper>
          </FilterColumn>
        )} */}
        </Wrapper>
      </MobileVisible>
    </>
  );
};

export default ServicesFilter;
