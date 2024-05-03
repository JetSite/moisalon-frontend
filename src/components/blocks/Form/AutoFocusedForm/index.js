import React, { useMemo } from 'react'
import { Form } from 'react-final-form'
import createDecorator from 'final-form-focus'
import arrayMutators from 'final-form-arrays'

const focusOnErrors = createDecorator()
const defaultDecarators = [focusOnErrors]
const defaultSubscription = {
  submitting: true,
  pristine: true,
  valid: true,
  dirty: true,
  submitSucceeded: true,
}

const AutoFocusedForm = ({
  decorators = [],
  mutators = {},
  subscription = {},
  onSubmit,
  defaultValues = {},
  ...rest
}) => {
  const mergedSubmit = values => {
    const mergedValues = { ...defaultValues, ...values }
    return onSubmit(mergedValues)
  }

  const mergedDecorators = useMemo(() => {
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

// import React, { useMemo, ReactNode } from "react";
// import { Form } from "react-final-form";
// import createDecorator from "final-form-focus";
// import arrayMutators from "final-form-arrays";
// import { Mutator } from "final-form";

// // Определяем типы для свойств компонента AutoFocusedForm
// interface AutoFocusedFormProps {
//   decorators?: any[]; // Тип декораторов неизвестен, поэтому используем any[]
//   mutators?: { [key: string]: Mutator<any> }; // Тип мутаторов из final-form
//   subscription?: { [key: string]: boolean }; // Тип подписок также может быть изменен
//   onSubmit: (values: any) => void; // Функция обработки отправки формы
//   defaultValues?: { [key: string]: any }; // Значения по умолчанию для формы
//   children?: ReactNode; // Дети компонента
// }

// // Создаем декоратор для фокусировки на ошибках
// const focusOnErrors = createDecorator();
// const defaultDecorators = [focusOnErrors];

// // Объект подписок по умолчанию
// const defaultSubscription = {
//   submitting: true,
//   pristine: true,
//   valid: true,
//   dirty: true,
//   submitSucceeded: true,
// };

// const AutoFocusedForm: React.FC<AutoFocusedFormProps> = ({
//   decorators = [],
//   mutators = {},
//   subscription = {},
//   onSubmit,
//   defaultValues = {},
//   ...rest
// }) => {
//   // Объединяем функции слияния, чтобы использовать в useMemo
//   const mergedSubmit = (values: any) => {
//     const mergedValues = { ...defaultValues, ...values };
//     return onSubmit(mergedValues);
//   };

//   // Объединяем декораторы с декораторами по умолчанию
//   const mergedDecorators = useMemo(() => {
//     return [...defaultDecorators, ...decorators];
//   }, [decorators]);

//   // Объединяем подписки с подписками по умолчанию
//   const mergedSubscription = useMemo(() => {
//     return {
//       ...defaultSubscription,
//       ...subscription,
//     };
//   }, [subscription]);

//   // Объединяем мутаторы с мутаторами по умолчанию
//   const mergedMutators = useMemo(() => {
//     return {
//       ...arrayMutators,
//       ...mutators,
//     };
//   }, [mutators]);

//   // Рендерим форму React Final Form с объединенными свойствами
//   return (
//     <Form
//       mutators={mergedMutators}
//       decorators={mergedDecorators}
//       subscription={mergedSubscription}
//       onSubmit={mergedSubmit}
//       {...rest}
//     />
//   );
// };

// export default AutoFocusedForm;
