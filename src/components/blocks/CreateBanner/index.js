import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { useCallback, useState } from 'react'
import AutoFocusedForm from '../Form/AutoFocusedForm'
import { FieldStyled } from '../../blocks/Cabinet/components/CabinetForm/styled'
import { TextField } from '../Form'
import { required } from '../../../utils/validations'
import ErrorPopup from '../Form/Error'
import { laptopBreakpoint } from '../../../styles/variables'
import Button from '../../ui/Button'
import PhotoAdd from './PhotoAdd'
import { createBannerMutation } from '../../../_graphql-legacy/baners/createBannerMutation'

const FieldWrap = styled.div`
  margin-bottom: 14px;
`

const TimeWrap = styled.div`
  margin-left: 14px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 0;
    margin-bottom: 10px;
  }
`

const ButtonWrap = styled.div`
  width: 350px;
  margin-top: 66px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-top: 40px;
  }
`

const PhotoTop = styled.div`
  width: 100%;
  height: 163px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  @media (max-width: ${laptopBreakpoint}) {
    height: 133px;
  }
`

const CreateBanner = ({ setCreateBanner, refetch }) => {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [photoId, setPhotoId] = useState(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [hover, setHover] = useState(false)

  const [createBanner] = useMutation(createBannerMutation, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setLoading(false)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
    onCompleted: async () => {
      setLoading(false)
      await refetch()
      setCreateBanner(false)
    },
  })

  const onSubmit = useCallback(
    async values => {
      if (!photoId) {
        setErrors(['Необходимо добавить фото'])
        setErrorPopupOpen(true)
        return
      }
      setLoading(true)
      createBanner({
        variables: {
          input: {
            requestComment: values.requestComment,
            adHeader: values.adHeader,
            adText: values.adText,
            adImage: photoId,
          },
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photoId],
  )

  const onAdd = photoId => {
    setPhotoId(photoId)
  }

  return (
    <>
      <AutoFocusedForm
        onSubmit={onSubmit}
        subscription={{ values: true }}
        render={({ handleSubmit, pristine, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <PhotoTop
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <PhotoAdd
                  photoId={photoId}
                  hover={hover && photoId}
                  onAdd={onAdd}
                />
              </PhotoTop>
              <FieldWrap>
                <FieldStyled
                  name="adHeader"
                  component={TextField}
                  label="Название рекламы"
                  validate={required}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="adText"
                  component={TextField}
                  label="Описание рекламы"
                  validate={required}
                  multiline={true}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="requestComment"
                  component={TextField}
                  label="Комментарий"
                  validate={required}
                  multiline={true}
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
                  onClick={() => setCreateBanner(false)}
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

export default CreateBanner
