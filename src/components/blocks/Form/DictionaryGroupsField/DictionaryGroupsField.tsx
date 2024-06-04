import React, { FC } from 'react'
import DictionaryGroup from './DictionaryGroup'
import { FieldArray } from 'react-final-form-arrays'
import { IServiceInForm } from 'src/types/services'

interface Props {
  name: string
  groups: IServiceInForm[]
}

const DictionaryGroupsField: FC<Props> = ({ name, groups = [] }) => {
  return (
    <FieldArray name={name}>
      {arrayField => {
        const {
          fields: { value = [], push, remove },
        } = arrayField
        const groupControls = groups.map(group => {
          const groupProps = {
            group,
            value,
            push,
            remove,
            name,
          }
          return <DictionaryGroup {...groupProps} key={group.id} />
        })
        return groupControls
      }}
    </FieldArray>
  )
}

export default DictionaryGroupsField
