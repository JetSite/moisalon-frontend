import { FC, useState } from 'react'
import styled from 'styled-components'
import { FieldArray } from 'react-final-form-arrays'
import DictionaryItem from './DictionaryItem'
import DefaultDictionaryItem from './DefaultDictionaryItem'
import Group from '../Group'
import { pluralize } from '../../../../utils/pluralize'
import { FormHelperText, Box, useMediaQuery, useTheme } from '@material-ui/core'
import { laptopBreakpoint } from '../../../../styles/variables'
import { ILengthValidate } from 'src/utils/validations'
import { IActivitiesInForm } from 'src/components/pages/Salon/CreateSalon/components/RegistrationForm/components/SalonActivities'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'

const AllChecked = styled.input<{ check?: boolean }>`
  background: ${props => (!props.check ? '#fff' : '#f03')};
  border: ${props => (!props.check ? '1px solid #000000' : '1px solid #f03')};
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  padding: 9px 55px;
  color: ${props => (!props.check ? '#000' : '#fff')};

  @media (max-width: ${laptopBreakpoint}) {
    padding: 6px 23px;
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`

const ShowMore = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
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
  }
`

interface Props {
  title?: string
  description?: string
  name: string
  // groups: IActivitiesInForm[]
  groups: any[]
  fullWidth?: boolean
  withButton?: boolean
  validate?: ILengthValidate
  mbDesc?: number
  mbWrapper?: number
  onlyOneChoose?: boolean
}

export interface IActivitiesItemInForm extends IActivitiesInForm {
  checked: boolean
  index: number
}

const DictionaryField: FC<Props> = props => {
  const {
    title,
    description,
    name,
    groups = [],
    fullWidth = true,
    withButton = false,
    validate,
    mbDesc = 75,
    mbWrapper = 54,
    onlyOneChoose = false,
  } = props
  const [isOpenMore, setIsOpenMore] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  // const items: IActivitiesItemInForm[] = groups.map((group, index) => ({
  //   ...group,
  //   checked: false,
  //   index,
  // }))

  const items = groups.map((group, index) => ({
    ...group,
    // title: group.title,
    checked: false,
    index,
  }))

  const groupProps = {
    title,
    description,
    fullWidth,
    withButton,
  }

  return (
    <Group mbWrapper={mbWrapper} mbDesc={mbDesc} {...groupProps}>
      <FieldArray name={name} validate={validate}>
        {arrayField => {
          const { fields, meta } = arrayField
          const { value = [] } = fields

          const onChangeDefault = (item: IActivitiesInForm, i: number) => {
            if (fields.value[0] !== item) {
              fields.swap(0, i)
            }
          }

          const checkedItems = items.filter(item => value.indexOf(item.id) > -1)
          const checkedItemsLength = checkedItems.length
          const unCheckedItems = items
            .filter(item => value.indexOf(item.id) < 0)
            .slice(0, 5 - checkedItemsLength)

          const collapsedItems =
            checkedItemsLength >= 5
              ? checkedItems
              : [
                  ...checkedItems,
                  ...unCheckedItems.slice(0, 5 - checkedItemsLength),
                ]

          const dictionaryItems =
            isMobile && !isOpenMore ? collapsedItems : items

          const dictionary = dictionaryItems.map(({ index, ...group }) => {
            const checked = value.indexOf(group.id) > -1

            const itemProps = {
              item: {
                ...group,
                label: group?.title,
                checked,
              },
              fields,
              index,
              name: index === 0 ? name : undefined,
            }

            return (
              <DictionaryItem
                {...itemProps}
                key={group.id}
                onlyOneChoose={onlyOneChoose}
              />
            )
          })

          const moreItems = isMobile ? (
            <ShowMore
              className="dictionaryField__more blueLink"
              onClick={() => setIsOpenMore(!isOpenMore)}
            >
              {!isOpenMore
                ? `Показать еще ${pluralize(
                    items.length - collapsedItems.length,
                    name !== 'equipment' ? 'деятельность' : 'оборудование',
                    name !== 'equipment' ? 'деятельности' : 'оборудование',
                    name !== 'equipment' ? 'деятельности' : 'оборудование',
                  )}`
                : `Скрыть ${
                    name !== 'equipment' ? 'виды деятельности' : 'оборудование'
                  }`}
            </ShowMore>
          ) : null

          const isAllChecked = checkedItems.length === items.length

          const checkAllHandler = () => {
            if (isAllChecked) {
              return items.forEach((item, i, arr) => {
                fields.pop()
              })
            } else {
              return items
                .filter(item => value.indexOf(item.id) < 0)
                .forEach((item, i, arr) => {
                  fields.push(item.id)
                })
            }
          }

          const allCheckedValue = isAllChecked ? 'Убрать все' : 'Выбрать все'

          return (
            <>
              {meta.error && meta.touched ? (
                <Box mb={2} ml="5px">
                  <FormHelperText error>{meta.error}</FormHelperText>
                </Box>
              ) : null}
              {dictionary}

              {!onlyOneChoose ? (
                <>
                  <AllChecked
                    onClick={checkAllHandler}
                    type="button"
                    check={isAllChecked}
                    value={allCheckedValue}
                    name={name}
                  />
                  {/* <br />
                  <br /> */}
                </>
              ) : null}
              <br />
              {moreItems}
              {/* {value?.length > 1 && defaultSpecialization ? (
                <DefaultDictionaryItem
                  onChangeDefault={onChangeDefault}
                  group={dictionaryItems}
                  items={value}
                />
              ) : null} */}
            </>
          )
        }}
      </FieldArray>
    </Group>
  )
}

export default DictionaryField
