import React, { FC, MouseEvent } from 'react'
import {
  Item,
  Container,
  Avatar,
  Content,
  Name,
  Type,
  DeleteButton,
  TrashIconStyled,
} from '../styles'
import { PHOTO_URL } from 'src/api/variables'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { IMaster } from 'src/types/masters'

export type TypeItem = 'master' | 'salon' | 'brand'

interface Props {
  item: ISalon | IBrand | IMaster
  itemType: TypeItem
  citySlug: string
  handeleDeleteOpenPopup: (
    e: MouseEvent<HTMLButtonElement>,
    item: IMaster | ISalon | IBrand,
    type: TypeItem,
  ) => void
}

const EmptyListItem: FC<Props> = ({
  item,
  itemType,
  citySlug,
  handeleDeleteOpenPopup,
}) => {
  const getTypeAndHref = (
    item: IMaster | ISalon | IBrand,
    itemType: TypeItem,
  ) => {
    switch (itemType) {
      case 'master':
        return {
          type: 'Профиль мастера',
          href: `/${citySlug}/master/${item.id}`,
          avatarUrl: (item as IMaster).photo?.url
            ? `${PHOTO_URL}${(item as IMaster).photo.url}`
            : 'empty-photo.svg',
        }
      case 'salon':
        return {
          type: (item as ISalon).rent
            ? 'Профиль салона арендодателя'
            : 'Профиль салона',
          href: (item as ISalon).rent
            ? `/${citySlug}/rent/${item.id}`
            : `/${citySlug}/salon/${item.id}`,
          avatarUrl: (item as ISalon).logo?.url
            ? `${PHOTO_URL}${(item as ISalon).logo?.url}`
            : 'empty-photo.svg',
        }
      case 'brand':
        return {
          type: 'Профиль бренда',
          href: `/${citySlug}/brand/${item.id}`,
          avatarUrl: (item as IBrand).logo?.url
            ? `${PHOTO_URL}${(item as IBrand).logo.url}`
            : 'empty-photo.svg',
        }
      default:
        return {
          type: '',
          href: '#',
          avatarUrl: 'empty-photo.svg',
        }
    }
  }

  const { type, href, avatarUrl } = getTypeAndHref(item, itemType)

  return (
    <li>
      <Item href={href}>
        <Container>
          <Avatar alt="avatar" src={avatarUrl} />
          <Content>
            <Name>{item.name}</Name>
            <Type>{type}</Type>
          </Content>
          <DeleteButton
            onClick={e => handeleDeleteOpenPopup(e, item, itemType)}
          >
            <TrashIconStyled />
          </DeleteButton>
        </Container>
      </Item>
    </li>
  )
}

export default EmptyListItem
