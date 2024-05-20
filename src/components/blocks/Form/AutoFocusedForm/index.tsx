import React, { FC, useMemo } from 'react'
import { Form, FormProps } from 'react-final-form'
import createDecorator from 'final-form-focus'
import arrayMutators from 'final-form-arrays'
import { Decorator, FormApi, Mutator } from 'final-form'
import { ISetState, LazyType } from 'src/types/common'

interface Props extends FormProps {
  defaultValues?: Partial<Record<string, any>> | undefined
  setInitialValues?: ISetState<Partial<Record<string, any>> | undefined>
}

const focusOnErrors = createDecorator()
const defaultDecarators = [focusOnErrors]
const defaultSubscription = {
  submitting: true,
  pristine: true,
  valid: true,
  dirty: true,
  submitSucceeded: true,
}

const AutoFocusedForm: FC<Props> = ({
  decorators = [],
  mutators = {},
  subscription = {},
  onSubmit,
  defaultValues,
  setInitialValues,
  ...rest
}) => {
  const mergedSubmit = (values: { [key: string]: string }) => {
    const mergedValues = { ...defaultValues, ...values }
    return onSubmit(mergedValues, {} as FormApi<Record<string, any>>)
  }

  const mergedDecorators: Decorator<
    Record<string, any>,
    Partial<Record<string, any>>
  >[] = useMemo(() => {
    return [...defaultDecarators, ...decorators]
  }, [decorators])

  const mergedSubscription = useMemo(() => {
    return {
      ...defaultSubscription,
      ...subscription,
    }
  }, [subscription])

  const mergedMutators = useMemo(() => {
    return {
      ...arrayMutators,
      ...mutators,
    }
  }, [mutators])

  setInitialValues && setInitialValues(rest.initialValues)
  return (
    <Form
      mutators={mergedMutators}
      decorators={mergedDecorators}
      subscription={mergedSubscription}
      onSubmit={mergedSubmit}
      {...rest}
    />
  )
}

export default AutoFocusedForm
