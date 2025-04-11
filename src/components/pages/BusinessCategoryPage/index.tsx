import { useState, FC, ReactNode } from 'react';

import { Wrapper, Title, Content, List } from './styles';
import { MainContainer } from '../../../styles/common';
import SearchBlock from '../../blocks/SearchBlock';
import BackButton from '../../ui/BackButton';
import Vacancy from '../../blocks/Vacancy';
import SalesSearchResults from '../MainPage/components/SearchMain/SalesSearchResults';
import EducationsSearchResults from '../MainPage/components/SearchMain/EducationsSearchResults';
import EventsSearchResults from '../MainPage/components/SearchMain/EventsSearchResults';
import VacanciesSearchResults from '../MainPage/components/SearchMain/VacanciesSearchResults';
import { IEducation } from 'src/types/education';
import Education from 'src/components/blocks/Education';
import Event from 'src/components/blocks/Event';
import { IEvent } from 'src/types/event';
import Sale from 'src/components/blocks/Sale';
import { IPromotions } from 'src/types/promotions';
import { IVacancy } from 'src/types/vacancies';

const customProps: {
  [key: string]: {
    // query: any
    searchTitle?: string;
    searchResultsComponent?: ReactNode;
    variables?: { input: { query: string; searchWork: boolean } };
  };
} = {
  sales: {
    // query: salesSearch,
    searchTitle: 'Найти акции',
    searchResultsComponent: <SalesSearchResults />,
  },
  educations: {
    // query: educationSearch,
    searchTitle: 'Найти курсы',
    searchResultsComponent: <EducationsSearchResults />,
  },
  events: {
    // query: eventsSearch,
    searchTitle: 'Найти события',
    searchResultsComponent: <EventsSearchResults />,
  },
  vacancies: {
    // query: vacanciesSearch,
    searchTitle: 'Найти вакансии',
    searchResultsComponent: <VacanciesSearchResults />,
  },
  resume: {
    // query: masterSearchQuery,
    variables: { input: { query: '', searchWork: true } },
  },
};

const ListItem = ({
  type,
  item,
}: {
  type: string;
  item: IPromotions | IEducation | IEvent | IVacancy;
}) => {
  const renderSwitch = (type: string) => {
    let renderedItem: ReactNode = null;
    switch (type) {
      case 'sales': {
        renderedItem = <Sale item={item as IPromotions} noHover />;
        break;
      }
      case 'educations': {
        renderedItem = <Education item={item as IEducation} noHover />;
        break;
      }
      case 'events': {
        renderedItem = <Event item={item as IEvent} noHover />;
        break;
      }
      case 'vacancies': {
        renderedItem = <Vacancy item={item as IVacancy} noHover />;
        break;
      }
    }
    return renderedItem;
  };
  return <>{renderSwitch(type)}</>;
};

interface BusinessCategoryPageProps {
  type: string;
  title: string;
  data: Array<IPromotions | IEducation | IEvent | IVacancy>;
  link: string;
}

const BusinessCategoryPage: FC<BusinessCategoryPageProps> = ({
  type,
  title,
  data,
  link,
}) => {
  const [listData, setListData] = useState(data);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [, setLoading] = useState(false);
  const slicedList = listData;
  // const hasNextPage = listData?.connection?.pageInfo?.hasNextPage
  const query = { query: '' }; //TODO: query

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
              {slicedList?.map(
                (item: IPromotions | IEducation | IEvent | IVacancy) => (
                  <ListItem key={item.id} type={type} item={item} />
                ),
              )}
            </List>
            {/* {fetchMoreButton} */}
          </Content>
        )}
      </Wrapper>
    </>
  );
};

export default BusinessCategoryPage;
