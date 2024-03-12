import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Choose,
  Wrapper,
  WrapperBrands,
  Content,
  Title,
  Item,
  Element,
  CloseIconWrap,
  ContentChooseBrand,
} from "./styles";
import { Scrollbar } from "react-scrollbars-custom";
import CloseIcon from "./CloseIcon";

function SortArray(x, y) {
  if (x.name < y.name) {
    return -1;
  }
  if (x.name > y.name) {
    return 1;
  }
  return 0;
}

const ChooseBrand = ({ filterProduct, brandsData }) => {
  const [toggle, setToggle] = useState(false);
  const [objEngBrands, setObjEngBrands] = useState([]);
  const [objRuBrands, setObjRuBrands] = useState([]);
  const [strokeIconColor, setStrokeIconColor] = useState("#000");
  const [objNumberBrands, setObjNumberBrands] = useState([]);

  const brands = brandsData?.brandsSearch?.connection?.nodes;

  useEffect(() => {
    let newEngArr = [
      { key: "A", items: [] },
      { key: "B", items: [] },
      { key: "C", items: [] },
      { key: "D", items: [] },
      { key: "E", items: [] },
      { key: "F", items: [] },
      { key: "G", items: [] },
      { key: "H", items: [] },
      { key: "I", items: [] },
      { key: "J", items: [] },
      { key: "K", items: [] },
      { key: "L", items: [] },
      { key: "M", items: [] },
      { key: "N", items: [] },
      { key: "O", items: [] },
      { key: "P", items: [] },
      { key: "Q", items: [] },
      { key: "R", items: [] },
      { key: "S", items: [] },
      { key: "T", items: [] },
      { key: "U", items: [] },
      { key: "V", items: [] },
      { key: "W", items: [] },
      { key: "X", items: [] },
      { key: "Y", items: [] },
      { key: "Z", items: [] },
    ];
    let newRuArr = [
      { key: "А", items: [] },
      { key: "Б", items: [] },
      { key: "В", items: [] },
      { key: "Г", items: [] },
      { key: "Д", items: [] },
      { key: "Е", items: [] },
      { key: "Ё", items: [] },
      { key: "Ж", items: [] },
      { key: "З", items: [] },
      { key: "И", items: [] },
      { key: "Й", items: [] },
      { key: "К", items: [] },
      { key: "Л", items: [] },
      { key: "М", items: [] },
      { key: "Н", items: [] },
      { key: "О", items: [] },
      { key: "П", items: [] },
      { key: "Р", items: [] },
      { key: "С", items: [] },
      { key: "Т", items: [] },
      { key: "У", items: [] },
      { key: "Ф", items: [] },
      { key: "Х", items: [] },
      { key: "Ц", items: [] },
      { key: "Ш", items: [] },
      { key: "Щ", items: [] },
      { key: "Ы", items: [] },
      { key: "Э", items: [] },
      { key: "Ю", items: [] },
      { key: "Я", items: [] },
    ];
    let newNumberArr = [
      { key: "1", items: [] },
      { key: "2", items: [] },
      { key: "3", items: [] },
      { key: "4", items: [] },
      { key: "5", items: [] },
      { key: "6", items: [] },
      { key: "7", items: [] },
      { key: "8", items: [] },
      { key: "9", items: [] },
      { key: "1", items: [] },
    ];
    if (brands?.length) {
      for (let i = 0; i < brands.length; i++) {
        for (let j = 0; j < newEngArr.length; j++) {
          if (brands[i]?.name.substr(0, 1).toUpperCase() === newEngArr[j].key) {
            newEngArr.map((item) => {
              if (item.key === newEngArr[j].key) {
                item.items.push(brands[i]);
              }
            });
          }
        }
      }
      for (let i = 0; i < brands.length; i++) {
        for (let j = 0; j < newRuArr.length; j++) {
          if (brands[i]?.name.substr(0, 1).toUpperCase() === newRuArr[j].key) {
            newRuArr.map((item) => {
              if (item.key === newRuArr[j].key) {
                item.items.push(brands[i]);
              }
            });
          }
        }
      }
      for (let i = 0; i < brands.length; i++) {
        for (let j = 0; j < newNumberArr.length; j++) {
          if (
            brands[i]?.name.substr(0, 1).toUpperCase() === newNumberArr[j].key
          ) {
            newNumberArr.map((item) => {
              if (item.key === newNumberArr[j].key) {
                item.items.push(brands[i]);
              }
            });
          }
        }
      }
    }
    setObjEngBrands(newEngArr);
    setObjRuBrands(newRuArr);
    setObjNumberBrands(newNumberArr);
  }, [brands]);

  return (
    <Wrapper>
      <ContentChooseBrand>
        <Choose
          onClick={() => {
            brands?.length && setToggle(!toggle);
          }}
          active={toggle}
        >
          Выбрать бренд
        </Choose>
      </ContentChooseBrand>
      <WrapperBrands active={toggle}>
        <ContentChooseBrand>
          <CloseIconWrap
            onMouseMove={() => setStrokeIconColor("#f03")}
            onMouseLeave={() => setStrokeIconColor("#000")}
            onClick={() => setToggle(!toggle)}
          >
            <CloseIcon stroke={strokeIconColor} />
          </CloseIconWrap>
          <Scrollbar
            style={{ width: "100%", height: 250 }}
            minimalThumbYSize={12}
            maximalThumbYSize={12}
            thumbYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                return (
                  <span
                    {...restProps}
                    ref={elementRef}
                    className="chooseThumb"
                  />
                );
              },
            }}
            trackYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                return (
                  <span
                    {...restProps}
                    ref={elementRef}
                    className="chooseScroll"
                  />
                );
              },
            }}
          >
            <Content>
              {objEngBrands?.map((item, i) =>
                item?.items?.length ? (
                  <Item key={i}>
                    <Title>{item.key}</Title>
                    {item.items.sort(SortArray).map((el, idx) => (
                      <Link
                        href={{
                          pathname: `/catalogB2b/${
                            el?.seo?.slug || el.id
                          }/product`,
                          query: {
                            brand: el?.name,
                          },
                        }}
                        key={el.id}
                      >
                        <a>
                          <Element key={idx}>{el.name}</Element>
                        </a>
                      </Link>
                    ))}
                  </Item>
                ) : null
              )}
            </Content>
            <Content>
              {objRuBrands?.map((item, i) =>
                item?.items?.length ? (
                  <Item key={i}>
                    <Title>{item.key}</Title>
                    {item.items.sort(SortArray).map((el, idx) => (
                      <Link
                        href={{
                          pathname: `/catalogB2b/${
                            el?.seo?.slug || el.id
                          }/product`,
                          query: {
                            value: filterProduct?.value,
                            label: filterProduct?.label,
                            brand: el?.name,
                          },
                        }}
                        key={el.id}
                      >
                        <a>
                          <Element key={idx}>{el.name}</Element>
                        </a>
                      </Link>
                    ))}
                  </Item>
                ) : null
              )}
            </Content>
            <Content>
              {objNumberBrands?.map((item, i) =>
                item?.items?.length ? (
                  <Item key={i}>
                    <Title>{item.key}</Title>
                    {item.items.sort(SortArray).map((el, idx) => (
                      <Link
                        href={{
                          pathname: `/catalogB2b/${
                            el?.seo?.slug || el.id
                          }/product`,
                          query: {
                            value: filterProduct?.value,
                            label: filterProduct?.label,
                            brand: el?.name,
                          },
                        }}
                        key={el.id}
                      >
                        <a>
                          <Element key={idx}>{el.name}</Element>
                        </a>
                      </Link>
                    ))}
                  </Item>
                ) : null
              )}
            </Content>
          </Scrollbar>
        </ContentChooseBrand>
      </WrapperBrands>
    </Wrapper>
  );
};

export default ChooseBrand;
