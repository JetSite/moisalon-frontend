import React, { FC } from 'react'
import DictionaryItem from './DictionaryItem'
import Group from '../Group'
import { IServiceInForm } from 'src/types/services'
import { FieldArrayRenderProps } from 'react-final-form-arrays'

export interface IDictionaryGroupFormProps {
  name: string
  value: any[]
  push: (value: any) => void
  remove: (index: number) => any
}

interface Props extends IDictionaryGroupFormProps {
  group: IServiceInForm
}

const DictionaryGroup: FC<Props> = ({
  group,
  value,
  name: groupName,
  ...rest
}) => {
  const { description, items = [] } = group
  const dictionary = items.map(item => {
    const checked = value?.map(t => t.id).indexOf(item.id) > -1

    const itemProps = {
      ...item,
      ...rest,
      value,
      checked,
    }
    return itemProps
  })

  return (
    <Group mbDesc={35} description={description}>
      {dictionary.map((item, index) => {
        const name = index === 0 ? groupName : ''
        return <DictionaryItem {...item} name={name} key={item.id} />
      })}
    </Group>
  )
}

export default DictionaryGroup
