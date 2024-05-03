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
import { getStoreData } from 'src/store/utils'

const Login = () => {
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState('')
  const [valueCode, setValueCode] = useState('')
  const [errors, setErrors] = useState(null)
  const [openCode, setOpenCode] = useState(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const dev = process.env.NEXT_PUBLIC_ENV !== 'production'
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const isLoggedIn = me?.info !== undefined && me?.info !== null

  const checkboxHandler = () => {
    setChecked(!checked)
  }

  const handleClick = async e => {
    e.preventDefault()
    if (checked && value) {
      const resData = await fetch(
        dev
          ? `https://stage-passport.moi.salon/api/sendcode?login=${value}`
          : `https://passport.moi.salon/api/sendcode?login=${value}`,
      )

      if (resData.status !== 200) {
        setErrors(['Введите корректный емейл или номер телефона'])
        setErrorPopupOpen(true)
      } else {
        setOpenCode(true)
      }
    }
  }

  const handleClickCode = async e => {
    e.preventDefault()
    if (valueCode) {
      const resData = await fetch(
        dev
          ? `https://stage-passport.moi.salon/api/authorization?login=${value}&code=${valueCode}`
          : `https://passport.moi.salon/api/authorization?login=${value}&code=${valueCode}`,
        { credentials: 'include', 'Access-Control-Allow-Credentials': true },
      )

      if (resData.status !== 200) {
        setErrors(['Неверный код'])
        setErrorPopupOpen(true)
      } else {
        router.push('/masterCabinet')
      }
    }
  }

  return (
    <>
      <Wrapper id="login">
        <Content>
          <FormWrapper>
            <Title>
              Объединяем лучших мастеров и помогаем вести свое дело с
              удовольствием
            </Title>
            <Form onSubmit={handleClick}>
              {!openCode ? (
                <>
                  {' '}
                  <Input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    type="text"
                    name="info"
                    placeholder="Телефон или E-mail"
                  />
                  <CheckboxWrapper onClick={checkboxHandler}>
                    <Checkbox
                      type="checkbox"
                      name="agreement"
                      checked={checked}
                    />
                    <Label>Я принимаю условия использования</Label>
                  </CheckboxWrapper>{' '}
                </>
              ) : (
                <Input
                  value={valueCode}
                  onChange={e => setValueCode(e.target.value)}
                  type="text"
                  name="code"
                  autoComplete="one-time-code"
                  placeholder="Введите код"
                  inputMode="numeric"
                  inputType="numeric"
                  pattern="[0-9]*"
                />
              )}
            </Form>
          </FormWrapper>
          <ButtonWrapper>
            {!openCode ? (
              <Button
                variant="red"
                size="fullWidth"
                font="medium"
                mt="67"
                mb="105"
                disabled={!checked || !value.length}
                onClick={handleClick}
              >
                Присоединиться
              </Button>
            ) : (
              <Button
                variant="red"
                size="fullWidth"
                font="medium"
                style={{ marginTop: 16 }}
                mt="67"
                mb="105"
                onClick={handleClickCode}
              >
                Подтвердить
              </Button>
            )}
          </ButtonWrapper>
        </Content>
        <ButtonMobileWrapper>
          {!openCode ? (
            <Button
              variant="red"
              size="fullWidth"
              mb="59"
              font="medium"
              disabled={!checked || !value.length}
              onClick={handleClick}
            >
              Присоединиться
            </Button>
          ) : (
            <Button
              variant="red"
              size="fullWidth"
              mb="59"
              font="medium"
              onClick={handleClickCode}
            >
              Подтвердить
            </Button>
          )}
        </ButtonMobileWrapper>
        <Error
          errors={errors}
          isOpen={isErrorPopupOpen}
          setOpen={setErrorPopupOpen}
        />
      </Wrapper>
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
                  router.push(isLoggedIn ? '/masterCabinet' : '/login')
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
              <Image src="/master-landing-login.jpg" />
            </ImageWrap>
          </Right>
        </BottomContent>
      </BottomWrapper>
    </>
  )
}

export default Login
