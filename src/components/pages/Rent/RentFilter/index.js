import { useContext } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";
import Collapse from "@material-ui/core/Collapse";
import AutoFocusedForm from "../../../blocks/Form/AutoFocusedForm";
import TextField from "../../../blocks/Form/TextField";
import SelectField from "../../../blocks/Form/SelectField";
import Button from "../../../ui/Button";
import { CatalogsContext } from "../../../../searchContext";
import catalogOrDefault from "../../../../utils/catalogOrDefault";
import scrollIntoView from "scroll-into-view";
import { laptopBreakpoint } from "../../../../../styles/variables";

const Checkbox = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  & + label::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #797979;
    margin-right: 14px;
    cursor: pointer;
    background: ${(props) =>
      props.checked ? `url("/icon-check.svg") no-repeat center` : ""};
  }
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  border: 2px solid #e3e3e3;
  border-radius: 100%;
`;

const Radio = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked ~ ${Checkmark} {
    border: 1px solid #000000;
    &:after {
      position: absolute;
      width: 12px;
      height: 12px;
      background: #000;
      content: "";
      border-radius: 100%;
      top: 1px;
      left: 1px;
    }
  }
`;

const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Label = styled.label`
  font-size: 1.6rem;
  line-height: 1.5;
  cursor: pointer;
  margin-bottom: 16px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`;

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

const Content = styled.div`
  margin-top: 15px;
`;

const CategoryWrap = styled.div`
  margin-left: 14px;
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
  }
`;

const ContentWrap = styled.div`
  padding-bottom: 32px;
  border-bottom: 1px solid #000000;
  margin-bottom: 32px;
`;

const PriceWrap = styled.div`
  display: flex;
  width: 900px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    width: 100%;
  }
`;

const BlockTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 16px;
  margin-right: 170px;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    margin-bottom: 20px;
  }
`;

const SelectWrap = styled.div`
  display: flex;
  width: 100px;
`;

const LeftGroup = styled.div`
  margin-right: 170px;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
  }
`;

const More = styled.p`
  cursor: pointer;
  color: #f03;
  border-bottom: 1px dotted #f03;
  display: inline;
`;

const Block = styled.div`
  display: flex;
  padding-bottom: 32px;
  border-bottom: 1px solid #000000;
  margin-bottom: 32px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`;

const PriceFields = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapButton = styled.div`
  margin-bottom: 32px;
  margin-right: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    margin-bottom: 16px;
    width: 100%;
  }
`;

const ButtonsWrap = styled.div`
  display: flex;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`;

const LeftPriceFields = styled(PriceFields)`
  margin-right: 118px;
  margin-left: 8px;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
  }
