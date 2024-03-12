import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import MainLayout from "../../../layouts/MainLayout";
import { MainContainer } from "../../../styles/common";
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
} from "./styles";
import Button from "../../ui/Button";
import Error from "../../blocks/Form/Error";
import { currentUserSalonsAndMasterQuery } from "../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery";

const LoginPage = ({ setMe }) => {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [valueCode, setValueCode] = useState("");
  const [errors, setErrors] = useState(null);
  const [openCode, setOpenCode] = useState(false);
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
  const dev = process.env.NEXT_PUBLIC_ENV !== "production";
  const router = useRouter();
  const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
    skip: true,
    onCompleted: (res) => {
      setMe({
        info: res?.me?.info,
        master: res?.me?.master,
        locationByIp: res?.locationByIp,
        salons: res?.me?.salons,
        rentalRequests: res?.me?.rentalRequests,
      });
    },
  });

  const checkboxHandler = () => {
    setChecked(!checked);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (checked && value) {
      const resData = await fetch(
        dev
          ? `https://stage-passport.moi.salon/api/sendcode?login=${value}`
          : `https://passport.moi.salon/api/sendcode?login=${value}`
      );

      if (resData.status !== 200) {
        setErrors(["Введите корректный емейл или номер телефона"]);
        setErrorPopupOpen(true);
      } else {
        setOpenCode(true);
      }
    }
  };

  const handleClickCode = async (e) => {
    e.preventDefault();
    if (valueCode) {
      const resData = await fetch(
        dev
          ? `https://stage-passport.moi.salon/api/authorization?login=${value}&code=${valueCode}`
          : `https://passport.moi.salon/api/authorization?login=${value}&code=${valueCode}`,
        { credentials: "include", "Access-Control-Allow-Credentials": true }
      );

      if (resData.status !== 200) {
        setErrors(["Неверный код"]);
        setErrorPopupOpen(true);
      } else {
        await refetch();
        router.push("/masterCabinet");
      }
    }
  };

  return (
    <MainLayout>
      <MainContainer>
        <Wrapper>
          <Content>
            {/* {router?.query?.error === "notAuthorized" && (
              <NotAuthorized>
                Для формирования профессионального заказа у бренда войдите или
                создайте свой профиль
              </NotAuthorized>
            )} */}
            <FormWrapper>
              <Title>Войти или зарегистрироваться</Title>
              <Form onSubmit={handleClick}>
                {!openCode ? (
                  <>
                    {" "}
                    <Input
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
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
                    </CheckboxWrapper>{" "}
                  </>
                ) : (
                  <Input
                    value={valueCode}
                    onChange={(e) => setValueCode(e.target.value)}
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
                  Получить код
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
                  disabled={valueCode === ""}
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
                font="popUp"
                mb="59"
                disabled={!checked || !value.length}
                onClick={handleClick}
              >
                Получить код
              </Button>
            ) : (
              <Button
                variant="red"
                size="fullWidth"
                font="popUp"
                mb="59"
                onClick={handleClickCode}
                disabled={valueCode === ""}
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
      </MainContainer>
    </MainLayout>
  );
};

export default LoginPage;
