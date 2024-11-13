import { MutableRefObject, useCallback, useRef } from 'react'
import { FormApi } from 'final-form'

export const useFormSubscription = <T>(
  formApi: FormApi<T>,
  formRef: MutableRefObject<FormApi<T> | null>,
) => {
  return useCallback(() => {
    formRef.current = formApi
  }, [])
}
