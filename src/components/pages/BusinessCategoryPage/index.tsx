import { useState, useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'
import { Wrapper, Title, Content, List } from './styles'
import {
  MobileVisible,
  MobileHidden,
  MainContainer,
} from '../../../styles/common'
import SearchBlock from '../../blocks/SearchBlock'
import BackButton from '../../ui/BackButton'
import Button from '../../ui/Button'
import Sale from '../../blocks/Sale'
import Vacancy from '../../blocks/Vacancy'
import Event from '../../blocks/Event'
import { salesSearch } from '../../../_graphql-legacy/sales/salesSearch'
import { educationSearch } from '../../../_graphql-legacy/education/educationSearch'
import { eventsSearch } from '../../../_graphql-legacy/events/eventsSearch'
import { vacanciesSearch } from '../../../_graphql-legacy/vacancies/vacanciesSearch'
import { masterSearchQuery } from '../../../_graphql-legacy/search/masterSearch'
import SalesSearchResults from '../MainPage/components/SearchMain/SalesSearchResults'
import EducationsSearchResults from '../MainPage/components/SearchMain/EducationsSearchResults'
import EventsSearchResults from '../MainPage/components/SearchMain/EventsSearchResults'
import VacanciesSearchResults from '../MainPage/components/SearchMain/VacanciesSearchResults'
import { IEducation } from 'src/types/education'
import Education from 'src/components/blocks/Education'

const customProps = {
  sales: {
    query: salesSearch,
    searchTitle: 'Найти акции',
    searchResultsComponent: <SalesSearchResults />,
  },
  educations: {
    query: educationSearch,
    searchTitle: 'Найти курсы',
    searchResultsComponent: <EducationsSearchResults />,
  },
  events: {
    query: eventsSearch,
    searchTitle: 'Найти события',
    searchResultsComponent: <EventsSearchResults />,
  },
  vacancies: {
    query: vacanciesSearch,
    searchTitle: 'Найти вакансии',
    searchResultsComponent: <VacanciesSearchResults />,
  },
  resume: {
    query: masterSearchQuery,
    variables: { input: { query: '', searchWork: true } },
  },
}

const ListItem = ({ type, item }: { type: string; item: any }) => {
  const renderSwitch = (type: string) => {
    switch (type) {
      case 'sales':
        return (
          <Link href={`/sales/${item.id}`} passHref>
            <Sale item={item} />
          </Link>
        )
      case 'educations':
        const itemData = item as IEducation

        return (
          <Link href={`/educations/${item.id}`} passHref>
            <Education
              id={itemData.id}
              title={itemData.title}
              averageScore={itemData.averageScore}
              numberScore={itemData.numberScore}
              amount={+itemData.amount}
              photo={itemData.cover}
              dateStart={itemData.dateStart}
              dateEnd={itemData.dateEnd}
            />
          </Link>
        )
      case 'events':
        return (
          <Link href={`/events/${item.id}`} passHref>
            <Event
              title={item.title}
              address={item.address}
              photoId={item.photoId}
              dateStart={item.dateStart}
              dateEnd={item.dateEnd}
            />
          </Link>
        )
      case 'vacancies':
        return (
          <Link href={`/vacancies/${item.id}`} passHref>
            <Vacancy
              id={item.id}
              title={item.title}
              photos={item.cover}
              amountFrom={item.amountFrom}
              amountTo={item.amountTo}
            />
          </Link>
        )
      default:
        return null
    }
  }
  return <>{renderSwitch(type)}</>
}

const BusinessCategoryPage = ({ type, title, data, link }) => {
  const [listData, setListData] = useState(data)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  const [, setLoading] = useState(false)
  const slicedList = listData
  // const hasNextPage = listData?.connection?.pageInfo?.hasNextPage
  const query = { query: '' } //TODO: query

  // const { fetchMore } = useQuery(customProps[type].query, {
  //   variables: customProps[type]?.variables || {
  //     query: '',
  //   },
  //   notifyOnNetworkStatusChange: true,
  //   skip: true,
  //   onCompleted: res => {
  //     setLoading(false)
  //     if (
  //       res?.salesSearch ||
  //       res?.educationSearch ||
  //       res?.eventsSearch ||
  //       res?.vacanciesSearch
  //     ) {
  //       setListData(
  //         res.salesSearch ||
  //           res.educationSearch ||
  //           res.eventsSearch ||
  //           res.vacanciesSearch,
  //       )
  //     }
  //   },
  // })

  // const onFetchMore = useCallback(() => {
  //   setFetchMoreLoading(true)
  //   fetchMore({
  //     variables: {
  //       query: '',
  //       cursor: listData?.connection?.pageInfo?.endCursor,
  //     },

  //     updateQuery({ fetchMoreResult }) {
  //       const newNodes = fetchMoreResult.salesSearch?.connection?.nodes

  //       setFetchMoreLoading(false)
  //       setListData({
  //         connection: {
  //           ...fetchMoreResult.salesSearch?.connection,
  //           nodes: [...listData?.connection?.nodes, ...newNodes],
  //         },
  //         filterDefinition: fetchMoreResult.salesSearch.filterDefinition,
  //       })
  //     },
  //   })
  // })

  // const fetchMoreButton = hasNextPage ? (
  //   <>
  //     <MobileHidden>
  //       <Button
  //         onClick={onFetchMore}
  //         size="medium"
  //         variant="darkTransparent"
  //         mt="60"
  //         disabled={fetchMoreLoading}
  //       >
  //         Показать еще
  //       </Button>
  //     </MobileHidden>
  //     <MobileVisible>
  //       <Button
  //         size="roundSmall"
  //         variant="withRoundBorder"
  //         font="roundSmall"
  //         mb="56"
  //         onClick={onFetchMore}
  //         disabled={fetchMoreLoading}
  //       >
  //         Показать еще
  //       </Button>
  //     </MobileVisible>
  //   </>
  // ) : null

  return (
    <>
      <SearchBlock title={customProps[type].searchTitle} />
      <Wrapper>
        <MainContainer>
          <BackButton type="Бизнес" name={title} link={link} />
        </MainContainer>
        {query?.query?.length === 0 ? <Title>{title}</Title> : null}
        {query?.query?.length > 0 ? (
          <Content>{customProps[type].searchResultsComponent}</Content>
        ) : (
          <Content>
            <List type={type}>
              {slicedList?.map(item => (
                <ListItem key={item.id} type={type} item={item} />
              ))}
            </List>
            {/* {fetchMoreButton} */}
          </Content>
        )}
      </Wrapper>
    </>
  )
}

export default BusinessCategoryPage
