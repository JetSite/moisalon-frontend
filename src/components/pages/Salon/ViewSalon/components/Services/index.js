import { useCallback, useState, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { CatalogGroup } from "../CatalogGroup";
import { MainContainer } from "../../../../../../styles/common";
import {
  Wrapper,
  Top,
  Title,
  Count,
  Content,
  PhoneButton,
  LeftColumn,
  RightColumn,
  NoServicesText,
} from "./styled";
import { createRequestToSalon } from "../../../../../../_graphql-legacy/salon/createRequestToSalon";
import EditIcons from "../../../../../ui/EditIcons";
import { convertServiceIdsToCatalogEntries } from "../../../../../../utils/serviceCatalog";
import { updateSalonServicesMutation } from "../../../../../../_graphql-legacy/salon/updateSalonServicesMutation";
import EditSalonServices from "../../../EditSalonServices";

const Services = ({
  services,
  isOwner,
  edit,
  setEdit,
  salon,
  count,
  refetchSalon,
  salonWorkplacesServicesCatalog,
}) => {
  const [openWritePopup, setOpenWritePopup] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const entries = useMemo(
    () => convertServiceIdsToCatalogEntries(services),
    [services]
  );

  const [entriesItems, setEntriesItems] = useState(entries);

  const [updateServices] = useMutation(updateSalonServicesMutation, {
    onCompleted: () => {
      refetchSalon();
    },
  });

  const handleEditConfirm = () => {
    var services = entriesItems
      ?.filter((s) => s?.value !== 0)
      ?.map((s) => s?.id);
    updateServices({
      variables: {
        salonId: salon?.id,
        input: {
          services,
        },
      },
    });
  };

  const handleCloseWritePopup = useCallback(() => {
    setOpenWritePopup(false);
  }, [setOpenWritePopup]);

  const closeSuccessPopup = useCallback(() => {
    setOpenSuccessPopup(false);
  }, [setOpenSuccessPopup]);

  const [createRequestPopup] = useMutation(createRequestToSalon, {
    onCompleted: () => {
      setOpenWritePopup(false);
      setOpenSuccessPopup(true);
    },
  });

  // const onSubmit = (values) => {
  //   createRequestPopup({
  //     variables: {
  //       input: {
  //         salonId: salon?.id,
  //         ...values,
  //       },
  //     },
  //   });
  // };

  const groups = salonWorkplacesServicesCatalog?.groups
    ?.map((group) => {
      if (group.items === undefined) {
        return null;
      }

      const items = group?.items?.filter((item) =>
        salon?.workplacesServices?.find((entry) => entry.id === item.id)
      );

      if (items.length === 0) {
        return null;
      }

      return <CatalogGroup key={group?.id} group={group} services={services} />;
    })
    .filter((element) => element !== null);

  // if (groups.length === 0) {
  //   return null;
  // }

  const secondColumnStart = Math.round(groups.length / 2);

  const phone = salon?.phones && salon?.phones[0]?.phoneNumber;

  return (
    <MainContainer id="services">
      <Wrapper>
        <Top>
          <Title>
            Для мастеров
            {isOwner && (
              <EditIcons
                setEdit={setEdit}
                edit={edit}
                handleEditConfirm={handleEditConfirm}
                setIsEditing={setIsEditing}
              />
            )}
          </Title>
          <Count>{count || 0}</Count>
        </Top>
        {!isEditing ? (
          groups?.length ? (
            <Content>
              <LeftColumn>{groups.slice(0, secondColumnStart)}</LeftColumn>
              <RightColumn>{groups.slice(secondColumnStart)}</RightColumn>
            </Content>
          ) : (
            <NoServicesText>
              Нет добавленных услуг. Нажмите на карандаш, чтобы добавить услуги
            </NoServicesText>
          )
        ) : (
          <EditSalonServices
            setEntriesItems={setEntriesItems}
            entriesItems={entriesItems}
            salon={salon}
            entries={entries}
            salonWorkplacesServicesCatalog={salonWorkplacesServicesCatalog}
          />
        )}
        <noindex>
          {salon?.onlineBookingUrl ? (
            <PhoneButton
              href={salon?.onlineBookingUrl}
              rel="nofollow"
              target="_blank"
            >
              Онлайн запись
            </PhoneButton>
          ) : (
            <PhoneButton href={`tel:${phone}`}>Онлайн запись</PhoneButton>
          )}
        </noindex>
        {/* <WritePopup
            user={user}
            open={openWritePopup}
            handleClose={handleCloseWritePopup}
            onSubmit={onSubmit}
          />
          <Popup
            isOpen={openSuccessPopup}
            onClose={closeSuccessPopup}
            title="Ваше сообщение отправлено"
            description={`Администратор салона свяжется с вами в ближайшее время!`}
          >
            <Button onClick={closeSuccessPopup} className="btn--outline">
              Закрыть
            </Button>
          </Popup> */}
      </Wrapper>
    </MainContainer>
  );
};

export default Services;
