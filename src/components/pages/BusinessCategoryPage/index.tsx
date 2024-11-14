import { useState, useCallback, FC, ReactNode } from 'react'
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
import Vacancy from '../../blocks/Vacancy'
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
import Event from 'src/components/blocks/Event'
import { IEvent } from 'src/types/event'
import { ISale } from 'src/types/sale'
import Sale from 'src/components/blocks/Sale'
import { IPromotions } from 'src/types/promotions'

const customProps: {
  [key: string]: {
    query: any
    searchTitle?: string
    searchResultsComponent?: ReactNode
    variables?: { input: { query: string; searchWork: boolean } }
  }
} = {
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
        const itemSale = item as IPromotions

        return (
          <Link shallow href={`/sales/${itemSale.id}`} passHref>
            <Sale item={itemSale} noHover />
          </Link>
        )
      case 'educations':
        const itemEducation = item as IEducation

        return (
          <Link shallow href={`/educations/${item.id}`} passHref>
            <Education
              id={itemEducation.id}
              title={itemEducation.title}
              averageScore={itemEducation.averageScore}
              numberScore={itemEducation.numberScore}
              amount={itemEducation.amount}
              photo={itemEducation.cover}
              dateStart={itemEducation.dateStart}
              dateEnd={itemEducation.dateEnd}
            />
          </Link>
        )
      case 'events':
        const itemEvent = item as IEvent

        return (
          <Link shallow href={`/events/${itemEvent.id}`} passHref>
            <Event
              title={itemEvent.title}
              address={itemEvent.address}
              photo={itemEvent.cover}
              dateStart={itemEvent.dateStart}
              dateEnd={itemEvent.dateEnd}
            />
          </Link>
        )
      case 'vacancies':
        return (
          <Link shallow href={`/vacancies/${item.id}`} passHref>
            <Vacancy item={item} />
          </Link>
        )
      default:
        return null
    }
  }
  return <>{renderSwitch(type)}</>
}

interface BusinessCategoryPageProps {
  type: string
  title: string
  data: any
  link: string
}

const BusinessCategoryPage: FC<BusinessCategoryPageProps> = ({
  type,
  title,
  data,
  link,
}) => {
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
              {slicedList?.map((item: any) => (
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
