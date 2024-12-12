import { useState, FC } from 'react'
import Head from 'next/head'
import Catalog from '../../Catalog'
import Header from '../ViewBrand/components/Header'
import { Wrapper, MoreButtonWrapper } from './styles'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { IBrand } from 'src/types/brands'
import useAuthStore from 'src/store/authStore'
import { ICart, IProduct } from 'src/types/product'
import FilterCatalog from 'src/components/ui/FilterCatalog'
import { IPagination } from 'src/types'
import Button from 'src/components/newUI/buttons/Button'

export interface IBrandProductsPageProps {
  products: IProduct[]
  brand: IBrand
  pageSize: number
  pagination: IPagination
  cart: ICart | null
}

const BrandProductsPage: FC<IBrandProductsPageProps> = ({
  products,
  pageSize,
  brand,
  pagination: paginationInit,
  cart,
}) => {
  const { user } = useAuthStore(getStoreData)
  const isOwner = user?.owner.brands?.filter(e => e.id === brand.id)
  const [productsData, setProductsData] = useState<IProduct[]>(products)
  const [pagination, setPagination] = useState<IPagination>(paginationInit)
  const [loading, setLoading] = useState(false)
  const [nextPage, setNextPage] = useState<number>(1)

  return (
    <>
      {/* <Head>
        {brand?.seo?.title ? <title>{brand?.seo?.title}</title> : null}
        {brand?.seo?.description ? (
          <meta name="description" content={brand?.seo?.description} />
        ) : null}
        {brand?.photo?.url ? (
          <meta property="og:image" content={brand?.photo?.url} />
        ) : null}
      </Head> */}
      <Header isOwner={!!isOwner} brand={brand} />
      <Wrapper>
        <FilterCatalog
          nextPage={nextPage}
          setNextPage={setNextPage}
          setLoading={setLoading}
          pageSize={pageSize}
          brand={brand}
          setProductsData={setProductsData}
          setPagination={setPagination}
          noBrands
        />
      </Wrapper>
      <Catalog cart={cart} products={productsData} loading={loading} noTitle />
      {nextPage !== pagination.pageCount && pagination.pageCount !== 0 && (
        <MoreButtonWrapper>
          <Button
            disabled={loading}
            onClick={() => setNextPage(prev => prev + 1)}
            variant={'secondary'}
          >
            {loading ? 'Загрузка...' : 'Ещё'}
          </Button>
        </MoreButtonWrapper>
      )}
    </>
  )
}

export default BrandProductsPage
