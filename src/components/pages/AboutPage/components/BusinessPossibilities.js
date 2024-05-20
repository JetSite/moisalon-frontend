import { useState } from 'react'
import Link from 'next/link'
import Button from '../../../ui/Button'
import { MobileHidden, MobileVisible } from '../../../../styles/common'
import {
  BPWrapper,
  BPContent,
  BPTitle,
  BPList,
  BPItemWrap,
  BPItem,
  Plus,
  RedStar,
  WaveVertical,
  WhiteCircle,
  Underlined,
  RedArrow,
} from '../styles'
import { cyrToTranslit } from '../../../../utils/translit'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const BusinessPossibilities = () => {
  const { city, me } = useAuthStore(getStoreData)
  const b2bClient = !!me?.master?.id || !!me?.salons?.length
  const isLoggedIn = me?.info !== undefined && me?.info !== null

  const masterList = (
    <>
      – быстро <Link href={`/${city.citySlug}/rent`}>арендовать</Link> рабочее
      место или кабинет;
      <br />– <Link href={`/${city.citySlug}/beautyFreeShop`}>купить</Link>{' '}
      профессиональную косметику и оборудование напрямую у брендов;
      <br />–{' '}
      <Link href={isLoggedIn ? '/masterCabinet' : '/login'}>создать</Link> в
      несколько кликов собственный сайт-визитку с портфолио и привлечь новых
      клиентов
    </>
  )

  const salonList = (
    <>
      – <Link href="/createLessorSalon">сдать</Link> в аренду помещение или
      рабочее место;
      <br />–{' '}
      <Link href={`/${cyrToTranslit(city)}/beautyFreeShop`}>купить</Link>{' '}
      профессиональную косметику и оборудование напрямую у брендов; <br />–{' '}
      <Link href={isLoggedIn ? '/masterCabinet' : '/login'}>привлечь</Link>{' '}
      новую аудиторию
    </>
  )

  const brandList = (
    <>
      – <Link href={isLoggedIn ? '/masterCabinet' : '/login'}>открыть</Link>{' '}
      перспективный канал продаж; <br />
      – расширить представительство на рынке;
      <br />– повысить узнаваемость бренда; создать базу лояльных постоянных
      покупателей
    </>
  )

  const clientList = (
    <>
      – <Link href={`/${cyrToTranslit(city)}/master`}>найти</Link> подходящего
      мастера; <br />–{' '}
      <Link href={`/${cyrToTranslit(city)}/salon`}>выбрать</Link> ближайший
      салон; <br />– <Underlined>записаться</Underlined> на услугу
    </>
  )

  const items = [
    { title: 'для мастера', text: masterList },
    { title: 'для салона', text: salonList },
    { title: 'для бренда', text: brandList },
    { title: 'для клиента', text: clientList },
  ]
  return (
    <BPWrapper>
      <BPContent>
        <BPTitle>возможности</BPTitle>
        {items.map((item, id) => (
          <BPListItem item={item} key={id} />
        ))}
        <MobileHidden>
          <Link href={isLoggedIn ? '/masterCabinet' : '/login'}>
            <Button size="medium" variant="red" font="medium" mt="36">
              Присоединиться
            </Button>
          </Link>
        </MobileHidden>
        <MobileVisible>
          <Link href={isLoggedIn ? '/masterCabinet' : '/login'}>
            <Button size="fullWidth" variant="red" font="popUp" mt="124">
              Присоединиться к платформе
            </Button>
          </Link>
        </MobileVisible>
        <MobileVisible>
          <RedArrow />
        </MobileVisible>
        <MobileHidden>
          <RedStar />
          <WaveVertical />
          <WhiteCircle />
        </MobileHidden>
      </BPContent>
    </BPWrapper>
  )
}

const BPListItem = ({ item }) => {
  const [toggleList, setToggleList] = useState(false)

  const toggleHandler = () => {
    setToggleList(!toggleList)
  }
  return (
    <>
      <BPItemWrap onClick={toggleHandler} toggle={toggleList}>
        <Plus toggle={toggleList} />
        <BPItem>{item.title}</BPItem>
      </BPItemWrap>
      {toggleList && <BPList toggle={toggleList}>{item.text}</BPList>}
    </>
  )
}

export default BusinessPossibilities
