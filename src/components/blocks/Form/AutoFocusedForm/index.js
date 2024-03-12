import React, { useMemo } from "react";
import { Form } from "react-final-form";
import createDecorator from "final-form-focus";
import arrayMutators from "final-form-arrays";

const focusOnErrors = createDecorator();
const defaultDecarators = [focusOnErrors];
const defaultSubscription = {
  submitting: true,
  pristine: true,
  valid: true,
  dirty: true,
  submitSucceeded: true,
};

const AutoFocusedForm = ({
  decorators = [],
  mutators = {},
  subscription = {},
  onSubmit,
  defaultValues = {},
  ...rest
}) => {
  const mergedSubmit = (values) => {
    const mergedValues = { ...defaultValues, ...values };
    return onSubmit(mergedValues);
  };

  const mergedDecorators = useMemo(() => {
    return [...defaultDecarators, ...decorators];
  }, [decorators]);

  const mergedSubscription = useMemo(() => {
    return {
      ...defaultSubscription,
      ...subscription,
    };
  }, [subscription]);

  const mergedMutators = useMemo(() => {
    return {
      ...arrayMutators,
      ...mutators,
    };
  }, [mutators]);

  return (
    <Form
      mutators={mergedMutators}
      decorators={mergedDecorators}
      subscription={mergedSubscription}
      onSubmit={mergedSubmit}
      {...rest}
    />
  );
};

export default AutoFocusedForm;
