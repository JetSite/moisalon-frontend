import { useState, useMemo, useContext } from "react";
import { useRouter } from "next/router";
import { Wrapper, Title } from "./styled";
import { MobileVisible, MobileHidden } from "../../../../../../styles/common";
import AutoFocusedForm from "../../../../../blocks/Form/AutoFocusedForm";
import Error from "../../../../../blocks/Form/Error";
import Button from "../../../../../ui/Button";
import About from "./components/About";
import Socials from "./components/Socials";
import SalonActivities from "./components/SalonActivities";
import SalonServices from "./components/SalonServices";
import Schedule from "./components/Schedule";
import Administrator from "./components/Administrator";
import catalogOrDefault from "../../../../../../utils/catalogOrDefault";
import { useMutation } from "@apollo/react-hooks";
import { createSalonMutation } from "../../../../../../_graphql-legacy/salon/createSalonMutation";
import { updateSalonMutation } from "../../../../../../_graphql-legacy/salon/updateSalonMutation";
import { updateSalonIdentityMutation } from "../../../../../../_graphql-legacy/salon/updateSalonIdentityMutation";
import { updateSalonLogoMutation } from "../../../../../../_graphql-legacy/salon/updateSalonLogoMutation";
import { CatalogsContext } from "../../../../../../searchContext";
import { useQuery } from "@apollo/client";
import { currentUserSalonsAndMasterQuery } from "../../../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery";

