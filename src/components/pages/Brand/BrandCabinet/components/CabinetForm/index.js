import { useState } from "react";
import { Wrapper, TitleCabinet, TextCabinet } from "./styled";
import AutoFocusedForm from "../../../../../blocks/Form/AutoFocusedForm";
import Error from "../../../../../blocks/Form/Error";
import Files from "../Files";

const CabinetForm = ({
  allTabs,
  ref1,
  ref2,
  ref3,
  ref4,
  brand,
  brandId,
  handleClickNextTab,
}) => {
  const [errors, setErrors] = useState(null);
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);

  const onSubmit = () => {};

  return (
    <Wrapper>
      <TitleCabinet>{brand?.name}</TitleCabinet>
      <TextCabinet>Кабинет бренда</TextCabinet>
      <Files id={brandId} />
      <AutoFocusedForm
        // initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine }) => {
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              {/* <BrandCabinetProducts
                ref1={ref1}
                handleClickNextTab={handleClickNextTab}
              /> */}
              {/* <BrandCabinetReviews brandId={brandId} ref2={ref2} /> */}
              {/* <BrandCabinetPerson ref3={ref3} /> */}
              {/* <BrandCabinetProfiles ref4={ref4} /> */}
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              {/* <Button
                variant="red"
                size="noWidth"
                type="submit"
                disabled={pristine || loading}
              >
                {loading ? "Подождите" : "Сохранить и продолжить"}
              </Button> */}
            </form>
          );
        }}
      />
    </Wrapper>
  );
};

export default CabinetForm;
