import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { MainContainer } from '../../../../../styles/common'
import {
  Wrapper,
  Content,
  TitleWrapper,
  Title,
  SearchIcon,
  NoSearchResults,
} from './styled'
import Tabs from './components/Tabs'
import { red } from '../../../../../../styles/variables'
import Search from './icons/Search'
import RibbonSearch from './components/RibbonSearch'
import Slider from '../../../../blocks/Slider'

const Ribbon = ({ title, beautyCategories, beautyAllContent }) => {
  const [activeTab, setActiveTab] = useState('')
  const [categories, setCategories] = useState(null)
  const [allContent, setAllContent] = useState(null)
  const [categoryContent, setCategoryContent] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [fillSearch, setFillSearch] = useState('#797979')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (beautyCategories?.length > 0) {
      setCategories([{ id: '', feedCategoryName: 'Все' }, ...beautyCategories])
    }
    setAllContent(beautyAllContent)
  }, [])

  useEffect(() => {
    if (!activeTab) {
      setCategoryContent(null)
      return
    }
    const categoryContentData = beautyCategories.find(
      category => category.id === activeTab,
    )
    setCategoryContent(categoryContentData.feeds)
  }, [activeTab])

  useEffect(() => {
    if (searchQuery.length === 0) {
      setCategoryContent(null)
      return
    }
    setActiveTab(null)
    // refetchSearch({ query: searchQuery })
  }, [searchQuery])

  // const { refetch: refetchSearch } = useQuery(beautySearch, {
  //   context: { uri: 'https://moi.salon/graphql' },
  //   variables: {
  //     query: searchQuery,
  //   },
  //   skip: true,
  //   onCompleted: res => {
  //     setCategoryContent(res?.pagesSearch?.connection?.nodes)
  //   },
  // })

  const changeActiveTab = id => {
    setActiveTab(id !== activeTab ? id : null)
    setSearchQuery('')
  }

  const renderItems = categoryContent ? categoryContent : allContent

  return (
    <Wrapper>
      <MainContainer>
        <Content>
          <TitleWrapper>
            <Title>{title}</Title>
            {/* <SearchIcon
              onClick={() => setSearchOpen(!searchOpen)}
              onMouseEnter={() => setFillSearch(red)}
              onMouseLeave={() => setFillSearch('#797979')}
            >
              <Search fillSearch={fillSearch} searchOpen={searchOpen} />
            </SearchIcon> */}
          </TitleWrapper>
          {/* {searchOpen ? (
            <RibbonSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          ) : null} */}
          <Tabs
            activeTab={activeTab}
            changeActiveTab={changeActiveTab}
            tabs={categories}
          />
          {/* {searchQuery.length > 0 && renderItems.length === 0 ? (
            <NoSearchResults>
              По вашему запросу ничего не найдено
            </NoSearchResults>
          ) : null} */}
          <Slider
            type="ribbon"
            items={renderItems || []}
            title=""
            bgColor="#000"
            pb={30}
            pl={20}
            noPadding
          />
        </Content>
      </MainContainer>
    </Wrapper>
  )
}

export default Ribbon
