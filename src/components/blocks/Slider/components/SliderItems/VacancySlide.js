import Link from "next/link";
import Vacancy from "../../../Vacancy";

const VacancySlide = ({ item }) => {
  return (
    <Link href={`/vacancies/${item.id}`}>
      <a>
        <Vacancy
          title={item.title}
          photoId={item.photoId}
          amountFrom={item.amountFrom}
          amountTo={item.amountTo}
        />
      </a>
    </Link>
  );
};

export default VacancySlide;
