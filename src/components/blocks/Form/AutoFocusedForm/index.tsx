import React, { FC, useMemo } from 'react'
import { Form, FormProps, FormRenderProps } from 'react-final-form'
import createDecorator from 'final-form-focus'
import arrayMutators from 'final-form-arrays'
import { Decorator, FormApi, Mutator } from 'final-form'
import { ISetState, LazyType } from 'src/types/common'
import { isEqual } from 'lodash'

interface Props<T> extends Omit<FormProps<T>, 'onSubmit' | 'render'> {
  defaultValues?: Partial<Record<string, any>>
  setInitialValues?: ISetState<Partial<Record<string, any>> | undefined>
  onSubmit: (values: T, form: FormApi<T>) => void
  render: (props: FormRenderProps<T, Partial<T>>) => React.ReactNode | undefined
}

const focusOnErrors = createDecorator()
const defaultDecarators = [focusOnErrors]
const defaultSubscription = {
  submitting: true,
  pristine: true,
  valid: true,
  dirty: true,
  submitSucceeded: true,
  values: true,
}

const AutoFocusedForm = <T,>({
  decorators = [],
  mutators = {},
  subscription = {},
  onSubmit,
  defaultValues,
  setInitialValues,
  render,
  ...rest
}: Props<T>) => {
  const mergedSubmit = (values: T) => {
    const mergedValues = { ...defaultValues, ...values }
    return onSubmit(mergedValues, {} as FormApi<T>)
  }

  const mergedDecorators: Decorator<T, Partial<T>>[] = useMemo(() => {
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
    <Form<T>
      render={render}
      mutators={mergedMutators}
      decorators={mergedDecorators}
      subscription={mergedSubscription}
      onSubmit={mergedSubmit}
      initialValuesEqual={(initial, values) => isEqual(initial, values)}
      {...rest}
    />
  )
}

export default AutoFocusedForm
