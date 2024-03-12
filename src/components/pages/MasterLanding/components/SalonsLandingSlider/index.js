import { useQuery } from "@apollo/client";
import { salonsRandom } from "../../../../../_graphql-legacy/salon/salonsRandom";
import Slider from "../../../../blocks/Slider";

const SalonsLandingSlider = () => {
  const { data: salons, loading } = useQuery(salonsRandom, {
    variables: { count: 10 },
    fetchPolicy: "network-only",
  });

  return (
    <Slider
      type="salons"
      loading={loading}
      items={salons?.salonsRandom || []}
      title="Кабинеты в этих салонах уже доступны в аренду"
      bgColor="#000"
      landingMaster={true}
    />
  );
};

export default SalonsLandingSlider;