const RegistrationForm = ({
  allTabs,
  ref1,
  ref2,
  ref3,
  ref4,
  ref5,
  ref6,
  handleClickNextTab,
  photoSalonId,
  salon,
  setNoPhotoError,
  setMe,
  lessor,
}) => {
  const router = useRouter();
  const [clickAddress, setClickAddress] = useState(true);
  const [errors, setErrors] = useState(null);
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
  const catalogs = useContext(CatalogsContext);

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

  const salonServicesCatalog = catalogOrDefault(catalogs?.salonServicesCatalog);
  const salonActivitiesCatalog = catalogOrDefault(
    catalogs?.salonActivitiesCatalog
  );

  const salonWithInitialArrays = useMemo(() => {
    return {
      phones: [
        {
          haveTelegram: false,
          haveViber: false,
          haveWhatsApp: false,
          phoneNumber: "",
        },
      ],
      workingHours: [
        {
          startDayOfWeek: "MONDAY",
          startHour: 0,
          startMinute: 0,
          endDayOfWeek: "FRIDAY",
          endHour: 23,
          endMinute: 59,
        },
      ],
      contactPersonWorkingHours: [
        {
          startDayOfWeek: "MONDAY",
          startHour: 0,
          startMinute: 0,
          endDayOfWeek: "FRIDAY",
          endHour: 23,
          endMinute: 59,
        },
      ],
      ...salon,
      address: salon?.address?.full,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [mutate, { loading }] = useMutation(updateSalonMutation, {
    onError: (error) => {
      const errorMessages = error.graphQLErrors.map((e) => e.message);
      setErrors(errorMessages);
      setErrorPopupOpen(true);
    },
    onCompleted: async () => {
      await refetch();
      router.push(
        {
          pathname: lessor ? "/rentSalonSeat" : "/masterCabinet",
          query: { id: salon.id },
        },
        lessor ? "/rentSalonSeat" : "/masterCabinet"
      );
    },
  });

  const [mutateNameAndAddress] = useMutation(updateSalonIdentityMutation, {
    onError: (error) => {
      const errorMessages = error.graphQLErrors.map((e) => e.message);
      setErrors(errorMessages);
      setErrorPopupOpen(true);
    },
  });

  const [mutateLogo] = useMutation(updateSalonLogoMutation, {
    onError: (error) => {
      const errorMessages = error.graphQLErrors.map((e) => e.message);
      setErrors(errorMessages);
      setErrorPopupOpen(true);
    },
  });

  const [createSalon, { loadingCreate }] = useMutation(createSalonMutation, {
    onCompleted: async ({ createSalon }) => {
      await refetch();
      router.push(
        {
          pathname: lessor ? "/rentSalonSeat" : "/masterCabinet",
          query: { id: createSalon.id },
        },
        lessor ? "/rentSalonSeat" : "/masterCabinet"
      );
    },

    onError: (error) => {
      const errorMessages = error.graphQLErrors.map((e) => e.message);
      setErrors(errorMessages);
      setErrorPopupOpen(true);
    },
  });

  const onSubmit = (values) => {
    if (!clickAddress || !values.address) {
      setErrors(["Выберите адрес салона из выпадающего списка"]);
      setErrorPopupOpen(true);
      return;
    }
    if (!salon && !photoSalonId) {
      setNoPhotoError(true);
      setErrors(["Необходимо добавить логотип салона"]);
      setErrorPopupOpen(true);
      return;
    }
    if (!salon && !values.photos) {
      setErrors(["Необходимо добавить фото салона"]);
      setErrorPopupOpen(true);
      return;
    }

    if (!salon) {
      const { photos = [], contactPersonPhone = {} } = values;
      const personPhone = {
        haveTelegram: false,
        haveViber: false,
        haveWhatsApp: false,
        phoneNumber: "",
      };

      createSalon({
        variables: {
          input: {
            ...values,
            contactPersonPhone: { ...personPhone, ...contactPersonPhone },
            isNotRent: false,
            photoIds: photos.map((photo) => photo.id),
            logoId: photoSalonId,
            lessor: lessor ? true : false,
          },
        },
      });
    }

    if (salon) {
      const { photos = [], contactPersonPhone = {} } = values;
      const personPhone = {
        haveTelegram: false,
        haveViber: false,
        haveWhatsApp: false,
        phoneNumber: "",
      };

      if (
        salon?.name !== values.name ||
        salon?.address?.full !== values.address
      ) {
        mutateNameAndAddress({
          variables: {
            input: {
              name: values.name,
              address: values.address,
              salonId: salon.id,
            },
          },
        });
      }

      if (photoSalonId) {
        mutateLogo({
          variables: { input: { salonId: salon.id, logoId: photoSalonId } },
        });
      }

      mutate({
        variables: {
          input: {
            ...values,
            isNotRent: false,
            contactPersonPhone: { ...personPhone, ...contactPersonPhone },
            salonId: salon.id,
            photoIds: photos.map((t) => t.id),
            lessor: salon?.lessor ? true : false,
          },
        },
      });
    }
  };

  return (
    <Wrapper>
      <Title>Расскажите о своем салоне</Title>
      <AutoFocusedForm
        initialValues={salonWithInitialArrays}
        keepDirtyOnReinitialize
        initialValuesEqual={() => true}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, pristine }) => {
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              <About
                ref1={ref1}
                setClickAddress={setClickAddress}
                form={form}
                number={1}
                handleClickNextTab={handleClickNextTab}
              />
              <SalonActivities
                ref2={ref2}
                number={2}
                serviceCatalog={salonActivitiesCatalog}
                handleClickNextTab={handleClickNextTab}
              />
              <SalonServices
                ref3={ref3}
                number={3}
                serviceCatalog={salonServicesCatalog}
                handleClickNextTab={handleClickNextTab}
              />
              <Schedule
                ref4={ref4}
                number={4}
                handleClickNextTab={handleClickNextTab}
              />
              <Administrator
                ref5={ref5}
                number={5}
                handleClickNextTab={handleClickNextTab}
              />
              <Socials ref6={ref6} />
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
                  disabled={pristine || loadingCreate || loading}
                >
                  {loadingCreate || loading
                    ? "Подождите"
                    : "Сохранить и продолжить"}
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  variant="red"
                  size="fullWidth"
                  font="popUp"
                  type="submit"
                  disabled={pristine || loadingCreate || loading}
                >
                  {loadingCreate || loading
                    ? "Подождите"
                    : "Сохранить и продолжить"}
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
