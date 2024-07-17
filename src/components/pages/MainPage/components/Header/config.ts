export interface IMainPageHeaderLinks {
  title: string
  link: string
  target: string
  pathArr?: string[]
  disabled?: boolean
  visible?: boolean
}

export default function getMainPageHeaderLinks(
  city: string,
  isLoggedIn?: boolean,
) {
  const navLinks: IMainPageHeaderLinks[] = [
    {
      title: 'Магазин',
      link: `/${city}/beautyFreeShop`,
      target: '_self',
      pathArr: ['/[city]/beautyFreeShop'],
    },
    {
      title: 'Сдать',
      link: isLoggedIn ? '/createLessorSalon' : '/login',
      target: '_self',
    },
    { title: 'Снять', link: `/${city}/rent`, target: '_self' },
    {
      title: 'Мастер',
      link: `/${city}/master`,
      target: '_self',
      pathArr: ['/[city]/master', '/[city]/master/[id]'],
    },
    {
      title: 'Салон',
      link: `/${city}/salon`,
      disabled: false,
      target: '_self',
      pathArr: ['/[city]/salon', '/[city]/salon/[id]'],
    },
  ]

  const addNavLinks: IMainPageHeaderLinks[] = [
    {
      title: 'Бренд',
      link: `/${city}/brand`,
      target: '_self',
      disabled: false,
      pathArr: [
        '/[city]/brand',
        '/[city]/brand/[id]',
        '/[city]/brand/[id]/products',
      ],
    },
    {
      title: 'Услуги',
      link: `/${city}/services`,
      disabled: true,
      target: '_self',
    },
    { title: 'Акции', link: '/sales', target: '_self', disabled: true },
    {
      title: 'Обучение',
      link: '/educations',
      target: '_self',
      disabled: true,
    },
    { title: 'Мероприятия', link: '/events', target: '_self', disabled: true },
    { title: 'Вакансии', link: '/vacancies', target: '_self', disabled: true },
    { title: 'Новости', link: '/advices', target: '_self', disabled: true },
    // {
    //   title: 'Тренды',
    //   link: '/trends',
    //   target: '_self',
    // },
  ]

  const addCatalogLinks: IMainPageHeaderLinks[] = [
    {
      title: 'B2B магазин',
      link: `/${city}/beautyFreeShop`,
      target: '_self',
    },
    {
      title: 'B2C магазин',
      link: `/${city}/beautyFreeShop`,
      target: '_self',
    },
  ]

  return { addCatalogLinks, addNavLinks, navLinks }
}
