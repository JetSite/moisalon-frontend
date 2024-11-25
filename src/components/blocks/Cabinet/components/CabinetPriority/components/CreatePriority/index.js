import styled from 'styled-components'
import { useState, useCallback } from 'react'
import AutoFocusedForm from '../../../../../Form/AutoFocusedForm'
import { FieldStyled } from '../../../CabinetForm/styled'
import { TextField } from '../../../../../Form'
import { required } from '../../../../../../../utils/validations'
import ErrorPopup from '../../../../../Form/Error'
import { laptopBreakpoint } from '../../../../../../../styles/variables'
import Button from '../../../../../../ui/Button'
import { createPriorityMutation } from '../../../../../../../_graphql-legacy/priority/createPriorityMutation'
import { useMutation } from '@apollo/client'

const FieldWrap = styled.div`
  margin-bottom: 14px;
`

const ButtonWrap = styled.div`
  width: 350px;
  margin-top: 66px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-top: 40px;
  }
`

const CreatePriority = ({
  setCreatePriority,
  type,
  activeProfile,
  refetch,
}) => {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)

  const [createPriority] = useMutation(createPriorityMutation, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setLoading(false)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
    onCompleted: async data => {
      setLoading(false)
      await refetch({
        variables: {
          originId: activeProfile.id,
        },
      })
      setCreatePriority(false)
    },
  })

  const onSubmit = useCallback(
    async values => {
      setLoading(true)
      createPriority({
        variables: {
          input: {
            requestComment: values.requestComment,
            origin: type.toUpperCase(),
            originId: activeProfile?.id,
          },
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <>
      <AutoFocusedForm
        onSubmit={onSubmit}
        subscription={{ values: true }}
        render={({ handleSubmit, pristine, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FieldWrap>
                <FieldStyled
                  name="requestComment"
                  component={TextField}
                  label="Описание предложения"
                  validate={required}
                  requiredField
                />
              </FieldWrap>
              <ErrorPopup errors={errors} setErrors={setErrors} />
              <ButtonWrap>
                <Button
                  variant="red"
                  size="width100"
                  type="submit"
                  disabled={pristine || loading}
                >
                  {loading ? 'Подождите' : 'Сохранить'}
                </Button>
                <Button
                  variant="darkTransparent"
                  size="width100"
                  type="submit"
                  style={{ marginTop: 20 }}
                  onClick={() => setCreatePriority(false)}
                >
                  Отменить
                </Button>
              </ButtonWrap>
            </form>
          )
        }}
      />
    </>
  )
}

export default CreatePriority
