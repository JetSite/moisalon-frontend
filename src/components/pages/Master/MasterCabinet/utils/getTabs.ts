import { ICabinetRequestsData } from 'src/pages/masterCabinet'
import { IMasterCabinetTab } from '..'
import { ICart } from 'src/types/product'
import { IOrder } from 'src/types/orders'

export type IGetTabs = (props: IGetTabsProps) => {
  mobile: IMasterCabinetTab[]
  desktop: IMasterCabinetTab[]
}

interface IGetTabsProps {
  requests: ICabinetRequestsData
  unreadMessagesCount: number | null
  orders: IOrder[]
}

export const getTabs: IGetTabs = ({
  requests,
  unreadMessagesCount,
  orders,
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
        quantity:
          requests.rentalRequests.filter(req => req.status.id === '1').length ||
          null,
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
      },
      { title: 'Сообщения', value: 'chat', disable: true },
      {
        title: 'Мои акции',
        value: 'sales',
        disable: false,
      },
      {
        title: 'Обучение',
        value: 'educations',
        disable: true,
      },
      {
        title: 'Вакансии',
        value: 'vacancies',
      },
      {
        title: 'Мероприятия',
        value: 'events',
        disable: true,
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
        quantity: requests.rentalRequests.filter(req => req.status.id === '1')
          .length,
        visible: !!requests.rentalRequests.length,
      },
      { title: 'Моё избранное', value: 'favorits', disable: false },
      { title: 'Отзывы клиентов', value: 'reviews' },
      { title: 'Мои акции', value: 'sales', disable: false },
      { title: 'Обучение', value: 'educations', disable: true },
      { title: 'Вакансии', value: 'vacancies' },
      { title: 'Мероприятия', value: 'events', disable: true },
      { title: 'Размещение', value: 'priority', disable: true },
      { title: 'Реклама', value: 'banner', disable: true },
    ],
  }
}
