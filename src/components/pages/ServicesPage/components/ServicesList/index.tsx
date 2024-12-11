import { FC } from 'react'
import MastersResult from './MastersResult'
import SalonsResult from './SalonsResult'
import ServicesListItem from './ServicesListItem'
import { Wrapper } from './styles'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import { IServiceCategory, IServiceInCategory } from 'src/types/services'
import { ISetState } from 'src/types/common'

const popularServices = [
  {
    id: '1',
    title: 'Женская стрижка',
    price: 'от 2000',
    offer: '312 предложений',
    photo: '/services-page-photo1.jpg',
  },
  {
    id: '1',
    title: 'Мужская стрижка',
    price: 'от 2000',
    offer: '312 предложений',
    photo: '/services-page-photo2.jpg',
  },
  // {
  //   id: '1',
  //   title: 'Детская стрижка',
  //   price: 'от 2000',
  //   offer: '312 предложений',
  //   photo: '/services-page-photo3.jpg',
  // },
  // {
  //   id: 'laying_wedding_styling',
  //   title: 'Свадебная укладка',
  //   price: 'от 2000',
  //   offer: '312 предложений',
  //   photo: '/services-page-photo4.jpg',
  // },
  {
    id: '5',
    title: 'Брови и ресницы',
    price: 'от 2000',
    offer: '312 предложений',
    photo: '/services-page-photo5.jpg',
  },
  // {
  //   id: 'makeup_makeup_wedding',
  //   title: 'Свадебный макияж',
  //   price: 'от 2000',
  //   offer: '312 предложений',
  //   photo: '/services-page-photo6.jpg',
  // },
  // {
  //   id: 'cosmetology_injection_contouring',
  //   title: 'Контурная пластика',
  //   price: 'от 2000',
  //   offer: '312 предложений',
  //   photo: '/services-page-photo7.jpg',
  // },
  // {
  //   id: 'cosmetology_aesthetic_peeling',
  //   title: 'Пилинг',
  //   price: 'от 2000',
  //   offer: '312 предложений',
  //   photo: '/services-page-photo8.jpg',
  // },
  {
    id: '15',
    title: 'Массаж',
    price: 'от 2000',
    offer: '312 предложений',
    photo: '/services-page-photo9.jpg',
  },
  {
    id: '11',
    title: 'Классический маникюр',
    price: 'от 2000',
    offer: '312 предложений',
    photo: '/services-page-photo10.jpg',
  },
]

interface IServicesListProps {
  masters?: IMaster[]
  salons?: ISalon[]
  setClickedService?: ISetState<IServiceInCategory | null>
  popularServiceHandler?: (id: string) => void
}

const ServicesList: FC<IServicesListProps> = ({
  masters = null,
  salons = null,
  popularServiceHandler,
}) => {
  return (
    <Wrapper>
      {!masters && !salons
        ? popularServices.map(popularService => (
            <ServicesListItem
              key={popularService.title}
              popularService={popularService}
              popularServiceHandler={popularServiceHandler}
            />
          ))
        : null}
      {masters ? <MastersResult masters={masters} /> : null}
      {salons ? <SalonsResult salons={salons} /> : null}
    </Wrapper>
  )
}

export default ServicesList
