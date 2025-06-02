import React, { useState } from 'react'
import {
  Wrapper,
  Container,
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
import ErrorPopup from '../../../../blocks/Form/Error'
import scrollIntoView from 'scroll-into-view'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
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

  const [Login] = useMutation(login, {
    onCompleted: data => {
      setCookie(
        authConfig.tokenKeyName,
        data.login.jwt,
        authConfig.cookieOptions,
      )
      setMe({ info: { ...data.login.user } })

      router.push('/masterCabinet')
    },
    onError: error => {
      setErrors([error.message])
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
          <Container>
            <Content>
              <FormWrapper>
                <Title>Полная загруженность рабочих мест в салоне</Title>
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
                  <CheckboxWrapper
                    onClick={() => setShowPassword(!showPassword)}
                  >
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
            <ErrorPopup errors={errors} setErrors={setErrors} />
          </Container>
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
            <MobileHidden>
              <ButtonWrap>
                <Button
                  style={{ padding: 0 }}
                  onClick={() =>
                    router.push(me?.info ? '/createLessorSalon' : '/login')
                  }
                  size="medium"
                  variant="red"
                  font="medium"
                >
                  Присоединиться
                </Button>
              </ButtonWrap>
            </MobileHidden>
            <MobileVisible>
              <ButtonWrap>
                <Button
                  style={{ padding: 0 }}
                  onClick={() => {
                    const element = document.getElementById(
                      me?.info ? '/createLessorSalon' : '/login',
                    )
                    if (element) {
                      scrollIntoView(element, {
                        time: 500,
                        align: {
                          top: 0,
                          topOffset: 100,
                        },
                      })
                    }
                  }}
                  size="fullWidth"
                  variant="red"
                  font="medium"
                >
                  Присоединиться
                </Button>
              </ButtonWrap>
            </MobileVisible>
          </Left>
          <Right>
            <ImageWrap>
              <Image alt="master login" src="/master-landing-login.jpg" />
            </ImageWrap>
          </Right>
        </BottomContent>
      </BottomWrapper>
    </>
  )
}

export default Login
