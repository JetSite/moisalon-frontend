import { useState, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Wrapper, Title } from "./styled";
import { MobileVisible, MobileHidden } from "../../../../../../styles/common";
import AutoFocusedForm from "../../../../../blocks/Form/AutoFocusedForm";
import { updateBrandPersonalInformationMutation } from "../../../../../../_graphql-legacy/brand/updateBrandPersonalInformationMutation";
import { updateBrandNameMutation } from "../../../../../../_graphql-legacy/brand/updateBrandName";
import Error from "../../../../../blocks/Form/Error";
import Button from "../../../../../ui/Button";
import { createBrandMutation } from "../../../../../../_graphql-legacy/brand/createBrandMutation";
import About from "./components/About";
import Socials from "./components/Socials";
import { useRouter } from "next/router";

const RegistrationForm = ({
  allTabs,
  ref1,
  ref2,
  handleClickNextTab,
  photoBrandId,
  brand,
  setNoPhotoError,
}) => {
  const [errors, setErrors] = useState(null);
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
  const [clickAddress, setClickAddress] = useState(true);
  const router = useRouter();

  const [createBrand, { loading }] = useMutation(createBrandMutation, {
    onError: (error) => {
      const errorMessages = error.graphQLErrors.map((e) => e.message);
      setErrors(errorMessages);
      setErrorPopupOpen(true);
    },
    onCompleted: (data) => {
      router.push(
        {
          pathname: "/brandCabinet",
          query: { id: data.createBrand.id },
        },
        "/brandCabinet"
      );
    },
  });

  const [updateBrand] = useMutation(updateBrandPersonalInformationMutation, {
    onError: (error) => {
      const errorMessages = error.graphQLErrors.map((e) => e.message);
      setErrors(errorMessages);
      setErrorPopupOpen(true);
    },
    onCompleted: () => {
      router.push(
        {
          pathname: "/brandCabinet",
          query: { id: brand.id },
        },
        "/brandCabinet"
      );
    },
  });
  const [updateName] = useMutation(updateBrandNameMutation, {
    onError: (error) => {
      const errorMessages = error.graphQLErrors.map((e) => e.message);
      setErrors(errorMessages);
      setErrorPopupOpen(true);
    },
  });

  const onSubmit = useCallback(
    (values) => {
      if (!clickAddress || !values.address) {
        setErrors(["Выберите адрес места работы из выпадающего списка"]);
        setErrorPopupOpen(true);
        return;
      }
      if (!brand && !photoBrandId) {
        setNoPhotoError(true);
        setErrors(["Необходимо добавить фото бренда"]);
        setErrorPopupOpen(true);
        return;
      }
      const phone = {
        phoneNumber: values?.phone?.phoneNumber,
        haveTelegram: values?.phone?.haveTelegram || false,
        haveViber: values?.phone?.haveViber || false,
        haveWhatsApp: values?.phone?.haveWhatsApp || false,
      };

      if (!brand) {
        createBrand({
          variables: {
            input: {
              ...values,
              phone,
              logoId: photoBrandId,
              photoId: photoBrandId,
            },
          },
        });
      }

      if (brand) {
        updateName({
          variables: {
            input: {
              id: brand.id,
              name: values.name,
            },
          },
        });
        updateBrand({
          variables: {
            input: {
              ...values,
              phone,
              logoId: photoBrandId,
              photoId: photoBrandId,
            },
          },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clickAddress, photoBrandId]
  );

  return (
    <Wrapper>
      <Title>Информация о бренде</Title>
      <AutoFocusedForm
        onSubmit={onSubmit}
        initialValues={brand}
        keepDirtyOnReinitialize
        initialValuesEqual={() => true}
        render={({ handleSubmit, form, pristine }) => {
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              <About
                ref1={ref1}
                setClickAddress={setClickAddress}
                form={form}
                handleClickNextTab={handleClickNextTab}
                number={1}
              />
              <Socials ref2={ref2} />
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              <MobileHidden>
                <Button
                  variant="red"
                  size="noWidth"
                  type="submit"
                  disabled={pristine || loading}
                >
                  {loading ? "Подождите" : "Сохранить и перейти в кабинет"}
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  variant="red"
                  size="fullWidth"
                  font="popUp"
                  type="submit"
                  disabled={pristine || loading}
                >
                  {loading ? "Подождите" : "Сохранить и перейти в кабинет"}
                </Button>
              </MobileVisible>
            </form>
          );
        }}
      />
    </Wrapper>
  );
};

export default RegistrationForm;
