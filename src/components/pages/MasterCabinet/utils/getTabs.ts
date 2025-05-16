import { ICabinetRequestsData } from 'src/pages/masterCabinet'
import { IMasterCabinetTab } from '..'
import { IOrder } from 'src/types/orders'
import { IVacancy } from 'src/types/vacancies'

export type IGetTabs = (props: IGetTabsProps) => {
  mobile: IMasterCabinetTab[]
  desktop: IMasterCabinetTab[]
}

interface IGetTabsProps {
  requests: ICabinetRequestsData
  unreadMessagesCount: number | null
  orders: IOrder[]
  reviewsQuantity: number | null
  vacancies?: IVacancy[]
  sales: number
}

export const getTabs: IGetTabs = ({
  requests,
  unreadMessagesCount,
  orders,
  reviewsQuantity,
  vacancies,
  sales,
}) => {
  return {
    mobile: [
      { title: 'Мои данные', value: 'about', icon: '/icon-about.svg' },
      {
        title: 'Мои заказы',
        value: 'orders',
        icon: '/icon-orders.svg',
        quantity: orders.length || 0,
        disable: false,
      },
      {
        title: 'Мои заявки',
        value: 'requests',
        icon: '/icon-orders.svg',
        quantity: requests.rentalRequestsSalons.length || null,
        disable: false,
        visible: true,
      },
      {
        title: 'Моё избранное',
        value: 'favorits',
        icon: '/icon-star.svg',
        disable: false,
      },
      {
        title: 'Отзывы клиентов',
        value: 'reviews',
        icon: '/icon-reviews.svg',
        quantity: reviewsQuantity,
      },
      { title: 'Сообщения', value: 'chat', disable: true },
      {
        title: 'Мои акции',
        value: 'sales',
        disable: false,
        quantity: sales,
      },
      {
        title: 'Обучение',
        value: 'educations',
        disable: false,
      },
      {
        title: 'Вакансии',
        value: 'vacancies',
        quantity: vacancies?.length,
      },
      {
        title: 'Мероприятия',
        value: 'events',
        disable: false,
      },
      { title: 'Размещение', value: 'priority', disable: true },
      { title: 'Реклама', value: 'banner', disable: true },
    ],
    desktop: [
      { title: 'Мои данные', value: 'about' },
      { title: 'Мои профили', value: 'profiles' },
      {
        title: 'Сообщения',
        value: 'chat',
        quantity: unreadMessagesCount,
        disable: true,
      },
      {
        title: 'Мои заказы',
        value: 'orders',
        quantity: orders?.length || 0,
        disable: false,
      },
      {
        title: 'Мои заявки',
        value: 'requests',
        icon: '/icon-orders.svg',
        quantity: requests.rentalRequestsSalons.length,
        visible: !!requests.rentalRequests.length,
      },
      { title: 'Моё избранное', value: 'favorits', disable: false },
      { title: 'Отзывы клиентов', value: 'reviews', quantity: reviewsQuantity },
      {
        title: 'Мои акции',
        value: 'sales',
        disable: false,
        quantity: sales,
      },
      { title: 'Обучение', value: 'educations', disable: false },
      { title: 'Вакансии', value: 'vacancies', quantity: vacancies?.length },
      { title: 'Мероприятия', value: 'events', disable: false },
      { title: 'Размещение', value: 'priority', disable: true },
      { title: 'Реклама', value: 'banner', disable: true },
    ],
  }
}
