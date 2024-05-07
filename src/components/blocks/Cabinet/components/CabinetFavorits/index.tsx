import { FC, useEffect, useState } from 'react'
import Tabs from './components/tabs'
import { Wrapper, Wrap, TitlePage, Top } from './styles'
import SalonsFavorites from '../../../../pages/FavoritesPage/SalonsFavorites'
import MastersFavorites from '../../../../pages/FavoritesPage/MastersFavorites'
import GoodsFavorites from '../../../../pages/FavoritesPage/GoodsFavorites'
import EducationsFavorites from '../../../../pages/FavoritesPage/EducationsFavorites'
import BrandsFavorites from '../../../../pages/FavoritesPage/BrandsFavorites'
import { useMedia } from 'use-media'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IMeThings } from 'src/types/me'

const CabinetFavorits: FC = () => {
  const { me } = useAuthStore(getStoreData)
  const [activeTab, setActiveTab] = useState<string>('all')
  const mobileMedia = useMedia({ maxWidth: 768 })

  const handleDeleted = () => {
    console.log('delete')
  }
  if (!me) return null

  const { salons, brand, masters, products, educations } =
    me.favorite as IMeThings

  useEffect(() => {
    if (salons.length) {
      setActiveTab('salons')
      return
    }
    if (brand.length) {
      setActiveTab('brands')
      return
    }
    if (masters.length) {
      setActiveTab('masters')
      return
    }
    if (products.length) {
      setActiveTab('products')
      return
    }
    if (educations.length) {
      setActiveTab('educations')
      return
    }
  }, [])

  console.log(me.favorite)

  return (
    <Wrapper>
      {!mobileMedia ? (
        <TitlePage>Моё избранное</TitlePage>
      ) : (
        <Top>
          <TitlePage>Моё избранное</TitlePage>
        </Top>
      )}
      <Tabs
        salons={salons}
        masters={masters}
        brands={brand}
        products={products}
        educations={educations}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 'salons' && !mobileMedia ? (
        <SalonsFavorites
          handleDeleted={handleDeleted}
          cabinet
          setActiveTab={setActiveTab}
        />
      ) : null}
      {activeTab === 'masters' && !mobileMedia ? (
        <MastersFavorites
          handleDeleted={handleDeleted}
          cabinet
          setActiveTab={setActiveTab}
        />
      ) : null}
      {activeTab === 'brands' && !mobileMedia ? (
        <BrandsFavorites
          handleDeleted={handleDeleted}
          cabinet
          setActiveTab={setActiveTab}
        />
      ) : null}
      {activeTab === 'products' && !mobileMedia ? (
        <GoodsFavorites handleDeleted={handleDeleted} cabinet />
      ) : null}
      {activeTab === 'educations' && !mobileMedia ? (
        <EducationsFavorites handleDeleted={handleDeleted} cabinet />
      ) : null}
      {activeTab === 'all' && !mobileMedia ? (
        <>
          <SalonsFavorites
            title="Избранные салоны"
            setActiveTab={setActiveTab}
            handleDeleted={handleDeleted}
            cabinet
          />
          <Wrap>
            <MastersFavorites
              title="Избранные мастера"
              setActiveTab={setActiveTab}
              handleDeleted={handleDeleted}
              cabinet
            />
          </Wrap>
          <Wrap>
            <BrandsFavorites
              title="Избранные бренды"
              setActiveTab={setActiveTab}
              handleDeleted={handleDeleted}
              cabinet
            />
          </Wrap>
          <Wrap>
            <GoodsFavorites
              title="Избранные продукты"
              setActiveTab={setActiveTab}
              handleDeleted={handleDeleted}
              cabinet
            />
          </Wrap>
          <Wrap>
            <EducationsFavorites
              title="Избранные обучения"
              setActiveTab={setActiveTab}
              handleDeleted={handleDeleted}
              cabinet
            />
          </Wrap>
        </>
      ) : null}
      {mobileMedia ? (
        <>
          <SalonsFavorites
            mobile={mobileMedia}
            setActiveTab={setActiveTab}
            title="Избранные салоны"
            cabinet
          />
          <MastersFavorites
            mobile={mobileMedia}
            setActiveTab={setActiveTab}
            title="Избранные мастера"
            cabinet
          />
          <BrandsFavorites
            setActiveTab={setActiveTab}
            mobile={mobileMedia}
            title="Избранные бренды"
            cabinet
          />
          <GoodsFavorites
            mobile={mobileMedia}
            title="Избранные продукты"
            cabinet
          />
          <EducationsFavorites
            mobile={mobileMedia}
            title="Избранные обучения"
            cabinet
          />
        </>
      ) : null}
    </Wrapper>
  )
}

export default CabinetFavorits