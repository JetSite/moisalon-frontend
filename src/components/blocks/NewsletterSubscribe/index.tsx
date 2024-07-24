import { useState } from 'react'
import { useRouter } from 'next/router'
import { Wrapper, Text, InputWrap, Input, Label } from './styles'
import Button from '../../ui/Button'
import goalIdObjects from '../../../lib/goalIdObjects'

const NewsletterSubscribe = () => {
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()
  const { newsletter } = goalIdObjects(router.pathname)

  const changeHandler = (e: any) => {
    setInputValue(e.target.value)
  }

  const submitHandler = () => {
    window.dataLayer.push({
      event: 'event',
      eventProps: {
        category: 'click',
        action: newsletter,
      },
    })
  }

  const clearText = () => {
    setInputValue('')
  }

  return (
    <Wrapper>
      <Text>
        Подпишитесь <br /> на нашу рассылку
      </Text>
      <InputWrap>
        <Input
          id="email"
          value={inputValue}
          onChange={changeHandler}
          onBlur={clearText}
        />
        <Label htmlFor="email">E-mail</Label>
      </InputWrap>
      <Button
        disabled
        size="fullWidth"
        variant="darkBorder"
        onClick={submitHandler}
      >
        Подписаться
      </Button>
    </Wrapper>
  )
}

export default NewsletterSubscribe
