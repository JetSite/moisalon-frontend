import { useState } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import Button from '../../../../../ui/Button'
import { useMutation } from '@apollo/react-hooks'
import { TextField } from '../../../../../blocks/Form'
import { Field } from 'react-final-form'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import Error from '../../../../../blocks/Form/Error'
import { addBrandProductsPriceMutation } from '../../../../../../_graphql-legacy/brand/addBrandProductsPrice'
import Success from '../../../../../blocks/Form/Success'
import { addBrandProductsFormMutation } from '../../../../../../_graphql-legacy/brand/addBrandProductsForm'
import { addBrandProductsPhotosMutation } from '../../../../../../_graphql-legacy/brand/addBrandProductsPhotos'
import { laptopBreakpoint } from '../../../../../../styles/variables'
const Wrapper = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 20px;
  }
`

const Title = styled.p`
  font-weight: 500;
  margin-bottom: 20px;
`
const Or = styled.p`
  font-weight: 500;
  margin-top: 20px;
`
const InputFile = styled.input`
  p {
    font-size: 10px;
  }
`

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: white;
  padding: 16px 28px;
  min-width: 134px;
  border: none;
  outline: none;
  cursor: pointer;
  display: inline-block;
  transition: 0.3s;
  position: relative;
  border: 1px solid #f03;
  background-color: #f03;
  &:hover {
    background-color: ${lighten(0.1, '#f03')};
  }
`

const FormXSLX = styled.form``

const LinkCustom = styled.a`
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  color: #000;
`

const FileName = styled.p`
  margin-top: 10px;
`

const TitleText = styled.p`
  margin-bottom: 30px;
  line-height: 22px;
`

const dev = process.env.NEXT_PUBLIC_ENV !== 'production'

const uploadFile = async file => {
  const uploadUrl = dev
    ? `https://stage-moi.moi.salon/api/file/upload/xlsx`
    : `https://moi.salon/api/file/upload/xlsx`
  const formData = new FormData()
  formData.append('file', file)
  const options = {
    method: 'POST',
    body: formData,
    credentials: 'include',
  }
  return fetch(uploadUrl, options).then(response => {
    if (response.status !== 200) {
      throw new Error('Не удалось загрузить файл.')
    }
    return response.text()
  })
}

const uploadFileProducts = async file => {
  const uploadUrl = dev
    ? `https://stage-moi.moi.salon/api/file/upload/zip`
    : `https://moi.salon/api/file/upload/zip`
  const formData = new FormData()
  formData.append('file', file)
  const options = {
    method: 'POST',
    body: formData,
    credentials: 'include',
  }
  return fetch(uploadUrl, options).then(response => {
    if (response.status !== 200) {
      throw new Error('Не удалось загрузить файл.')
    }
    return response.text()
  })
}

