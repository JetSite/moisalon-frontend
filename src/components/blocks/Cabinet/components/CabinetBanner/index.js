import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Wrapper, TitlePage, Subtitle } from "./styles";
import Button from "../../../../ui/Button";
import { MobileHidden, MobileVisible } from "../../../../../styles/common";
import { requestBannerUser } from "../../../../../_graphql-legacy/baners/requestBannerUser";
import { deleteBannerMutation } from "../../../../../_graphql-legacy/baners/deleteBannerMutation";
import CreateBanner from "../../../CreateBanner";
import Banner from "../../../Banner";

const CabinetBanner = () => {
  const [banners, setBanners] = useState([]);
  const [, setLoading] = useState(false);
  const [createBanner, setCreateBanner] = useState(false);

  const { refetch: refetchBanners } = useQuery(requestBannerUser, {
    onCompleted: (res) => {
      setBanners(res?.requestBannerUser);
      setLoading(false);
    },
  });

  const [deleteBanner] = useMutation(deleteBannerMutation, {
    onCompleted: async () => {
      refetchBanners();
    },
  });

  const handleDelete = (item) => {
    deleteBanner({
      variables: {
        id: item.id,
      },
    });
  };

  return (
    <Wrapper>
      <TitlePage>Реклама</TitlePage>
      <Subtitle>Создайте заявку на размещение рекламы</Subtitle>
      {!createBanner ? (
        <>
          <MobileHidden>
            <Button
              size="width374WithoutPadding"
              variant="darkTransparent"
              font="medium"
              onClick={() => setCreateBanner(true)}
            >
              Создать заявку
            </Button>
          </MobileHidden>
          <MobileVisible>
            <Button
              size="fullWidth"
              onClick={() => setCreateBanner(true)}
              variant="darkTransparent"
              font="small"
            >
              Создать заявку
            </Button>
          </MobileVisible>
          {banners?.length
            ? banners
                ?.filter((el) => el.status !== "DELETED")
                .map((item) => (
                  <Banner
                    handleDelete={handleDelete}
                    key={item.id}
                    item={item}
                  />
                ))
            : null}
        </>
      ) : null}
      {createBanner ? (
        <CreateBanner
          refetch={refetchBanners}
          setCreateBanner={setCreateBanner}
        />
      ) : null}
    </Wrapper>
  );
};

export default CabinetBanner;
