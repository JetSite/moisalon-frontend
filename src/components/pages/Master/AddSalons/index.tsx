import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  SalonsContent,
  Title,
  SalonItemWrapper,
  Published,
  LoaderWrapper,
} from './styled'
import SalonItem from '../../../blocks/SalonCard'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import { getSalonsByName } from 'src/api/graphql/salon/queries/getSalonsByName'
import Search from './components/Search'
import SearchResults from './components/SearchResults'
import debounce from 'lodash/debounce';
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse';
import RotatingLoader from 'src/components/ui/RotatingLoader';

interface Props {
  master: IMaster
  salons: ISalon[]
  setSalons: Dispatch<SetStateAction<ISalon[]>>
}

const AddSalons: FC<Props> = ({ master, salons, setSalons }) => {
  const [dataSearch, setDataSearch] = useState<ISalon[]>([])
  const [inputValue, setInputValue] = useState('')
  const [debouncedInputValue, setDebouncedInputValue] = useState('')

  const { loading } = useQuery(getSalonsByName, {
    skip: !debouncedInputValue,
    variables: { name: debouncedInputValue },
    onCompleted: (data) => {
      if (data?.salons?.data) {
        const salons = flattenStrapiResponse(data.salons.data)
        setDataSearch(salons)
      }
    }
  })

  const debouncedSetInputValue = useCallback(
    debounce((value) => {
      setDebouncedInputValue(value);
    }, 500),
    []
  );

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedSetInputValue(value);
  };

  const handlePublish = useCallback(
    (ev: any, item: ISalon, published: boolean) => {
      ev.preventDefault()
      if (!published) {
        setSalons(prevState => [...prevState, item])
      } else {
        setSalons(prevState => prevState.filter(salon => salon.id !== item.id))
      }
    },
    [master],
  )

  console.log('dataSearch', dataSearch)

  const salonsListSearch = dataSearch?.map(item => {
    return (
      <SalonItemWrapper
        key={item?.id}
        onClick={e =>
          handlePublish(
            e,
            item,
            !!salons.find(salon => salon.id === item.id)
          )
        }
      >
        <SalonItem item={item} />
        <Published published={!!salons.find(salon => salon.id === item.id)} />
      </SalonItemWrapper>
    )
  })

  return (
    <SalonsContent>
      <Title>Добавить салоны</Title>
      <Search inputValue={inputValue} setInputValue={handleInputChange} />
      {inputValue.length > 0 ? (
        <>
          {loading ? <LoaderWrapper><RotatingLoader /></LoaderWrapper> : <SearchResults
            searchResults={salonsListSearch}
          />}
        </>
      ) : null}
    </SalonsContent>
  )
}

export default AddSalons
