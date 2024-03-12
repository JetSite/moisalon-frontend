import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
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
  SalesWrapper,
  Back,
  SkeletonWrap,
} from "./styles";
import Button from "../../../../ui/Button";
import CreateEducation from "../../../CreateEducation";
import { MobileHidden, MobileVisible } from "../../../../../styles/common";
import { currentEducation } from "../../../../../_graphql-legacy/education/currentEducation";
import Education from "../../../Education";
import { PHOTO_URL } from "../../../../../../variables";

const CabinetEducationsList = ({ educations, loading }) => {
  if (loading) {
    return <SkeletonWrap variant="rect" />;
  }

  return (
    <SalesWrapper>
      {educations?.length > 0 ? (
        <>
          {educations?.map((item) => (
            <Education
              title={item.title}
              id={item.id}
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
                item?.brandOrigin?.name
              }`}
              averageScore={item.averageScore}
              numberScore={item.numberScore}
              amount={item.amount}
              photoId={item.photoId}
              dateStart={item.dateStart}
              dateEnd={item.dateEnd}
            />
          ))}
        </>
      ) : (
        <Subtitle>У профиля нет обучающих программ</Subtitle>
      )}
    </SalesWrapper>
  );
};

const CabinetEducations = ({ me }) => {
  const salons = me?.salons;
  const master = me?.master;
  const brands = me?.userBrands;

  const [id, setId] = useState("");
  const [type, setType] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createEducation, setCreateEducation] = useState(false);

  const { data, refetch: refetchEducations } = useQuery(currentEducation, {
    skip: true,
    variables: {
      originId: id,
    },
    onCompleted: (res) => {
      setEducations(res?.currentEducation);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      setEducations([]);
      refetchEducations({
        variables: {
          originId: id,
        },
      });
    }
  }, [type, id]);

  return (
    <Wrapper>
      <TitlePage>Обучение</TitlePage>
      <Subtitle>
        Нажмите на профиль для просмотра или создания обучений
      </Subtitle>
      {!master?.id && !salons?.length && !brands?.length ? (
        <Subtitle>У Вас нет профиля</Subtitle>
      ) : null}
      {master?.id && !activeProfile ? (
        <Item
          onClick={() => {
            setType("master");
            setId(master?.id);
            setActiveProfile(master);
          }}
        >
          <Container>
            <Avatar
              alt="avatar"
              src={master?.photo?.url || "empty-photo.svg"}
            />
            <Content>
              <Name>{master?.name}</Name>
              <Type>Профиль мастера</Type>
            </Content>
          </Container>
        </Item>
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
      {type === "master" && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null);
              setCreateEducation(false);
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={master?.photo?.url || "empty-photo.svg"}
              />
              <Content>
                <Name>{master?.name}</Name>
                <Type>Профиль мастера</Type>
              </Content>
            </Container>
          </Item>
          {!createEducation ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateEducation(true)}
                >
                  Создать обучающую программу
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateEducation(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать обучающую программу
                </Button>
              </MobileVisible>
              <CabinetEducationsList
                educations={educations}
                loading={loading}
              />
            </>
          ) : (
            <CreateEducation
              refetch={refetchEducations}
              type={type}
              activeProfile={activeProfile}
              setCreateEducation={setCreateEducation}
            />
          )}
        </>
      ) : null}
      {type === "salon" && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null);
              setCreateEducation(false);
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
          {!createEducation ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateEducation(true)}
                >
                  Создать обучающую программу
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateEducation(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать обучающую программу
                </Button>
              </MobileVisible>
              <CabinetEducationsList
                educations={educations}
                loading={loading}
              />
            </>
          ) : (
            <CreateEducation
              refetch={refetchEducations}
              type={type}
              activeProfile={activeProfile}
              setCreateEducation={setCreateEducation}
            />
          )}
        </>
      ) : null}
      {type === "brand" && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null);
              setCreateEducation(false);
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
          {!createEducation ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateEducation(true)}
                >
                  Создать обучающую программу
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateEducation(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать обучающую программу
                </Button>
              </MobileVisible>
              <CabinetEducationsList
                educations={educations}
                loading={loading}
              />
            </>
          ) : (
            <CreateEducation
              refetch={refetchEducations}
              type={type}
              activeProfile={activeProfile}
              setCreateEducation={setCreateEducation}
            />
          )}
        </>
      ) : null}
    </Wrapper>
  );
};

export default CabinetEducations;
