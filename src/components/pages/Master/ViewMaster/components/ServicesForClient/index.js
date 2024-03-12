import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CatalogGroupForClient } from "./components/CatalogGroupForClient";
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
import EditIcons from "../../../../../ui/EditIcons";
import EditSalonServicesForClient from "../../../../../pages/Salon/EditSalonServicesForClient";
import { updateServiceMasterMutation } from "../../../../../../_graphql-legacy/master/updateServiceMasterMutation";

const Services = ({
  services,
  isOwner,
  edit,
  setEdit,
  master,
  count,
  salonServicesMasterCatalog,
  masterDataQuery,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [entriesItems, setEntriesItems] = useState(services);

  const [updateServices] = useMutation(updateServiceMasterMutation, {
    onCompleted: () => {
      masterDataQuery();
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
          <CatalogGroupForClient
            entriesItems={entriesItems}
            withPrice
            key={idx}
            group={group}
          />
        );
      } else {
        return null;
      }
    })
    .filter((element) => element !== null);

  const secondColumnStart = Math.round(groups.length / 2);

  const phone = master?.phone?.phoneNumber;

  return (
    <MainContainer id="services">
      <Wrapper>
        <Top>
          <Title>
            Услуги
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
            <NoServicesText>Мастер пока не добавил услуги</NoServicesText>
          )
        ) : (
          <EditSalonServicesForClient
            setEntriesItems={setEntriesItems}
            entriesItems={entriesItems}
            services={services}
            salonServicesMasterCatalog={salonServicesMasterCatalog}
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
            <PhoneButton href={`tel:${phone}`}>Онлайн запись</PhoneButton>
          )}
        </noindex>
      </Wrapper>
    </MainContainer>
  );
};

export default Services;
