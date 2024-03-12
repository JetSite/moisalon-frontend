import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Wrapper,
  TitlePage,
  Subtitle,
  Item,
  Container,
  Avatar,
  Content,
  Name,
  Type,
  VacanciesWrapper,
  Back,
  SkeletonWrap,
} from "./styles";
import Button from "../../../../ui/Button";
import CreateVacancy from "./components/CreateVacancy";
import { MobileHidden, MobileVisible } from "../../../../../styles/common";
import { currentVacancies } from "../../../../../_graphql-legacy/vacancies/currentVacancies";
import { deleteVacancyMutation } from "../../../../../_graphql-legacy/vacancies/deleteVacancyMutation";
import Vacancy from "../../../Vacancy";
import { PHOTO_URL } from "../../../../../../variables";

const CabinetVacanciesList = ({ vacancies, loading, removeVacancy }) => {
  if (loading) {
    return <SkeletonWrap variant="rect" />;
  }

  return (
    <VacanciesWrapper>
      {vacancies?.length > 0 ? (
        <>
          {vacancies?.map((item) => (
            <Vacancy
              key={item.id}
              id={item.id}
              title={item.title}
              name={`${
                item?.origin.toLowerCase() === "master"
                  ? "Мастер"
                  : item.origin.toLowerCase() === "salon"
                  ? "Салон"
                  : item.origin.toLowerCase() === "brand"
                  ? "Бренд"
                  : ""
              } ${
                item?.masterOrigin?.name ||
                item?.salonOrigin?.name ||
                item?.brandOrigin?.name ||
                ""
              }`}
              photoId={item.photoId}
              amountFrom={item.amountFrom}
              amountTo={item.amountTo}
              removeVacancy={removeVacancy}
            />
          ))}
        </>
      ) : (
        <Subtitle>У профиля нет вакансий</Subtitle>
      )}
    </VacanciesWrapper>
  );
};

const CabinetVacancies = ({ me }) => {
  const salons = me?.salons;
  const master = me?.master;
  const brands = me?.userBrands;

  const [id, setId] = useState("");
  const [type, setType] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createVacancy, setCreateVacancy] = useState(false);

  const { data, refetch: refetchVacancies } = useQuery(currentVacancies, {
    skip: true,
    variables: {
      originId: id,
    },
    onCompleted: (res) => {
      setVacancies(res?.currentVacancies);
      setLoading(false);
    },
  });

  const [removeVacancy] = useMutation(deleteVacancyMutation, {
    onCompleted: () => {
      refetchVacancies();
    },
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      setVacancies([]);
      refetchVacancies({
        variables: {
          originId: id,
        },
      });
    }
  }, [type, id]);

  return (
    <Wrapper>
      <TitlePage>Вакансии</TitlePage>
      <Subtitle>
        Нажмите на профиль для просмотра или создания вакансий
      </Subtitle>
      {!salons?.length && !brands?.length ? (
        <Subtitle>У Вас нет профиля бренда или салона</Subtitle>
      ) : null}
      {salons?.length && !activeProfile
        ? salons.map((item) => (
            <div key={item.id}>
              <Item
                onClick={() => {
                  setType("salon");
                  setId(item?.id);
                  setActiveProfile(item);
                }}
              >
                <Container>
                  <Avatar
                    alt="avatar"
                    src={item?.logo?.url || "empty-photo.svg"}
                  />
                  <Content>
                    <Name>{item?.name}</Name>
                    <Type>
                      {item?.lessor
                        ? "Профиль салона арендодателя"
                        : "Профиль салона"}
                    </Type>
                  </Content>
                </Container>
              </Item>
            </div>
          ))
        : null}
      {brands?.length && !activeProfile
        ? brands.map((item) => (
            <div key={item.id}>
              <Item
                onClick={() => {
                  setType("brand");
                  setId(item?.id);
                  setActiveProfile(item);
                }}
              >
                <Container>
                  <Avatar
                    alt="avatar"
                    src={
                      item?.logoId
                        ? `${PHOTO_URL}${item?.logoId}/original`
                        : "empty-photo.svg"
                    }
                  />
                  <Content>
                    <Name>{item?.name}</Name>
                    <Type>Профиль бренда</Type>
                  </Content>
                </Container>
              </Item>
            </div>
          ))
        : null}
      {type === "salon" && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null);
              setCreateVacancy(false);
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={activeProfile?.logo?.url || "empty-photo.svg"}
              />
              <Content>
                <Name>{activeProfile?.name}</Name>
                <Type>Профиль салона</Type>
              </Content>
            </Container>
          </Item>
          {!createVacancy ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateVacancy(true)}
                >
                  Создать вакансию
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateVacancy(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать вакансию
                </Button>
              </MobileVisible>
              <CabinetVacanciesList
                vacancies={vacancies}
                loading={loading}
                removeVacancy={removeVacancy}
              />
            </>
          ) : (
            <CreateVacancy
              refetch={refetchVacancies}
              type={type}
              activeProfile={activeProfile}
              setCreateVacancy={setCreateVacancy}
            />
          )}
        </>
      ) : null}
      {type === "brand" && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null);
              setCreateVacancy(false);
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={
                  activeProfile?.logoId
                    ? `${PHOTO_URL}${activeProfile?.logoId}/original`
                    : "empty-photo.svg"
                }
              />
              <Content>
                <Name>{activeProfile?.name}</Name>
                <Type>Профиль бренда</Type>
              </Content>
            </Container>
          </Item>
          {!createVacancy ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateVacancy(true)}
                >
                  Создать вакансию
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateVacancy(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать вакансию
                </Button>
              </MobileVisible>
              <CabinetVacanciesList
                vacancies={vacancies}
                loading={loading}
                removeVacancy={removeVacancy}
              />
            </>
          ) : (
            <CreateVacancy
              refetch={refetchVacancies}
              type={type}
              activeProfile={activeProfile}
              setCreateVacancy={setCreateVacancy}
            />
          )}
        </>
      ) : null}
    </Wrapper>
  );
};

export default CabinetVacancies;
