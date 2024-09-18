export interface IQuantityFieldsWorkplaceConfig {
  name: string
  label: string
  type: string
}

export const quantityFieldsConfig: IQuantityFieldsWorkplaceConfig[] = [
  { name: 'wetPointsHands', label: 'Мойки, шт.', type: 'Мокрые точки' },
  { name: 'wetPointsHead', label: 'Краны, шт.', type: 'Мокрые точки' },
  { name: 'wetPointsShower', label: 'Душевые, шт.', type: 'Мокрые точки' },
  {
    name: 'electricity_sockets_count',
    label: 'Электрические розетки, шт.',
    type: 'Точки электричества',
  },
  {
    name: 'electricity_sockets_extenders_count',
    label: 'Удлинители розеток, шт.',
    type: 'Точки электричества',
  },
  {
    name: 'electricity_sockets_ups_count',
    label: 'Розетки с ИБП, шт.',
    type: 'Точки электричества',
  },
]
