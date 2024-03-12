import { useContext } from "react";
import Link from "next/link";
import Button from "../../ui/Button";
import { MobileVisible, MobileHidden } from "../../../styles/common";
import { Wrapper, Title, Text } from "./styles";
import MainLayout from "../../../layouts/MainLayout";
import { cyrToTranslit } from "../../../utils/translit";
import { CityContext } from "../../../searchContext";

const NotFound = () => {
  const [city] = useContext(CityContext);
  return (
    <MainLayout noMobileFooter>
      <Wrapper>
        <Title>404:</Title>
        <Text>Страница не найдена</Text>
        <MobileHidden>
          <Link href={`/${cyrToTranslit(city)}`} passHref>
            <Button size="medium" variant="red" mt="103" z="10">
              На главную
            </Button>
          </Link>
        </MobileHidden>
        <MobileVisible>
          <Link href={`/${cyrToTranslit(city)}`} passHref>
            <Button size="fullWidth" variant="red" mt="300" z="10">
              На главную
            </Button>
          </Link>
        </MobileVisible>
      </Wrapper>
    </MainLayout>
  );
};

export default NotFound;
