import { useState, useMemo } from "react";
import { CatalogGroup } from "./CatalogGroup";
import { MainContainer } from "../../../../../../styles/common";
import {
  Wrapper,
  Top,
  Title,
  Count,
  Content,
  NoServicesText,
  TitleWrap,
} from "./styles";
import { useMutation } from "@apollo/client";
import catalogOrDefault from "../../../../../../utils/catalogOrDefault";
import EditIcons from "../../../../../ui/EditIcons";
import { updateSalonServicesMutation } from "../../../../../../_graphql-legacy/salon/updateSalonServicesMutation";
import EditSalonServices from "../../../EditSalonServices";
import { convertServiceIdsToCatalogEntries } from "../../../../../../utils/serviceCatalog";

const MobileServicesComponent = ({
  services,
  isOwner,
  salon,
  refetchSalon,
  catalogs,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const entries = useMemo(
    () => convertServiceIdsToCatalogEntries(services),
    [services]
  );
  const [entriesItems, setEntriesItems] = useState(entries);

  const salonWorkplacesServicesCatalog = catalogOrDefault(
    catalogs?.salonWorkplacesServicesCatalog
  );

  const [updateServices] = useMutation(updateSalonServicesMutation, {
    onCompleted: () => {
      refetchSalon();
    },
  });

  const handleEditConfirm = () => {
    var services = entriesItems?.filter((s) => s.value !== 0)?.map((s) => s.id);
    updateServices({
      variables: {
        salonId: salon?.id,
        input: {
          services,
        },
      },
    });
  };

  const groups = salonWorkplacesServicesCatalog?.groups
    ?.map((group) => {
      if (group?.items === undefined) {
        return null;
      }

      const items = group?.items.filter((item) =>
        services?.find((entry) => entry.id === item.id)
      );

      if (items.length === 0) {
        return null;
      }

      return <CatalogGroup key={group.id} group={group} services={services} />;
    })
    .filter((element) => element !== null);

  // if (groups.length === 0) {
  //   return null;
  // }

  return (
    <MainContainer id="services">
      <Wrapper>
        <Top>
          <TitleWrap>
            <Title>Для мастеров</Title>
            {isOwner && (
              <EditIcons
                handleEditConfirm={handleEditConfirm}
                setIsEditing={setIsEditing}
              />
            )}
          </TitleWrap>
          <Count>{groups.length ? services.length : 0}</Count>
        </Top>
        {!isEditing ? (
          groups?.length ? (
            <Content>{groups}</Content>
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
            mobile
          />
        )}
      </Wrapper>
    </MainContainer>
  );
};

export default MobileServicesComponent;
