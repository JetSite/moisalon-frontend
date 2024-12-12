import { useState, useCallback, Dispatch, SetStateAction, FC } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { BrandsContent, Title, LoaderWrapper } from './styled'
import {
  BrandItemWrapper,
  Published,
} from '../../../blocks/Cabinet/components/CabinetProfiles/components/MasterBrands/styles'
import BrandItem from '../../../blocks/Cabinet/components/CabinetProfiles/components/BrandsList/BrandItem'
import { IBrand } from 'src/types/brands'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import debounce from 'lodash/debounce'
import { IMaster } from 'src/types/masters'
import Search from '../AddSalons/components/Search'
import RotatingLoader from 'src/components/ui/RotatingLoader'
import SearchResults from '../AddSalons/components/SearchResults'
import { BRANDS_BY_NAME } from 'src/api/graphql/brand/queries/getBrandsByName'
import { ISalon } from 'src/types/salon'

interface Props {
  entries: IMaster | ISalon
  brands: IBrand[]
  setBrands: Dispatch<SetStateAction<IBrand[]>>
}

const AddBrands: FC<Props> = ({ entries, brands, setBrands }) => {
  const [dataSearch, setDataSearch] = useState<IBrand[]>([])
  const [inputValue, setInputValue] = useState('')
  const [debouncedInputValue, setDebouncedInputValue] = useState('')

  const { loading } = useQuery(BRANDS_BY_NAME, {
    skip: !debouncedInputValue,
    variables: { name: debouncedInputValue },
    onCompleted: data => {
      if (data?.brands?.data) {
        const brands = flattenStrapiResponse(data.brands.data)
        setDataSearch(brands)
      }
    },
  })

  const debouncedSetInputValue = useCallback(
    debounce(value => {
      setDebouncedInputValue(value)
    }, 500),
    [],
  )

  const handleInputChange = (value: string) => {
    setInputValue(value)
    debouncedSetInputValue(value)
  }

  const handlePublish = useCallback(
    (ev: any, item: IBrand, published: boolean) => {
      ev.preventDefault()
      if (!published) {
        setBrands(prevState => [...prevState, item])
      } else {
        setBrands(prevState => prevState.filter(brand => brand.id !== item.id))
      }
    },
    [entries],
  )

  const brandsListSearch = dataSearch?.map(item => {
    return (
      <BrandItemWrapper
        key={item.id}
        onClick={e =>
          handlePublish(e, item, !!brands.find(brand => brand.id === item.id))
        }
      >
        <BrandItem brand={item} />
        <Published published={!!brands.find(brand => brand.id === item.id)} />
      </BrandItemWrapper>
    )
  })

  return (
    <BrandsContent>
      <Title>Добавить бренды</Title>
      <Search inputValue={inputValue} setInputValue={handleInputChange} />
      {inputValue.length > 0 ? (
        <>
          {loading ? (
            <LoaderWrapper>
              <RotatingLoader />
            </LoaderWrapper>
          ) : (
            <SearchResults searchResults={brandsListSearch} />
          )}
        </>
      ) : null}
    </BrandsContent>
  )
}

export default AddBrands
