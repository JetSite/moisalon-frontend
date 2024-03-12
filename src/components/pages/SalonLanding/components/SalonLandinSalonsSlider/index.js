import { useQuery } from "@apollo/client";
import { salonsRandom } from "../../../../../_graphql-legacy/salon/salonsRandom";
import Slider from "../../../../blocks/Slider";

const SalonLandinSalonsSlider = () => {
  const { data: salons, loading } = useQuery(salonsRandom, {
    variables: { count: 10 },
    fetchPolicy: "network-only",
  });

  return (
    <Slider
      type="salons"
      loading={loading}
      items={salons?.salonsRandom || []}
      title="1200+ салонов уже зарабатывают с нами"
      bgColor="#000"
      landingSalon={true}
    />
  );
};

export default SalonLandinSalonsSlider;
