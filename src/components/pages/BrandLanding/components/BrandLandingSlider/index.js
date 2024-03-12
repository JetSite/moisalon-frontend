import Slider from "../../../../blocks/Slider";

const brands = [
  {
    id: "60a8bc511162870001c954d2",
    logoId: "60a8bc454dc7af00011cc0ca",
    name: "Men Stories",
  },
  {
    id: "60892927d821bc00017677ee",
    logoId: "60aa43924dc7af00011cc13e",
    name: "Dream Catcher",
  },
  {
    id: "60a9168d1162870001c954ef",
    logoId: "60a916854dc7af00011cc11c",
    name: "Kinetics",
  },
  {
    id: "60a818081162870001c954c5",
    logoId: "60ba2f439ae2b60001a35145",
    name: "CUTRIN",
  },
  {
    id: "61794bf224006900015b1a87",
    logoId: "61794bf05019cf00015698b8",
    name: "MALECULA",
  },
  {
    id: "61794d7724006900015b1a88",
    logoId: "61794d765019cf00015698ba",
    name: "Paul Oscar",
  },
  {
    id: "6203cd837048800001f1195a",
    logoId: "6203cd813956fd000106c385",
    name: "Moser",
  },
  {
    id: "61794ace24006900015b1a86",
    logoId: "61794acc5019cf00015698b6",
    name: "Luckly",
  },
  {
    id: "6203cf9c7048800001f1195b",
    logoId: "6203cf9a3956fd000106c387",
    name: "Wahl",
  },
];

const BrandLandingSlider = () => {
  return (
    <Slider
      type="brands"
      items={brands}
      title="20+ брендов уже зарабатывают с нами"
      landingBrand={true}
      noBottom
    />
  );
};

export default BrandLandingSlider;
