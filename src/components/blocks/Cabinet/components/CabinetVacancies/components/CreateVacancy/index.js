import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import AutoFocusedForm from "../../../../../Form/AutoFocusedForm";
import { FieldStyled } from "../../../CabinetForm/styled";
import { TextField } from "../../../../../Form";
import { required } from "../../../../../../../utils/validations";
import Error from "../../../../../Form/Error";
import { laptopBreakpoint } from "../../../../../../../../styles/variables";
import Button from "../../../../../../ui/Button";
import Vacancy from "../../../../../Vacancy";
import { createVacancyMutation } from "../../../../../../../_graphql-legacy/vacancies/createVacancyMutation";
import Popup from "../../../../../../ui/Popup";

const FieldWrap = styled.div`
  margin-bottom: 14px;
`;

const ButtonWrap = styled.div`
  width: 350px;
  margin-top: 66px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-top: 40px;
  }
`;

const CreateVacancy = ({ setCreateVacancy, type, activeProfile, refetch }) => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoId, setPhotoId] = useState(null);
  const [published, setPublished] = useState(false);
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const [createVacancy] = useMutation(createVacancyMutation, {
    onError: (error) => {
      const errorMessages = error.graphQLErrors.map((e) => e.message);
      setLoading(false);
      setErrors(errorMessages);
      setErrorPopupOpen(true);
    },
    onCompleted: async (data) => {
      setLoading(false);
      await refetch({
        variables: {
          originId: activeProfile.id,
        },
      });
      setOpenPopup(true);
    },
  });

  const onSubmit = useCallback(
    async (values) => {
      if (!photoId) {
        setErrors(["Необходимо добавить фото"]);
        setErrorPopupOpen(true);
        return;
      }
      setLoading(true);
      createVacancy({
        variables: {
          input: {
            title: values.title,
            origin: type.toUpperCase(),
            originId: activeProfile?.id,
            photoId,
            desc: values.desc,
            short_desc: values.short_desc,
            amountFrom: 0,
            amountTo: 0,
            isPublished: false,
          },
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photoId, published]
  );

  const onAdd = (photoId) => {
    setPhotoId(photoId);
  };

  const closePopup = () => {
    setOpenPopup(false);
    setCreateVacancy(false);
  };

  return (
    <>
      <AutoFocusedForm
        onSubmit={onSubmit}
        subscription={{ values: true }}
        render={({ handleSubmit, pristine, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <Vacancy
                  photoId={photoId}
                  onAdd={onAdd}
                  amountFrom={values.amountFrom}
                  amountTo={values.amountTo}
                  type={type}
                  create
                  title={values.title}
                  name={`${
                    type === "master"
                      ? "Мастер"
                      : type === "salon"
                      ? "Салон"
                      : type === "brand"
                      ? "Бренд"
                      : ""
                  } ${activeProfile?.name}`}
                />
              </div>
              <FieldWrap>
                <FieldStyled
                  name="title"
                  component={TextField}
                  label="Название вакансии"
                  validate={required}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="short_desc"
                  component={TextField}
                  label="Краткое описание вакансии"
                  validate={required}
                  multiline={true}
                  maxLength={1200}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="desc"
                  component={TextField}
                  label="Описание вакансии"
                  validate={required}
                  multiline={true}
                  maxLength={40000}
                  requiredField
                />
              </FieldWrap>
              {/* <FieldWrap>
                <FieldStyled
                  name="amountFrom"
                  component={TextField}
                  type="number"
                  label="Зарплата от"
                  requiredField
                  validate={required}
                  maxLength={15}
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="amountTo"
                  component={TextField}
                  type="number"
                  label="Зарплата до"
                  requiredField
                  validate={required}
                  maxLength={15}
                />
              </FieldWrap> */}
              {/* <FieldWrap>
                <Checkbox
                  name="isPublished"
                  label="Опубликовать вакансию"
                  checked={published}
                  setChecked={setPublished}
                />
              </FieldWrap> */}
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              <ButtonWrap>
                <Button
                  variant="red"
                  size="width100"
                  type="submit"
                  disabled={pristine || loading}
                >
                  {loading ? "Подождите" : "Сохранить"}
                </Button>
                <Button
                  variant="darkTransparent"
                  size="width100"
                  type="submit"
                  style={{ marginTop: 20 }}
                  onClick={() => setCreateVacancy(false)}
                >
                  Отменить
                </Button>
              </ButtonWrap>
            </form>
          );
        }}
      />
      <Popup
        isOpen={openPopup}
        onClose={closePopup}
        title="Ваша вакансия отправлена на модерацию, в течение суток/часов вы получите уведомление."
      >
        <Button style={{ marginTop: 20 }} onClick={closePopup} variant="red">
          Закрыть
        </Button>
      </Popup>
    </>
  );
};

export default CreateVacancy;
