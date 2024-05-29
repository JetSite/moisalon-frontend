export interface IMainPageHeaderLinks {
  title: string
  link: string
  target: string
  pathArr?: string[]
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
      target: '_self',
      pathArr: ['/[city]/salon', '/[city]/salon/[id]'],
    },
  ]

  const addNavLinks: IMainPageHeaderLinks[] = [
    {
      title: 'Бренд',
      link: `/${city}/brand`,
      target: '_self',
      pathArr: [
        '/[city]/brand',
        '/[city]/brand/[id]',
        '/[city]/brand/[id]/products',
      ],
    },
    {
      title: 'Услуги',
      link: `/${city}/services`,
      target: '_self',
    },
    { title: 'Акции', link: '/sales', target: '_self' },
    { title: 'Обучение', link: '/educations', target: '_self' },
    { title: 'Мероприятия', link: '/events', target: '_self' },
    { title: 'Вакансии', link: '/vacancies', target: '_self' },
    { title: 'Новости', link: '/advices', target: '_self' },
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
