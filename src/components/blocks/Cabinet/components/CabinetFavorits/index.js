import { useEffect, useState } from "react";
import Tabs from "./components/tabs";
import { Wrapper, Wrap, TitlePage, Top } from "./styles";
import SalonsFavorites from "../../../../pages/FavoritesPage/SalonsFavorites";
import MastersFavorites from "../../../../pages/FavoritesPage/MastersFavorites";
import GoodsFavorites from "../../../../pages/FavoritesPage/GoodsFavorites";
import EducationsFavorites from "../../../../pages/FavoritesPage/EducationsFavorites";
import BrandsFavorites from "../../../../pages/FavoritesPage/BrandsFavorites";
import { useMedia } from "use-media";

const CabinetFavorits = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const mobileMedia = useMedia({ maxWidth: 768 });

  const handleDeleted = () => {
    setDeleted(!deleted);
  };

  let isFavoriteEmpty;
  if (typeof window !== "undefined") {
    isFavoriteEmpty =
      !favorites?.brands?.length &&
      !favorites?.masters?.length &&
      !favorites?.salons?.length &&
      !favorites?.products?.length &&
      !favorites?.educations?.length;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavorites(JSON.parse(localStorage.getItem("favorites")));
    }
  }, []);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")));
  }, [deleted]);

  useEffect(() => {
    if (favorites?.salons?.length) {
      setActiveTab("salons");
      return;
    }
    if (favorites?.brands?.length) {
      setActiveTab("brands");
      return;
    }
    if (favorites?.masters?.length) {
      setActiveTab("masters");
      return;
    }
    if (favorites?.products?.length) {
      setActiveTab("products");
      return;
    }
    if (favorites?.educations?.length) {
      setActiveTab("educations");
      return;
    }
  }, []);

  return (
    <Wrapper>
      {!mobileMedia ? (
        <TitlePage>Моё избранное</TitlePage>
      ) : (
        <Top>
          <TitlePage>Моё избранное</TitlePage>
        </Top>
      )}
      <Tabs
        salons={favorites?.salons}
        masters={favorites?.masters}
        brands={favorites?.brands}
        products={favorites?.products}
        educations={favorites?.educations}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "salons" && !mobileMedia ? (
        <SalonsFavorites handleDeleted={handleDeleted} cabinet />
      ) : null}
      {activeTab === "masters" && !mobileMedia ? (
        <MastersFavorites handleDeleted={handleDeleted} cabinet />
      ) : null}
      {activeTab === "brands" && !mobileMedia ? (
        <BrandsFavorites handleDeleted={handleDeleted} cabinet />
      ) : null}
      {activeTab === "products" && !mobileMedia ? (
        <GoodsFavorites handleDeleted={handleDeleted} cabinet />
      ) : null}
      {activeTab === "educations" && !mobileMedia ? (
        <EducationsFavorites handleDeleted={handleDeleted} cabinet />
      ) : null}
      {activeTab === "all" && !mobileMedia ? (
        <>
          <SalonsFavorites
            title="Избранные салоны"
            setActiveTab={setActiveTab}
            setDeleted={setDeleted}
            deleted={deleted}
            handleDeleted={handleDeleted}
            cabinet
          />
          <Wrap>
            <MastersFavorites
              title="Избранные мастера"
              setActiveTab={setActiveTab}
              handleDeleted={handleDeleted}
              cabinet
            />
          </Wrap>
          <Wrap>
            <BrandsFavorites
              title="Избранные бренды"
              setActiveTab={setActiveTab}
              handleDeleted={handleDeleted}
              cabinet
            />
          </Wrap>
          <Wrap>
            <GoodsFavorites
              title="Избранные продукты"
              setActiveTab={setActiveTab}
              handleDeleted={handleDeleted}
              cabinet
            />
          </Wrap>
          <Wrap>
            <EducationsFavorites
              title="Избранные обучения"
              setActiveTab={setActiveTab}
              handleDeleted={handleDeleted}
              cabinet
            />
          </Wrap>
        </>
      ) : null}
      {mobileMedia ? (
        <>
          <SalonsFavorites
            mobile={mobileMedia}
            title="Избранные салоны"
            cabinet
          />
          <MastersFavorites
            mobile={mobileMedia}
            title="Избранные мастера"
            cabinet
          />
          <BrandsFavorites
            mobile={mobileMedia}
            title="Избранные бренды"
            cabinet
          />
          <GoodsFavorites
            mobile={mobileMedia}
            title="Избранные продукты"
            cabinet
          />
          <EducationsFavorites
            mobile={mobileMedia}
            title="Избранные обучения"
            cabinet
          />
        </>
      ) : null}
    </Wrapper>
  );
};

export default CabinetFavorits;