const Files = ({ id }) => {
  const [fileXsl, setFileXsl] = useState(undefined)
  const [fileProduct, setFileProduct] = useState(undefined)
  const [errors, setErrors] = useState(null)
  const [successText, setSuccessText] = useState(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false)
  const [loadingFile, setLoadingFile] = useState(false)
  const [loadingFileProduct, setLoadingFileProduct] = useState(false)

  const [addProductPrice] = useMutation(addBrandProductsPriceMutation, {
    onCompleted: () => {
      setFileXsl(undefined)
      !isSuccessPopupOpen && setSuccessText('Файл с ценами успешно загружен')
      setLoadingFile(false)
      !isSuccessPopupOpen && setSuccessPopupOpen(true)
    },
  })
  const [addProductPhotos] = useMutation(addBrandProductsPhotosMutation, {
    onCompleted: () => {
      setFileProduct(undefined)
      !isSuccessPopupOpen && setSuccessText('Архив успешно загружен')
      setLoadingFileProduct(false)
      !isSuccessPopupOpen && setSuccessPopupOpen(true)
    },
  })
  const [addProductForm] = useMutation(addBrandProductsFormMutation, {
    onCompleted: () => {
      !isSuccessPopupOpen && setSuccessText('Ссылка на цены отправлена')
      setLoadingFileProduct(false)
      !isSuccessPopupOpen && setSuccessPopupOpen(true)
    },
  })
  const [addProductPhotoForm] = useMutation(addBrandProductsFormMutation, {
    onCompleted: () => {
      !isSuccessPopupOpen && setSuccessText('Ссылка на облако отправлена')
      setLoadingFileProduct(false)
      !isSuccessPopupOpen && setSuccessPopupOpen(true)
    },
  })

  const handeSubmitXSLX = async values => {
    if (values?.fileXlsx) {
      addProductForm({
        variables: {
          input: {
            id,
            priceProductsFileExternal: values?.fileXlsx,
          },
        },
      })
    }
    if (fileXsl) {
      setLoadingFile(true)
      await uploadFile(fileXsl)
        .then(res => {
          addProductPrice({
            variables: {
              input: {
                id,
                priceProductsFile: res,
              },
            },
          })
        })
        .catch(error => {
          setErrors(error)
          setLoadingFile(false)
        })
    }
  }

  const handeSubmitFile = async values => {
    if (values?.fileProduct) {
      addProductPhotoForm({
        variables: {
          input: {
            id,
            photosProductsFilesExternal: values?.fileProduct,
          },
        },
      })
    }
    if (fileProduct) {
      setLoadingFileProduct(true)
      await uploadFileProducts(fileProduct)
        .then(res => {
          addProductPhotos({
            variables: {
              input: {
                id,
                photosProductsFile: res,
              },
            },
          })
        })
        .catch(error => {
          setErrors(error)
          setLoadingFileProduct(false)
        })
    }
  }

  const onSelectXSLXHandler = values => {
    setFileXsl(values[0])
  }

  const onSelectFileHandler = values => {
    setFileProduct(values[0])
  }

  return (
    <Wrapper>
      <TitleText>
        В этом разделе вы можете загрузить весь ассортимент предлагаемой
        продукции. Шаблон, используемый при загрузке ассортимента можно{' '}
        <LinkCustom href="/example.xlsx">скачать тут.</LinkCustom> Если у вас
        есть ссылка на папку в облаке, содержащую нужные данные, можете также
        указать и её, в полях ниже.{' '}
      </TitleText>
      <AutoFocusedForm
        onSubmit={handeSubmitXSLX}
        render={({ handleSubmit, pristine, form }) => {
          return (
            <FormXSLX
              onSubmit={event =>
                handleSubmit(event).then(() => {
                  form.reset()
                })
              }
            >
              <Title>
                Загрузите список цен в формате xlsx или добавьте ссылку на файл
              </Title>
              <Label for="file-upload">Выберите файл</Label>
              <input
                type="file"
                id="file-upload"
                hidden
                accept=".xls,.xlsx"
                onChange={({ target }) => onSelectXSLXHandler(target.files)}
              />
              {fileXsl ? <FileName>{fileXsl.name}</FileName> : null}
              <Field
                name="fileXlsx"
                component={TextField}
                label="Введите ссылку на файл со списком цен"
              />
              <Button
                style={{ marginTop: 50, marginBottom: 50 }}
                variant="red"
                size="noWidth"
                type="submit"
                disabled={(pristine && !fileXsl) || loadingFile}
              >
                {loadingFile ? 'Подождите...' : 'Отправить'}
              </Button>
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              <Success
                text={successText}
                isOpen={isSuccessPopupOpen}
                setOpen={setSuccessPopupOpen}
              />
            </FormXSLX>
          )
        }}
      />
      <AutoFocusedForm
        onSubmit={handeSubmitFile}
        render={({ handleSubmit, pristine, form }) => {
          return (
            <FormXSLX
              onSubmit={event =>
                handleSubmit(event).then(() => {
                  form.reset()
                })
              }
            >
              <Title>
                Загрузите архив фотографий продуктов в формате zip или rar
              </Title>
              <Label for="file-uploadRar">Выберите файл</Label>
              <input
                type="file"
                id="file-uploadRar"
                hidden
                accept=".rar,.zip"
                onChange={({ target }) => onSelectFileHandler(target.files)}
              />
              {fileProduct ? <FileName>{fileProduct.name}</FileName> : null}
              <Field
                name="fileProduct"
                component={TextField}
                label="Введите ссылку на облако с фотографиями продуктов"
              />
              <Button
                style={{ marginTop: 50 }}
                variant="red"
                size="noWidth"
                type="submit"
                disabled={(pristine && !fileProduct) || loadingFileProduct}
              >
                {loadingFileProduct ? 'Подождите...' : 'Отправить'}
              </Button>
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              <Success
                text={successText}
                isOpen={isSuccessPopupOpen}
                setOpen={setSuccessPopupOpen}
              />
            </FormXSLX>
          )
        }}
      />
    </Wrapper>
  )
}

export default Files
