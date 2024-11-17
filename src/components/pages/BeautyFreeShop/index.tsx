import { FC, useState } from 'react'
import Head from 'next/head'
import FilterCatalog from '../../ui/FilterCatalog'
import Catalog from '../Catalog'
import { ICart, IProduct, IProductCategories } from 'src/types/product'
import { IBrand } from 'src/types/brands'
import { IPagination } from 'src/types'
import Button from 'src/components/ui/Button'
import { Wrapper } from 'src/components/pages/Catalog/styled'

export interface IBeautyFreeShopPageProps {
  brands: IBrand[]
  dataProducts: IProduct[]
  dataProductCategories: IProductCategories[]
  pageSize: number
  pagination: IPagination
  cart: ICart | null
}

const BeautyFreeShopPage: FC<IBeautyFreeShopPageProps> = ({
  brands,
  dataProducts,
  dataProductCategories,
  pageSize,
  pagination: paginationInit,
  cart,
}) => {
  const [productsData, setProductsData] = useState<IProduct[]>(dataProducts)
  const [pagination, setPagination] = useState<IPagination>(paginationInit)
  const [loading, setLoading] = useState(false)
  const [nextPage, setNextPage] = useState<number>(1)

  return (
    <>
      {/* <Head>
        {brandData?.seo?.title ? <title>{brandData?.seo?.title}</title> : null}
        {brandData?.seo?.description ? (
          <meta name="description" content={brandData?.seo?.description} />
        ) : null}
        {brandData?.photo?.url ? (
          <meta property="og:image" content={brandData?.photo?.url} />
        ) : null}
      </Head> */}

      <Wrapper>
        <FilterCatalog
          nextPage={nextPage}
          setNextPage={setNextPage}
          setLoading={setLoading}
          pageSize={pageSize}
          brands={brands}
          setProductsData={setProductsData}
          productCategories={dataProductCategories}
          setPagination={setPagination}
        />
      </Wrapper>
      <Catalog products={productsData} loading={loading} noTitle cart={cart} />
      {nextPage !== pagination.pageCount && (
        <Wrapper>
          <Button
            onClick={() => setNextPage(prev => prev + 1)}
            variant={'secondary'}
          >
            Ещё
          </Button>
        </Wrapper>
      )}
    </>
  )
}

export default BeautyFreeShopPage
