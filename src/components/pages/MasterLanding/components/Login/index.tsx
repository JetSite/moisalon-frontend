import React, { useState } from 'react'
import {
  Wrapper,
  FormWrapper,
  Form,
  Label,
  Input,
  CheckboxWrapper,
  Checkbox,
  TitleBottom,
  ButtonWrapper,
  ButtonMobileWrapper,
  Content,
  BottomWrapper,
  BottomContent,
  Left,
  Right,
  ImageWrap,
  Image,
  Title,
  Desc,
  Items,
  Item,
  ButtonWrap,
} from './styles'
import Button from '../../../../ui/Button'
import { useRouter } from 'next/router'
import Error from '../../../../blocks/Form/Error'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { useMutation } from '@apollo/client'
import { login } from 'src/api/graphql/me/mutations/login'
import { setCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'

const Login = () => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const { setMe } = useAuthStore(getStoreEvent)
  const [valueEmail, setValueEmail] = useState<string>('')
  const [valuePassword, setValuePassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState<boolean>(false)

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
    <>
      {!me?.info && (
        <Wrapper id="login">
          <Content>
            <FormWrapper>
              <Title>
                Объединяем лучших мастеров и помогаем вести свое дело с
                удовольствием
              </Title>
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
      )}
      <BottomWrapper>
        <BottomContent>
          <Left>
            <TitleBottom>
              Другие возможности <br /> бьюти-платформы МОЙ
            </TitleBottom>
            <Desc>
              Специализируемся на индустрии красоты, поэтому знаем, что нужно ее
              представителям.
            </Desc>
            <Items>
              <Item>
                Покупайте профессиональную косметику и расходные материалы по
                ценам напрямую от брендов.
              </Item>
              <Item>
                Создайте собственный сайт-визитку с портфолио и привлекайте
                новых клиентов.
              </Item>
              <Item>
                Найдите салон по душе, если хотите работать в команде.
              </Item>
              <Item>
                Читайте новости индустрии и интервью экспертов в бьюти-ленте.
              </Item>
            </Items>
            <ButtonWrap>
              <Button
                style={{ padding: 0 }}
                onClick={() =>
                  router.push(me?.info ? '/masterCabinet' : '/login')
                }
                size="medium"
                variant="red"
                font="medium"
              >
                Присоединиться
              </Button>
            </ButtonWrap>
          </Left>
          <Right>
            <ImageWrap>
              <Image alt="login" src="/master-landing-login.jpg" />
            </ImageWrap>
          </Right>
        </BottomContent>
      </BottomWrapper>
    </>
  )
}

export default Login
