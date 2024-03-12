import { useState } from "react";
import { MobileCatalogGroupForClient } from "./MobileCatalogGroupForClient";
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
import { updateServiceMasterMutation } from "../../../../../../_graphql-legacy/master/updateServiceMasterMutation";
import EditSalonServicesForClient from "../../../../../pages/Salon/EditSalonServicesForClient";

const MobileServicesComponent = ({
  services,
  isOwner,
  master,
  masterPage = false,
  catalogs,
  refetchMaster,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [entriesItems, setEntriesItems] = useState(services);

  const salonServicesMasterCatalog = catalogOrDefault(
    catalogs?.salonServicesMasterCatalog
  );

  const [updateServices] = useMutation(updateServiceMasterMutation, {
    onCompleted: () => {
      refetchMaster();
    },
  });

  const handleEditConfirm = () => {
    updateServices({
      variables: {
        input: {
          masterId: master?.id,
          serviceMaster: entriesItems,
        },
      },
    });
  };

  const groups = salonServicesMasterCatalog?.groups
    ?.map((group, idx) => {
      if (
        entriesItems.find((item) => {
          for (let i = 0; i < group?.subGroups?.length; i++) {
            if (item?.id === group?.subGroups[i]?.id) {
              return item;
            }
            for (let j = 0; j < group?.subGroups[i]?.items?.length; j++) {
              if (item?.id === group?.subGroups[i]?.items[j]?.id) {
                return item;
              }
            }
          }
        })
      ) {
        return (
          <MobileCatalogGroupForClient
            masterPage={masterPage}
            withPrice
            key={idx}
            group={group}
            entriesItems={entriesItems}
          />
        );
      } else {
        return null;
      }
    })
    .filter((element) => element !== null);

  return (
    <MainContainer id="services">
      <Wrapper masterPage={masterPage}>
        <Top masterPage={masterPage}>
          <TitleWrap>
            <Title masterPage={masterPage}>Услуги</Title>
            {isOwner && (
              <EditIcons
                handleEditConfirm={handleEditConfirm}
                setIsEditing={setIsEditing}
              />
            )}
          </TitleWrap>
          <Count>{services?.length || 0}</Count>
        </Top>
        {!isEditing ? (
          groups?.length ? (
            <Content>{groups}</Content>
          ) : (
            <NoServicesText>Мастер пока не добавил услуги</NoServicesText>
          )
        ) : (
          <EditSalonServicesForClient
            masterPage={masterPage}
            setEntriesItems={setEntriesItems}
            entriesItems={entriesItems}
            services={services}
            salonServicesMasterCatalog={salonServicesMasterCatalog}
            mobile
          />
        )}
      </Wrapper>
    </MainContainer>
  );
};

export default MobileServicesComponent;
