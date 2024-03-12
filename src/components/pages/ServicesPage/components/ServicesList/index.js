import ServicesListItem from "./ServicesListItem";
import MastersResult from "./MastersResult";
import SalonsResult from "./SalonsResult";

import { Wrapper } from "./styles";

const popularServices = [
  {
    id: "haircut_womens",
    title: "Женская стрижка",
    price: "от 2000",
    offer: "312 предложений",
    photo: "/services-page-photo1.jpg",
  },
  {
    id: "haircut_mens",
    title: "Мужская стрижка",
    price: "от 2000",
    offer: "312 предложений",
    photo: "/services-page-photo2.jpg",
  },
  {
    id: "haircut_childrens",
    title: "Детская стрижка",
    price: "от 2000",
    offer: "312 предложений",
    photo: "/services-page-photo3.jpg",
  },
  {
    id: "laying_wedding_styling",
    title: "Свадебная укладка",
    price: "от 2000",
    offer: "312 предложений",
    photo: "/services-page-photo4.jpg",
  },
  {
    id: "makeup_makeup_evening",
    title: "Вечерний макияж",
    price: "от 2000",
    offer: "312 предложений",
    photo: "/services-page-photo5.jpg",
  },
  {
    id: "makeup_makeup_wedding",
    title: "Свадебный макияж",
    price: "от 2000",
    offer: "312 предложений",
    photo: "/services-page-photo6.jpg",
  },
  {
    id: "cosmetology_injection_contouring",
    title: "Контурная пластика",
    price: "от 2000",
    offer: "312 предложений",
    photo: "/services-page-photo7.jpg",
  },
  {
    id: "cosmetology_aesthetic_peeling",
    title: "Пилинг",
    price: "от 2000",
    offer: "312 предложений",
    photo: "/services-page-photo8.jpg",
  },
  {
    id: "spa_massage_general",
    title: "Массаж",
    price: "от 2000",
    offer: "312 предложений",
    photo: "/services-page-photo9.jpg",
  },
  {
    id: "nail_manicure_classic",
    title: "Классический маникюр",
    price: "от 2000",
    offer: "312 предложений",
    photo: "/services-page-photo10.jpg",
  },
];

const ServicesList = ({
  mastersData = null,
  salonsData = null,
  popularServiceHandler,
}) => {
  return (
    <Wrapper>
      {!mastersData && !salonsData
        ? popularServices.map((popularService) => (
            <ServicesListItem
              key={popularService.id}
              popularService={popularService}
              popularServiceHandler={popularServiceHandler}
            />
          ))
        : null}
      {mastersData ? <MastersResult mastersData={mastersData} /> : null}
      {salonsData ? <SalonsResult salonsData={salonsData} /> : null}
    </Wrapper>
  );
};

export default ServicesList;
