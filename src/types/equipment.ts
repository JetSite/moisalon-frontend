export interface IEquipmentCategory {
  id: string
  title: string
}

export interface IEquipment {
  id: string
  title: string
  category: IEquipmentCategory
}
