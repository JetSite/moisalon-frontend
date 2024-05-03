import React, { useState } from 'react'
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
} from './styles'
import Button from '../../ui/Button'
import Error from '../../blocks/Form/Error'
import { login } from 'src/graphql/me/mutations/login'
import { getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { setCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'

const LoginPage = () => {
  const { setMe } = useAuthStore(getStoreEvent)
  const [checked, setChecked] = useState<boolean>(false)
  const [valueEmail, setValueEmail] = useState<string>('')
  const [valuePassword, setValuePassword] = useState<string>('')

  const [valueCode, setValueCode] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [errors, setErrors] = useState<string[] | null>(null)
  const [openCode, setOpenCode] = useState<boolean>(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState<boolean>(false)
  const dev = process.env.NEXT_PUBLIC_ENV !== 'production'
  const [Login] = useMutation(login, {
    onCompleted: data => {
      setCookie(authConfig.tokenKeyName, data.login.jwt)
      setMe({ info: { ...data.login.user } })
      console.log(data.login.jwt)

      router.push('/masterCabinet')
    },
    onError: error => {
      setErrors([error.message])
      setErrorPopupOpen(true)
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
    Login({ variables: { email, password } })
  }

  return (
    <MainLayout>
      <MainContainer>
        <Wrapper>
          <Content>
            <FormWrapper>
              <Title>Войти или зарегистрироваться</Title>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  handleSubmit({ email: valueEmail, password: valuePassword })
                }}
              >
                <Label style={{ marginTop: '20rem' }}>Ведите email</Label>
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
                <Label>Ведите пароль</Label>
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
                  <Label>show password</Label>
                </CheckboxWrapper>
                <Button
                  variant="red"
                  size="fullWidth"
                  font="medium"
                  style={{ marginTop: 16 }}
                  mt="67"
                  mb="105"
                  disabled={valueEmail === '' || valuePassword === ''}
                  type="submit"
                >
                  Подтвердить
                </Button>
              </Form>
            </FormWrapper>
          </Content>
          <Error
            errors={errors}
            isOpen={isErrorPopupOpen}
            setOpen={setErrorPopupOpen}
          />
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
