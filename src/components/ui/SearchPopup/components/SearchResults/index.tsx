import { useState, useEffect, FC } from 'react'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { MainContainer } from '../../../../../styles/common'
import { Wrapper, Category, Title, List, ListItem, EmptyResult } from './styled'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import RotatingLoader from '../../../RotatingLoader'
import { cyrToTranslit } from '../../../../../utils/translit'
import { ISetState } from 'src/types/common'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IBrand } from 'src/types/brands'

interface Props {
  setShowSearchPopup: ISetState<boolean>
  query: any
}

const SearchResults: FC<Props> = ({ setShowSearchPopup, query }) => {
  const [masterSearchData, setMasterSearchData] = useState<IMaster[]>([])
  const [salonSearchData, setSalonSearchData] = useState<ISalon[]>([])
  const [salonRentSearchData, setSalonRentSearchData] = useState<ISalon[]>([])
  const [brandSearchData, setBrandSearchData] = useState<IBrand[]>([])
  const [masterLoading, setMasterLoading] = useState(false)
  const [salonLoading, setSalonLoading] = useState(false)
  const [salonRentLoading, setSalonRentLoading] = useState(false)
  const [brandLoading, setBrandLoading] = useState(false)
  const { city, me } = useAuthStore(getStoreData)

  // const { refetch: refetchMastersSearch } = useQuery(masterSearchQuery, {
  //   variables: {
  //     variables: {
  //       input: {
  //         query: (query && query.query) || '',
  //         city: city.slug,
  //       },
  //     },
  //   },
  //   skip: true,
  //   notifyOnNetworkStatusChange: true,
  //   onCompleted: res => {
  //     setMasterLoading(false)
  //     if (res) {
  //       setMasterSearchData(res.masterSearch.connection.nodes.slice(0, 8))
  //     }
  //   },
  // })

  let cityInStorage
  if (typeof window !== 'undefined') {
    cityInStorage = localStorage.getItem('citySalon')
  }
  const querySearch = {
    // ...EmptySearchQuery,
    query: (query && query.query) || '',
    lessor: false,
    city:
      me && me?.info && me?.info?.city
        ? me?.info?.city
        : cityInStorage
        ? cityInStorage
        : '',
  }
  const queryRentSearch = {
    // ...EmptySearchQuery,
    query: (query && query.query) || '',
    lessor: true,
    city:
      me && me?.info && me?.info?.city
        ? me?.info?.city
        : cityInStorage
        ? cityInStorage
        : '',
  }
  // const { refetch: refetchSalonsSearch } = useQuery(searchQuery, {
  //   variables: { input: querySearch },
  //   notifyOnNetworkStatusChange: true,
  //   skip: true,
  //   onCompleted: res => {
  //     setSalonLoading(false)
  //     if (res?.salonSearch) {
  //       setSalonSearchData(res.salonSearch.salonsConnection.nodes.slice(0, 8))
  //     }
  //   },
  // })

  // const { refetch: refetchSalonsRentSearch } = useQuery(searchQuery, {
  //   variables: { input: queryRentSearch },
  //   notifyOnNetworkStatusChange: true,
  //   skip: true,
  //   onCompleted: res => {
  //     setSalonRentLoading(false)
  //     if (res?.salonSearch) {
  //       setSalonRentSearchData(
  //         res.salonSearch.salonsConnection.nodes.slice(0, 8),
  //       )
  //     }
  //   },
  // })

  // const { refetch: refetchBrandsSearch } = useQuery(brandSearchQuery, {
  //   variables: {
  //     query: (query && query.query) || '',
  //   },
  //   skip: true,
  //   notifyOnNetworkStatusChange: true,
  //   onCompleted: res => {
  //     setBrandLoading(false)
  //     if (res) {
  //       setBrandSearchData(res.brandsSearch.connection.nodes.slice(0, 8))
  //     }
  //   },
  // })

  useEffect(() => {
    // setMasterLoading(true)
    // setBrandLoading(true)
    //   refetchMastersSearch({
    //     input: {
    //       query: (query && query.query) || '',
    //       cursor: null,
    //       city: city ? city : 'Москва',
    //     },
    //   })
    //   refetchBrandsSearch({
    //     variables: {
    //       query: (query && query.query) || '',
    //       cursor: null,
    //     },
    //   })
    // }, [query])
    // useEffect(() => {
    //   setSalonLoading(true)
    //   refetchSalonsSearch({
    //     variables: { input: querySearch },
    //   })
    // }, [querySearch?.query, querySearch?.city])
    // useEffect(() => {
    //   setSalonRentLoading(true)
    //   refetchSalonsRentSearch({
    //     variables: { input: querySearch },
    //   })
  }, [queryRentSearch?.query, queryRentSearch?.city])

  const clickItemHandler = () => {
    setShowSearchPopup(false)
  }

  return (
    <MainContainer>
      <Wrapper>
        {!masterLoading &&
        !salonLoading &&
        !brandLoading &&
        !salonRentLoading ? (
          <>
            <Category>
              <Title>Мастера</Title>
              <List>
                {masterSearchData?.length ? (
                  masterSearchData.map(master => (
                    <Link
                      key={master.name}
                      href={`/${master?.city.slug || city.slug}/master/${
                        master.id
                      }`}
                      passHref
                    >
                      <ListItem key={master.id} onClick={clickItemHandler}>
                        {master.name}
                      </ListItem>
                    </Link>
                  ))
                ) : (
                  <EmptyResult>Мастера не найдены</EmptyResult>
                )}
              </List>
            </Category>
            <Category>
              <Title>Салоны</Title>
              <List>
                {salonSearchData?.length && !salonLoading ? (
                  salonSearchData.map(salon => (
                    <Link
                      key={salon.id}
                      href={`/${salon.city.slug || city.slug}/salon/${
                        salon.id
                      }`}
                      passHref
                    >
                      <ListItem key={salon.id}>{salon.name}</ListItem>
                    </Link>
                  ))
                ) : (
                  <EmptyResult>Салоны не найдены</EmptyResult>
                )}
              </List>
            </Category>
            <Category>
              <Title>Аренда</Title>
              <List>
                {salonRentSearchData?.length && !salonRentLoading ? (
                  salonRentSearchData.map(salon => (
                    <Link
                      key={salon.id}
                      href={`/${salon.city.slug || city.slug}/rent/${salon.id}`}
                      passHref
                    >
                      <ListItem key={salon.id}>{salon.name}</ListItem>
                    </Link>
                  ))
                ) : (
                  <EmptyResult>
                    Салоны, сдающие места в аренду не найдены
                  </EmptyResult>
                )}
              </List>
            </Category>
            <Category>
              <Title>Бренды</Title>
              <List>
                {brandSearchData?.length && !brandLoading ? (
                  brandSearchData.map(brand => (
                    <Link
                      key={brand.name}
                      href={`/${brand.city.slug || city.slug}/brand/${
                        brand.id
                      }`}
                      passHref
                    >
                      <ListItem key={brand.id}>{brand.name}</ListItem>
                    </Link>
                  ))
                ) : (
                  <EmptyResult>Бренды не найдены</EmptyResult>
                )}
              </List>
            </Category>
          </>
        ) : (
          <RotatingLoader />
        )}
      </Wrapper>
    </MainContainer>
  )
}

export default SearchResults
