import { useContext, useState } from "react";
import Link from "next/link";
import {
  Wrapper,
  Item,
  Title,
  SubTitle,
  Container,
  Avatar,
  Content,
  Name,
  Type,
  Button,
  MobileWrapper,
} from "./styles";
import CreateProfiles from "../CreateProfiles";
import { CityContext } from "../../../../../searchContext";
import { cyrToTranslit } from "../../../../../utils/translit";
import { PHOTO_URL } from "../../../../../../variables";

const CabinetProfiles = ({ me }) => {
  const salons = me?.salons;
  const master = me?.master;
  const brands = me?.userBrands;
  const [openCreate, setOpenCreate] = useState(false);
  const [city] = useContext(CityContext);

  return (
    <>
      <Wrapper>
        <Title>{me?.info?.displayName}</Title>
        <SubTitle>Пользователь </SubTitle>
        {master?.id ? (
          <Link
            href={`/${cyrToTranslit(
              master?.addressFull?.city || city
            )}/master/${master?.seo?.slug || master?.id}`}
          >
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
          </Link>
        ) : null}
        {salons?.length
          ? salons.map((item) => (
              <div key={item.id}>
                <Link
                  href={
                    item?.lessor
                      ? `/${cyrToTranslit(item?.address?.city || city)}/rent/${
                          item?.seo?.slug || item?.id
                        }`
                      : `/${cyrToTranslit(item?.address?.city || city)}/salon/${
                          item?.seo?.slug || item?.id
                        }`
                  }
                >
                  <Item>
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
                </Link>
              </div>
            ))
          : null}
        {brands?.length
          ? brands.map((item) => (
              <div key={item.id}>
                <Link
                  href={`/${cyrToTranslit(
                    item?.addressFull?.city || city
                  )}/brand/${item?.seo?.slug || item?.id}`}
                >
                  <Item>
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
                </Link>
              </div>
            ))
          : null}
        {!openCreate ? (
          <Button onClick={() => setOpenCreate(true)}>Добавить профиль</Button>
        ) : (
          <CreateProfiles currentMe={me} />
        )}
      </Wrapper>
      <MobileWrapper>
        <CreateProfiles currentMe={me} />
      </MobileWrapper>
    </>
  );
};

export default CabinetProfiles;
