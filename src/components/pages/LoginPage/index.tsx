import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import {
  Wrapper,
  FormWrapper,
  Form,
  Label,
  Input,
  CheckboxWrapper,
  Checkbox,
  Title,
  ButtonWrapper,
  ButtonMobileWrapper,
  Content,
  NotAuthorized,
  TitleWrapper,
  SwitchButton,
} from './styles'
import Button from '../../ui/Button'
import ErrorPopup from '../../blocks/Form/Error'
import { login } from 'src/api/graphql/me/mutations/login'
import { getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { setCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'
import { register } from 'src/api/graphql/me/mutations/register'
import { ICity } from 'src/types'

const LoginPage: FC = () => {
  const { setMe } = useAuthStore(getStoreEvent)
  const [loading, setLoading] = useState<boolean>(false)
  const [isRegister, setIsRegister] = useState(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [valueEmail, setValueEmail] = useState<string>('')
  const [valuePassword, setValuePassword] = useState<string>('')

  const [valueCode, setValueCode] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [errors, setErrors] = useState<string[] | null>(null)
  const [openCode, setOpenCode] = useState<boolean>(false)
  const dev = process.env.NEXT_PUBLIC_ENV !== 'production'
  const [Login] = useMutation(login, {
    onCompleted: data => {
      setCookie(authConfig.tokenKeyName, data.login.jwt)
      setMe({ info: { ...data.login.user } })
      router.push('/masterCabinet')
    },
    onError: error => {
      console.log(error)

      setLoading(false)
      setErrors(['Проверьте ваши учетные данные'])
    },
  })

  const [registerMutation] = useMutation(register, {
    onCompleted: data => {
      if (data) {
        setCookie(authConfig.tokenKeyName, data.register.jwt)
        setMe({ info: { ...data.register.user } })
        router.push('/masterCabinet')
      }
    },
    onError: error => {
      setLoading(false)
      setErrors([error.message])
    },
  })

  const router = useRouter()
  // const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
  //   skip: true,
  //   onCompleted: res => {
  //     setMe({
  //       info: res?.me?.info,
  //       master: res?.me?.master,
  //       locationByIp: res?.locationByIp,
  //       salons: res?.me?.salons,
  //       rentalRequests: res?.me?.rentalRequests,
  //     })
  //   },
  // })

  const handleSubmit = ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    setLoading(true)
    if (isRegister) {
      registerMutation({ variables: { email, username: email, password } })
    } else {
      Login({ variables: { email, password } })
    }
  }

  return (
    <MainLayout>
      <MainContainer>
        <Wrapper>
          <Content>
            <FormWrapper>
              <TitleWrapper>
                <SwitchButton
                  isActive={!isRegister}
                  onClick={() => setIsRegister(false)}
                >
                  <Title>Войти</Title>
                </SwitchButton>
                <SwitchButton
                  isActive={isRegister}
                  onClick={() => setIsRegister(true)}
                >
                  <Title>Зарегистрироваться</Title>
                </SwitchButton>
              </TitleWrapper>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  handleSubmit({ email: valueEmail, password: valuePassword })
                }}
              >
                <Label>Введите email</Label>
                <Input
                  style={{ marginTop: '0' }}
                  value={valueEmail}
                  type="text"
                  id="email"
                  name="email"
                  onChange={e => {
                    setValueEmail(e.target.value)
                  }}
                />
                <Label>Введите пароль</Label>
                <Input
                  style={{ marginTop: '0' }}
                  value={valuePassword}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  onChange={e => {
                    setValuePassword(e.target.value)
                  }}
                />
                <CheckboxWrapper onClick={() => setShowPassword(!showPassword)}>
                  <Checkbox
                    type="checkbox"
                    name="showPassword"
                    checked={showPassword}
                  />
                  <Label>Показать пароль</Label>
                </CheckboxWrapper>
                <Button
                  variant="red"
                  size="fullWidth"
                  font="medium"
                  style={{ marginTop: 16 }}
                  mt="67"
                  mb="105"
                  onClick={e => loading && e.preventDefault()}
                  disabled={valueEmail === '' || valuePassword === ''}
                  loading={loading}
                  type="submit"
                >
                  {loading ? 'Подождите' : 'Подтвердить'}
                </Button>
              </Form>
            </FormWrapper>
          </Content>
          <ErrorPopup errors={errors} setErrors={setErrors} />
        </Wrapper>
      </MainContainer>
    </MainLayout>
    // <MainLayout>
    //   <MainContainer>
    //     <Wrapper>
    //       <Content>
    //         {/* {router?.query?.error === "notAuthorized" && (
    //           <NotAuthorized>
    //             Для формирования профессионального заказа у бренда войдите или
    //             создайте свой профиль
    //           </NotAuthorized>
    //         )} */}
    //         <FormWrapper>
    //           <Title>Войти или зарегистрироваться</Title>
    //           <Form onSubmit={e => console.log(e) && handleClick(e)}>
    //             {!openCode ? (
    //               <>
    //                 <Input
    //                   value={value}
    //                   onChange={e => setValue(e.target.value)}
    //                   type="text"
    //                   name="info"
    //                   placeholder="Телефон или E-mail"
    //                 />
    //                 <Input
    //                   value={value}
    //                   onChange={e => setValue(e.target.value)}
    //                   type="text"
    //                   name="password"
    //                   placeholder="Password"
    //                 />
    //                 <CheckboxWrapper onClick={checkboxHandler}>
    //                   <Checkbox
    //                     type="checkbox"
    //                     name="agreement"
    //                     checked={checked}
    //                   />
    //                   <Label>Я принимаю условия использования</Label>
    //                 </CheckboxWrapper>
    //               </>
    //             ) : (
    //               <Input
    //                 value={valueCode}
    //                 onChange={e => setValueCode(e.target.value)}
    //                 type="text"
    //                 name="code"
    //                 autoComplete="one-time-code"
    //                 placeholder="Введите код"
    //                 inputMode="numeric"
    //                 pattern="[0-9]*"
    //               />
    //             )}
    //
    //           </Form>
    //         </FormWrapper>
    //         <ButtonWrapper>
    //           {!openCode ? (
    //             <Button
    //               variant="red"
    //               size="fullWidth"
    //               font="medium"
    //               mt="67"
    //               mb="105"
    //               disabled={!checked || !value.length}
    //               onClick={handleClick}
    //             >
    //               Получить код
    //             </Button>
    //           ) : (
    //             <Button
    //               variant="red"
    //               size="fullWidth"
    //               font="medium"
    //               style={{ marginTop: 16 }}
    //               mt="67"
    //               mb="105"
    //               onClick={handleClickCode}
    //               disabled={valueCode === ''}
    //             >
    //               Подтвердить
    //             </Button>
    //           )}
    //         </ButtonWrapper>
    //       </Content>
    //       <ButtonMobileWrapper>
    //         {!openCode ? (
    //           <Button
    //             variant="red"
    //             size="fullWidth"
    //             font="popUp"
    //             mb="59"
    //             disabled={!checked || !value.length}
    //             onClick={handleClick}
    //           >
    //             Получить код
    //           </Button>
    //         ) : (
    //           <Button
    //             variant="red"
    //             size="fullWidth"
    //             font="popUp"
    //             mb="59"
    //             onClick={handleClickCode}
    //             disabled={valueCode === ''}
    //           >
    //             Подтвердить
    //           </Button>
    //         )}
    //       </ButtonMobileWrapper>
    //       <Error
    //         errors={errors}
    //         isOpen={isErrorPopupOpen}
    //         setOpen={setErrorPopupOpen}
    //       />
    //     </Wrapper>
    //   </MainContainer>
    // </MainLayout>
  )
}

export default LoginPage
