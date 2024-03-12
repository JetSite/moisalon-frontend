import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import MainLayout from "../../../layouts/MainLayout";
import { MainContainer } from "../../../styles/common";
import MobileViewCards from "../../pages/MainPage/components/MobileViewCards";
import NavigationList from "./components/NavigationList";
import AdvicesList from "./components/AdvicesList";
import FullAdvice from "./components/AdvicesList/FullAdvice";
import { getAdvices } from "../../../_graphql-legacy/advices/getAdvices";
import { Wrapper, Navigation, Title, Content } from "./styles";

const AdvicesPage = ({
  categories,
  allAdvices,
  totalSalons,
  totalBrands,
  totalMasters,
  trends = false,
  beauty = false,
}) => {
  const router = useRouter();
  const [categoryClicked, setCategoryClicked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adviceClicked, setAdviceClicked] = useState("");
  const [categoryAdvicesData, setCategoryAdvicesData] = useState(null);

  useEffect(() => {
    if (router.query.category && router.query.item) {
      setCategoryClicked(router.query.category);
      setAdviceClicked(router.query.item);
    }
    if (trends) {
      setCategoryClicked("62976959ebbea30001eedad4");
    }
    if (beauty) {
      setCategoryClicked("61f31ea605670f0001637539");
    }
  }, []);

  const { refetch: refetchAdvices } = useQuery(getAdvices, {
    skip: true,
    variables: { catId: categoryClicked },
    onCompleted: (res) => {
      setLoading(false);
      setCategoryAdvicesData(res);
    },
  });

  useEffect(() => {
    setCategoryAdvicesData(null);
    refetchAdvices({ catId: categoryClicked });
  }, [categoryClicked]);

  const categoryAdvices = categoryAdvicesData?.pagesCategory?.length
    ? categoryAdvicesData?.pagesCategory
    : [];
  const renderItems = categoryClicked?.length ? categoryAdvices : allAdvices;

  const backHandler = () => {
    setCategoryClicked("");
    setAdviceClicked("");
  };

  const changeCategory = (e) => {
    if (e) {
      setLoading(true);
    }
    setCategoryClicked(e);
  };

  return (
    <MainLayout>
      <MobileViewCards
        totalSalons={totalSalons}
        totalBrands={totalBrands}
        totalMasters={totalMasters}
      />
      <MainContainer>
        <Wrapper>
          <Navigation>
            <Title>Новости</Title>
            <NavigationList
              loading={loading}
              categories={categories}
              categoryAdvices={categoryAdvices}
              categoryClicked={categoryClicked}
              setCategoryClicked={changeCategory}
              adviceClicked={adviceClicked}
              setAdviceClicked={setAdviceClicked}
            />
          </Navigation>
          <Content>
            {!categoryClicked?.length && !adviceClicked?.length && !loading ? (
              <AdvicesList
                items={!loading ? renderItems : []}
                adviceClicked={adviceClicked}
                setCategoryClicked={changeCategory}
                setAdviceClicked={setAdviceClicked}
              />
            ) : null}
            {categoryClicked?.length && !adviceClicked?.length && !loading ? (
              <AdvicesList
                items={!loading ? renderItems : []}
                adviceClicked={adviceClicked}
                setCategoryClicked={setCategoryClicked}
                setAdviceClicked={setAdviceClicked}
              />
            ) : null}
            {adviceClicked.length ? (
              <FullAdvice
                backHandler={backHandler}
                adviceClicked={adviceClicked}
              />
            ) : null}
          </Content>
        </Wrapper>
      </MainContainer>
    </MainLayout>
  );
};

export default AdvicesPage;
