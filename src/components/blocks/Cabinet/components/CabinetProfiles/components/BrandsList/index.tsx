import Link from 'next/link'
import { BrandsContent, MainTitle, ListWrapper, TextNoBrands } from './styles'
import BrandItem, { IHandlePublishBrand } from './BrandItem'
import { FC } from 'react'
import { IBrand } from 'src/types/brands'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

interface Props {
  brands: IBrand[]
  handlePublish: IHandlePublishBrand
}

const BrandsList: FC<Props> = ({ brands, handlePublish }) => {
  const { city } = useAuthStore(getStoreData)
  return (
    <BrandsContent>
      <MainTitle>Профиль: Бренды, с которыми я работаю</MainTitle>
      {brands.length > 0 ? (
        <ListWrapper heightLarge={!!brands.length}>
          {brands.map(brand => (
            <Link
              href={`/${brand.city.slug || city?.slug}/brand/${brand.id}`}
              key={brand.id}
            >
              <BrandItem
                brand={brand}
                brands={brands}
                handlePublish={handlePublish}
              />
            </Link>
          ))}
        </ListWrapper>
      ) : (
        <ListWrapper>
          <TextNoBrands>Нет брендов</TextNoBrands>
        </ListWrapper>
      )}

      {/* <Link href="/createBrand">
        <MobileHidden>
          <Button
            size="width374WithoutPadding"
            variant="darkTransparent"
            font="medium"
          >
            Добавить бренд
          </Button>
        </MobileHidden>
      </Link>
      <Link href="/createSalon">
        <MobileVisible>
          <Button size="fullWidth" variant="darkTransparent" font="small">
            Добавить бренд
          </Button>
        </MobileVisible>
      </Link> */}
    </BrandsContent>
  )
}

export default BrandsList
