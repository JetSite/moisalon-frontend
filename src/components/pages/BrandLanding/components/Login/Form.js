import { useState } from 'react'
import { useRouter } from 'next/router'
import Button from '../../../../ui/Button'
import ErrorPopup from '../../../../blocks/Form/Error'

import { FormWrapper, ButtonWrapper, ButtonMobileWrapper } from './styles'

const Form = () => {
  const [errors] = useState(null)
  const router = useRouter()

  const handleClick = async e => {
    e.preventDefault()
    // if (name.length < 2) {
    //   setErrors(["Введите корректное имя"]);
    //   setErrorPopupOpen(true);
    // }
    // if (!contact.length) {
    //   setErrors(["Введите корректный емейл или номер телефона"]);
    //   setErrorPopupOpen(true);
    // }

    // const request = {
    //   name,
    //   contact,
    //   brand,
    //   comment,
    // };
    // setOpenPopup(false);
    // setOpenSuccess(true);
    // setName("");
    // setContact("");
    // setBrand("");
    // setComment("");
    router.push('/login')
  }
  return (
    <>
      <FormWrapper>
        {/* <FormStyled onSubmit={handleClick}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Имя*"
            bg={bg}
          />
          <Input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            type="text"
            name="info"
            placeholder="Телефон или E-mail*"
            bg={bg}
          />
          <Input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            type="text"
            name="brand"
            placeholder="Бренд*"
            bg={bg}
          />
          <LabelComment>Комментарий</LabelComment>
          <Comment
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            rows="7"
            cols="33"
            bg={bg}
            maxLength="190"
          >
            test
          </Comment>
          <CheckboxWrapper onClick={checkboxHandler}>
            <Checkbox type="checkbox" name="agreement" checked={checked} />
            <Label>Я принимаю условия использования</Label>
          </CheckboxWrapper>{" "}
        </FormStyled> */}
      </FormWrapper>
      <ButtonWrapper>
        <Button
          variant="red"
          size="fullWidth"
          font="medium"
          mt="67"
          mb="105"
          // disabled={
          //   !checked || !name.length || !contact.length || !brand.length
          // }
          onClick={handleClick}
        >
          Отправить заявку
        </Button>
      </ButtonWrapper>
      <ButtonMobileWrapper>
        <Button
          variant="red"
          size="fullWidth"
          font="popUp"
          mb="59"
          // disabled={
          //   !checked || !name.length || !contact.length || !brand.length
          // }
          onClick={handleClick}
        >
          Отправить заявку
        </Button>
      </ButtonMobileWrapper>
      <ErrorPopup errors={errors} setErrors={setErrors} />
    </>
  )
}

export default Form