`;

const onUpdate = (handler) => (event) => {
  const value = event.target.value;
  if (value === "") {
    handler(null);
  } else if (value === "1") {
    handler(true);
  } else {
    handler(false);
  }
};

const RadioCustom = ({ input, children }) => {
  return (
    <>
      <Container>
        <Radio {...input} type="radio" />
        {children}
        <Checkmark />
      </Container>
    </>
  );
};

export const CheckBoxCustom = ({ input, label }) => {
  return (
    <>
      <Checkbox {...input} id={input?.name} />
      <Label for={input?.name}>{label}</Label>
    </>
  );
};

const RentFilter = ({ setFilterOpen, filterOpen, filters, setFilters }) => {
  const catalogs = useContext(CatalogsContext);
  const salonActivitiesCatalog = catalogOrDefault(
    catalogs?.salonActivitiesCatalog
  );

  const categoryList = salonActivitiesCatalog?.groups?.map((item) => {
    return { value: item.id, label: item.title };
  });

  const onSubmit = (values) => {
    const result = {
      ...values,
      activities: values?.activities?.length ? [values?.activities] : [],
      pricing: values?.pricing?.price
        ? {
            price: values?.pricing?.price,
            type: values?.pricing?.type,
          }
        : null,
    };
    setFilters(result);
    setFilterOpen(false);
    const element = document.getElementById("result");
    if (element) {
      scrollIntoView(element, {
        time: 500,
        align: {
          top: 0,
          topOffset: 0,
        },
      });
    }
  };

  return (
    <Wrapper>
      <More onClick={() => setFilterOpen(!filterOpen)}>
        {!filterOpen ? "Больше параметров" : "Меньше параметров"}
      </More>
      <Collapse in={filterOpen}>
        <Content>
          <AutoFocusedForm
            initialValues={{
              ...filters,
              pricing: {
                price: filters?.pricing?.price,
                type: filters?.pricing?.type || "HOUR",
              },
              activities: filters?.activities[0],
              paymentMethods: {
                cash: filters?.paymentMethods?.cash || false,
                wireTransfer: filters?.paymentMethods?.wireTransfer || false,
                bankingCard: filters?.paymentMethods?.bankingCard || false,
                appleOrGooglePay:
                  filters?.paymentMethods?.appleOrGooglePay || false,
              },
            }}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <ContentWrap>
                    <PriceWrap>
                      <Field
                        name="pricing.price"
                        type="number"
                        maxLength={9}
                        inputMode="numeric"
                        component={TextField}
                        label="Цена до"
                      />
                      <SelectWrap>
                        <Field
                          name="pricing.type"
                          component={SelectField}
                          options={[
                            { value: "HOUR", label: "₽ / ч." },
                            { value: "DAY", label: "₽ / д." },
                            { value: "WEEK", label: "₽ / н." },
                            { value: "MONTH", label: "₽ / м." },
                            { value: "YEAR", label: "₽ / г." },
                          ]}
                        />
                      </SelectWrap>
                      <CategoryWrap>
                        <Field
                          name="activities"
                          component={SelectField}
                          label="Категория"
                          options={categoryList}
                        />
                      </CategoryWrap>
                    </PriceWrap>
                  </ContentWrap>
                  <Block>
                    <BlockTitle>Дополнительно</BlockTitle>
                    <LeftGroup>
                      <h4 style={{ marginBottom: 27 }} className="noMargin">
                        Совместная аренда
                      </h4>
                      <Field
                        name="allowJointRental"
                        type="radio"
                        value="1"
                        component={RadioCustom}
                      >
                        Да
                      </Field>
                      <Field
                        name="allowJointRental"
                        type="radio"
                        value="0"
                        component={RadioCustom}
                      >
                        Нет
                      </Field>
                      <Field
                        name="allowJointRental"
                        type="radio"
                        value=""
                        component={RadioCustom}
                      >
                        Не важно
                      </Field>
                    </LeftGroup>
                    <LeftGroup>
                      <h4 style={{ marginBottom: 27 }} className="noMargin">
                        Возможность субаренды
                      </h4>
                      <Field
                        name="allowSublease"
                        type="radio"
                        value="1"
                        component={RadioCustom}
                      >
                        Да
                      </Field>
                      <Field
                        name="allowSublease"
                        type="radio"
                        value="0"
                        component={RadioCustom}
                      >
                        Нет
                      </Field>
                      <Field
                        name="allowSublease"
                        type="radio"
                        value=""
                        component={RadioCustom}
                      >
                        Не важно
                      </Field>
                    </LeftGroup>
                  </Block>
                  <Block>
                    <BlockTitle>Способ оплаты</BlockTitle>
                    <LeftPriceFields>
                      <Field name="paymentMethods.cash" type="checkbox">
                        {({ input }) => (
                          <CheckBoxCustom input={input} label="Наличными" />
                        )}
                      </Field>
                      <Field name="paymentMethods.wireTransfer" type="checkbox">
                        {({ input }) => (
                          <CheckBoxCustom
                            input={input}
                            label="Банковский перевод"
                          />
                        )}
                      </Field>
                    </LeftPriceFields>
                    <PriceFields>
                      <Field name="paymentMethods.bankingCard" type="checkbox">
                        {({ input }) => (
                          <CheckBoxCustom input={input} label="Оплата картой" />
                        )}
                      </Field>
                      <Field
                        name="paymentMethods.appleOrGooglePay"
                        type="checkbox"
                      >
                        {({ input }) => (
                          <CheckBoxCustom
                            input={input}
                            label="Apple Pay / Google Pay"
                          />
                        )}
                      </Field>
                    </PriceFields>
                  </Block>
                  <ButtonsWrap>
                    <WrapButton>
                      <Button
                        style={{ width: " 100%" }}
                        variant="red"
                        size="noWidth"
                        type="submit"
                      >
                        Применить фильтры
                      </Button>
                    </WrapButton>
                    <Button
                      onClick={() => {
                        setFilters(null);
                        setFilterOpen(false);
                      }}
                      variant="withBorder"
                      size="noWidth"
                    >
                      Сбросить все
                    </Button>
                  </ButtonsWrap>
                </form>
              );
            }}
          />
        </Content>
      </Collapse>
    </Wrapper>
  );
};

export default RentFilter;
