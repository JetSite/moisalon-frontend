import { useMemo, useState } from "react";
import { useMutation } from "@apollo/client";
import { convertServiceIdsToCatalogEntries } from "../../../../../../utils/serviceCatalog";
import { CatalogGroup } from "./CatalogGroup";
import EditIcons from "../../../../../ui/EditIcons";
import { MainContainer } from "../../../../../../styles/common";
import {
  Wrapper,
  Top,
  Title,
  Count,
  Content,
  PhoneButton,
  TitleWrap,
  NoServicesText,
} from "./styles";
import EditMasterServices from "../../../../../blocks/EditMasterServices";
import { masterQuery } from "../../../../../../_graphql-legacy/master/masterQuery";
import { updateMasterServicesMutation } from "../../../../../../_graphql-legacy/master/updateMasterServicesMutation";

const MobileServicesComponent = ({
  isOwner,
  services,
  master,
  masterSpecializationsCatalog,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const entries = useMemo(
    () => convertServiceIdsToCatalogEntries(services),
    [services]
  );

  const [entriesItems, setEntriesItems] = useState(entries);

  const [updateServices] = useMutation(updateMasterServicesMutation, {
    refetchQueries: [
      {
        query: masterQuery,
        variables: {
          id: master?.id,
        },
      },
    ],
  });

  const handleEditConfirm = () => {
    var services = entriesItems?.filter((s) => s.value !== 0)?.map((s) => s.id);
    const mutation = {
      variables: {
        input: {
          specializationsServices: services,
        },
      },
    };
    updateServices(mutation);
  };

  const groups = masterSpecializationsCatalog.groups
    ?.map((group) => {
      if (group.items === undefined || group.items === null) {
        return null;
      }

      const items = group?.items?.filter((item) =>
        entries?.find((entry) => entry.id === item.id)
      );

      if (items.length === 0) {
        return null;
      }

      return <CatalogGroup key={group?.id} group={group} entries={entries} />;
    })
    .filter((element) => element !== null);

  const phone = master?.phone?.phoneNumber;

  return (
    <MainContainer id="services">
      <Wrapper>
        <Top>
          <TitleWrap>
            <Title>Услуги</Title>
            {isOwner && (
              <EditIcons
                handleEditConfirm={handleEditConfirm}
                setIsEditing={setIsEditing}
              />
            )}
          </TitleWrap>
          <Count>{services.length}</Count>
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
          <EditMasterServices
            setEntriesItems={setEntriesItems}
            entriesItems={entriesItems}
            master={master}
            entries={entries}
            mobile
            masterSpecializationsCatalog={masterSpecializationsCatalog}
          />
        )}
        <noindex>
          {master?.onlineBookingUrl ? (
            <PhoneButton
              href={master?.onlineBookingUrl}
              target="_blank"
              rel="nofollow"
            >
              Онлайн запись
            </PhoneButton>
          ) : (
            <PhoneButton href={`tel:${phone}`}>Позвонить мастеру</PhoneButton>
          )}
        </noindex>
      </Wrapper>
    </MainContainer>
  );
};

export default MobileServicesComponent;
