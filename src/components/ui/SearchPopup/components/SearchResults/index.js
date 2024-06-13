import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'
import { MainContainer } from '../../../../../styles/common'
import { Wrapper, Category, Title, List, ListItem, EmptyResult } from './styled'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { masterSearchQuery } from '../../../../../_graphql-legacy/search/masterSearch'
;('../../../../../_graphql-legacy/search/searchQuery')
import { brandSearchQuery } from '../../../../../_graphql-legacy/search/brandSearch'
import RotatingLoader from '../../../../ui/RotatingLoader'
import { cyrToTranslit } from '../../../../../utils/translit'

const SearchResults = ({ setShowSearchPopup, query }) => {
  const [masterSearchData, setMasterSearchData] = useState(null)
  const [salonSearchData, setSalonSearchData] = useState(null)
  const [salonRentSearchData, setSalonRentSearchData] = useState(null)
  const [brandSearchData, setBrandSearchData] = useState(null)
  const [masterLoading, setMasterLoading] = useState(false)
  const [salonLoading, setSalonLoading] = useState(false)
  const [salonRentLoading, setSalonRentLoading] = useState(false)
  const [brandLoading, setBrandLoading] = useState(false)
  const { city, me } = useAuthStore(getStoreData)

  const { refetch: refetchMastersSearch } = useQuery(masterSearchQuery, {
    variables: {
      variables: {
        input: {
          query: (query && query.query) || '',
          city: city.slug,
        },
      },
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      setMasterLoading(false)
      if (res) {
        setMasterSearchData(res.masterSearch.connection.nodes.slice(0, 8))
      }
    },
  })

  let cityInStorage
  if (typeof window !== 'undefined') {
    cityInStorage = localStorage.getItem('citySalon')
  }
  const querySearch = {
    ...EmptySearchQuery,
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
    ...EmptySearchQuery,
    query: (query && query.query) || '',
    lessor: true,
    city:
      me && me?.info && me?.info?.city
        ? me?.info?.city
        : cityInStorage
        ? cityInStorage
        : '',
  }
  const { refetch: refetchSalonsSearch } = useQuery(searchQuery, {
    variables: { input: querySearch },
    notifyOnNetworkStatusChange: true,
    skip: true,
    onCompleted: res => {
      setSalonLoading(false)
      if (res?.salonSearch) {
        setSalonSearchData(res.salonSearch.salonsConnection.nodes.slice(0, 8))
      }
    },
  })

  const { refetch: refetchSalonsRentSearch } = useQuery(searchQuery, {
    variables: { input: queryRentSearch },
    notifyOnNetworkStatusChange: true,
    skip: true,
    onCompleted: res => {
      setSalonRentLoading(false)
      if (res?.salonSearch) {
        setSalonRentSearchData(
          res.salonSearch.salonsConnection.nodes.slice(0, 8),
        )
      }
    },
  })

  const { refetch: refetchBrandsSearch } = useQuery(brandSearchQuery, {
    variables: {
      query: (query && query.query) || '',
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      setBrandLoading(false)
      if (res) {
        setBrandSearchData(res.brandsSearch.connection.nodes.slice(0, 8))
      }
    },
  })

  useEffect(() => {
    setMasterLoading(true)
    setBrandLoading(true)

    refetchMastersSearch({
      input: {
        query: (query && query.query) || '',
        cursor: null,
        city: city ? city : 'Москва',
      },
    })
    refetchBrandsSearch({
      variables: {
        query: (query && query.query) || '',
        cursor: null,
      },
    })
  }, [query])

  useEffect(() => {
    setSalonLoading(true)
    refetchSalonsSearch({
      variables: { input: querySearch },
    })
  }, [querySearch?.query, querySearch?.city])

  useEffect(() => {
    setSalonRentLoading(true)
    refetchSalonsRentSearch({
      variables: { input: querySearch },
    })
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
                {masterSearchData?.length && !masterLoading ? (
                  masterSearchData.map(master => (
                    <Link
                      href={`/${
                        cyrToTranslit(master?.addressFull?.city) || city.slug
                      }/master/${master.id}`}
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
                      href={`/${
                        cyrToTranslit(salon?.salon?.address?.city) || city.slug
                      }/salon/${salon?.salon?.id}`}
                      passHref
                    >
                      <ListItem key={salon.salon.id}>
                        {salon.salon.name}
                      </ListItem>
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
                      href={`/${
                        cyrToTranslit(salon?.salon?.address?.city) || city.slug
                      }/rent/${salon?.salon?.id}`}
                      passHref
                    >
                      <ListItem key={salon.salon.id}>
                        {salon.salon.name}
                      </ListItem>
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
                      href={`/${
                        cyrToTranslit(brand?.addressFull?.city) || city.slug
                      }/brand/${brand.id}`}
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
