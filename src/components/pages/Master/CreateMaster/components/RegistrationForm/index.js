import { useState, useCallback, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import About from "./components/About";
import MasterSpecializationsList from "./components/MasterSpecializationsList";
import { Wrapper, Title } from "./styled";
import { MobileHidden, MobileVisible } from "../../../../../../styles/common";
import Button from "../../../../../ui/Button";
import AutoFocusedForm from "../../../../../blocks/Form/AutoFocusedForm";
import Error from "../../../../../blocks/Form/Error";
import { updateMasterPersonalInformationMutation } from "../../../../../../_graphql-legacy/master/updateMasterPersonalInformationMutation";
import { createMasterMutation } from "../../../../../../_graphql-legacy/master/createMasterMutation";
import Socials from "./components/Socials";
import Work from "./components/Work";
import { useRouter } from "next/router";
// import ym from "react-yandex-metrika";
import catalogOrDefault from "../../../../../../utils/catalogOrDefault";
import { CatalogsContext, MeContext } from "../../../../../../searchContext";
import { useQuery } from "@apollo/client";
import { currentUserSalonsAndMasterQuery } from "../../../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery";

const RegistrationForm = ({
  master,
  allTabs,
  ref1,
  ref2,
  ref3,
  ref4,
  handleClickNextTab,
  photoMasterId,
  setNoPhotoError,
}) => {
  const catalogs = useContext(CatalogsContext);
  const [me, setMe] = useContext(MeContext);

  const masterSpecializationsCatalog = catalogOrDefault(
    catalogs?.masterSpecializationsCatalog
  );
  const router = useRouter();
  const [clickAddress, setClickAddress] = useState(true);
  const [errors, setErrors] = useState(null);
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
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
  const [mutate, { loading }] = useMutation(
    updateMasterPersonalInformationMutation,
    {
      onError: (error) => {
        const errorMessages = error.graphQLErrors.map((e) => e.message);
        setErrors(errorMessages);
        setErrorPopupOpen(true);
      },
      onCompleted: async () => {
        // ym("reachGoal", "create_profile_success");
        // window?.dataLayer?.push({
        //   event: "event",
        //   eventProps: {
        //     category: "form",
        //     action: "create_profile_success",
        //   },
        // });
        await refetch();
        router.push("/masterCabinet");
      },
    }
  );
  const [createMaster, { loading: loadingCreate }] = useMutation(
    createMasterMutation,
    {
      onCompleted: async () => {
        // ym("reachGoal", "create_profile");
        // window?.dataLayer?.push({
        //   event: "event",
        //   eventProps: {
        //     category: "form",
        //     action: "create_profile",
        //   },
        // });
        await refetch();
        router.push("/masterCabinet");
      },
    }
  );

  const onSubmit = useCallback(
    (values) => {
      const { specializations = [] } = values;
      const { groups = [] } = masterSpecializationsCatalog;
      const validSpecializations = specializations.filter(
        (s) => groups.find((g) => g.id === s) !== undefined
      );
      if (!clickAddress || !values.address) {
        setErrors(["Выберите адрес места работы из выпадающего списка"]);
        setErrorPopupOpen(true);
        return;
      }
      if (!master && !photoMasterId) {
        setNoPhotoError(true);
        setErrors(["Необходимо добавить фото мастера"]);
        setErrorPopupOpen(true);
        return;
      }
      const input = {
        ...values,
        addressFull: null,
        specializations: validSpecializations,
      };
      if (!master) {
        const phone = {
          phoneNumber: values?.phone?.phoneNumber,
          haveTelegram: values?.phone?.haveTelegram || false,
          haveViber: values?.phone?.haveViber || false,
          haveWhatsApp: values?.phone?.haveWhatsApp || false,
        };

        createMaster({
          variables: {
            input: { ...values, phone, photoId: photoMasterId },
          },
        });
      }
      if (master) {
        mutate({ variables: { input } });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clickAddress, masterSpecializationsCatalog, photoMasterId]
  );

  return (
    <Wrapper>
      <Title>Мои данные</Title>
      <AutoFocusedForm
        initialValues={
          master
            ? master
            : me?.info
            ? {
                email: me?.info?.email,
                phone: { phoneNumber: me?.info?.phoneNumber },
                name: me?.info?.displayName,
                city: me?.info?.city,
              }
            : null
        }
        onSubmit={onSubmit}
        keepDirtyOnReinitialize
        initialValuesEqual={() => true}
        render={({ handleSubmit, pristine }) => {
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              <About
                ref1={ref1}
                setClickAddress={setClickAddress}
                handleClickNextTab={handleClickNextTab}
                number={1}
              />
              <MasterSpecializationsList
                handleClickNextTab={handleClickNextTab}
                ref2={ref2}
                serviceCatalog={masterSpecializationsCatalog}
                number={2}
              />
              <Work
                ref3={ref3}
                handleClickNextTab={handleClickNextTab}
                number={3}
              />
              <Socials ref4={ref4} />
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
                  disabled={pristine || loading || loadingCreate}
                >
                  {loading || loadingCreate
                    ? "Подождите"
                    : "Сохранить и перейти в кабинет"}
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  variant="red"
                  size="fullWidth"
                  font="popUp"
                  type="submit"
                  disabled={pristine}
                >
                  Сохранить и перейти в кабинет
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
