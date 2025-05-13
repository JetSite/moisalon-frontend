import { IEquipment } from 'src/types/equipment'
import { IService } from 'src/types/services'
import { ISalonWorkplace } from 'src/types/workplace'
import {
  IGroupedItems,
  getCategorisedItems,
} from 'src/utils/newUtils/getCategotisedItems'
import { ITechnicalArr } from '../components/TechnicalItems'

export type IGetPrepareData = (workplace: ISalonWorkplace) => {
  equipment: IGroupedItems<IEquipment>[]
  services: IGroupedItems<IService>[]
  technicalsArr: ITechnicalArr[]
}

export const getPrepareData: IGetPrepareData = workplace => {
  const equipment = getCategorisedItems(workplace.equipment, {
    categoryKey: 'category',
  })

  if (workplace?.hasWindows) {
    equipment.unshift({
      id: '100',
      title: 'Удобства',
      items: [
        { id: '1000', title: 'Наличие окон', category: { id: '', title: '' } },
      ],
    })
  }

  const services = getCategorisedItems(workplace.services, {
    categoryKey: 'service_categories',
  })

  const technicalsArr: ITechnicalArr[] = [
    {
      title: workplace.space ? 'Площадь' : null,
      item: workplace.space ? workplace.space + ' м2' : '',
    },
    {
      title: workplace.floor ? 'Этаж' : null,
      item: workplace.floor ? workplace.floor + ' м2' : '',
    },
    { title: 'Окна', item: workplace.hasWindows ? 'да' : 'нет' },
    {
      title: 'Мокрые точки',
      item: [
        {
          title: 'Для мытья рук',
          item: `${workplace.wetPointsHands} шт`,
          show: !!workplace.wetPointsHands,
        },
        {
          title: 'Для мытья головы',
          item: `${workplace.wetPointsHead} шт`,
          show: !!workplace?.wetPointsHead,
        },
        {
          title: 'Душ',
          item: `${workplace.wetPointsShower} шт`,
          show: !!workplace?.wetPointsShower,
        },
      ],
    },
    {
      title: 'Точки электричества',
      item: [
        {
          title: 'Розетки',
          item: `${workplace.electricitySocketsCount} шт`,
          show: !!workplace.electricitySocketsCount,
        },
        {
          title: 'Удлинители',
          item: `${workplace.electricitySocketsExtendersCount} шт`,
          show: !!workplace?.electricitySocketsExtendersCount,
        },
        {
          title: 'Розетки с бесперебойником',
          item: `${workplace.electricitySocketsUpsCount} шт`,
          show: !!workplace?.electricitySocketsUpsCount,
        },
      ],
    },
  ]
  return { equipment, services, technicalsArr }
}
