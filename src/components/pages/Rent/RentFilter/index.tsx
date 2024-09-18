import { Field, FieldRenderProps } from 'react-final-form'
import Collapse from '@material-ui/core/Collapse'
import AutoFocusedForm from '../../../blocks/Form/AutoFocusedForm'
import TextField from '../../../blocks/Form/TextField'
import SelectField from '../../../blocks/Form/SelectField'
import Button from '../../../ui/Button'
import scrollIntoView from 'scroll-into-view'
import {
  Block,
  BlockTitle,
  ButtonsWrap,
  CategoryWrap,
  Checkbox,
  Checkmark,
  Container,
  Content,
  ContentWrap,
  Label,
  LeftGroup,
  PriceFieldsWrapper,
  More,
  PriceWrap,
  Radio,
  SelectWrap,
  WrapButton,
  Wrapper,
} from './style'
import { FC, useState } from 'react'
import { ISetState, LazyType } from 'src/types/common'

export interface IFilters {
  activities: string
  allowJointRental: string
  allowSublease: string
  paymentMethods: {
    appleOrGooglePay: boolean
    bankingCard: boolean
    cash: boolean
    wireTransfer: boolean
  }
  pricing: {
    price: string
    type: string
  }
}

const RadioCustom: FC<FieldRenderProps<string, HTMLElement, string>> = ({
  input,
  children,
}) => {
  return (
    <>
      <Container>
        <Radio {...input} type="radio" />
        {children}
        <Checkmark />
      </Container>
    </>
  )
}

interface Props {
  setFilterOpen: ISetState<boolean>
  filterOpen: boolean
  setFilters: ISetState<IFilters | null>
  filters: IFilters | null
}

const RentFilter: FC<Props> = ({
  setFilterOpen,
  filterOpen,
  filters,
  setFilters,
}) => {
  const categoryList = [
    { value: '1', label: 'first' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ]

  const [initialValues, setInitialValues] = useState<
    Partial<Record<string, any>> | undefined
  >(
    filters || {
      pricing: {
        price: undefined,
        type: 'HOUR',
      },
      activities: categoryList[1].value,
      paymentMethods: {
        cash: false,
        wireTransfer: false,
        bankingCard: false,
        appleOrGooglePay: false,
      },
    },
  )

  const onSubmit = (values: { [K: string]: string }) => {
    console.log('values', values)
    setFilters(values as unknown as IFilters)
    setFilterOpen(false)
    const element = document.getElementById('result')
    if (element) {
      scrollIntoView(element, {
        time: 500,
        align: {
          top: 0,
          topOffset: 0,
        },
      })
    }
  }

  const configCheckBox = [
    { label: 'Наличными', name: 'paymentMethods.cash' },
    { label: 'Банковский перевод', name: 'paymentMethods.wireTransfer' },
    { label: 'Оплата картой', name: 'paymentMethods.bankingCard' },
    {
      label: 'Apple Pay / Google Pay',
      name: 'paymentMethods.appleOrGooglePay',
    },
  ]

  return (
    <Wrapper>
      <More disabled onClick={() => setFilterOpen(!filterOpen)}>
        {!filterOpen ? 'Больше параметров' : 'Меньше параметров'}
      </More>
      <Collapse in={filterOpen}>
        <Content>
          <AutoFocusedForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            setInitialValues={setInitialValues}
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
                            { value: 'HOUR', label: '₽ / ч.' },
                            { value: 'DAY', label: '₽ / д.' },
                            { value: 'WEEK', label: '₽ / н.' },
                            { value: 'MONTH', label: '₽ / м.' },
                            { value: 'YEAR', label: '₽ / г.' },
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
                    <PriceFieldsWrapper>
                      {configCheckBox.map(item => (
                        <Field
                          key={item.label}
                          name={item.name}
                          type="checkbox"
                        >
                          {({ input }) => (
                            <>
                              <Checkbox {...input} id={item.name} />
                              <Label htmlFor={item.name}>{item.label}</Label>
                            </>
                          )}
                        </Field>
                      ))}
                    </PriceFieldsWrapper>
                  </Block>
                  <ButtonsWrap>
                    <WrapButton>
                      <Button
                        style={{ width: ' 100%' }}
                        variant="red"
                        size="noWidth"
                        type="submit"
                      >
                        Применить фильтры
                      </Button>
                    </WrapButton>
                    <Button
                      onClick={() => {
                        setFilters(null)
                        setFilterOpen(false)
                      }}
                      variant="withBorder"
                      size="noWidth"
                    >
                      Сбросить все
                    </Button>
                  </ButtonsWrap>
                </form>
              )
            }}
          />
        </Content>
      </Collapse>
    </Wrapper>
  )
}

export default RentFilter
