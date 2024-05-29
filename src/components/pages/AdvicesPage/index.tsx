import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import MobileViewCards from '../MainPage/components/MobileViewCards'
import NavigationList from './components/NavigationList'
import AdvicesList from './components/AdvicesList'
import FullAdvice from './components/AdvicesList/FullAdvice'
import { Wrapper, Navigation, Title, Content } from './styles'
import { getFeedCategory } from 'src/api/graphql/feed/queries/getFeedCategory'

interface Props {
  categories: any
  allAdvices: any
  totalCount: any
  trends?: boolean
  beauty?: boolean
}

const AdvicesPage = ({
  categories,
  allAdvices,
  totalCount,
  trends = false,
  beauty = false,
}: Props) => {
  const router = useRouter()
  const [categoryClicked, setCategoryClicked] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [adviceClicked, setAdviceClicked] = useState<string | null>('')
  const [categoryAdvicesData, setCategoryAdvicesData] = useState(null)

  useEffect(() => {
    if (router.query.category && router.query.item) {
      setCategoryClicked(router.query.category as string)
      setAdviceClicked(router.query.item as string)
    }
    // if (trends) {
    //   setCategoryClicked('62976959ebbea30001eedad4')
    // }
    // if (beauty) {
    //   setCategoryClicked('61f31ea605670f0001637539')
    // }
  }, [])

  const { refetch: refetchAdvices } = useQuery(getFeedCategory, {
    skip: !categoryClicked,
    variables: { id: categoryClicked },
    onCompleted: res => {
      setLoading(false)
      setCategoryAdvicesData(res)
    },
  })

  useEffect(() => {
    if (!categoryClicked) return
    setCategoryAdvicesData(null)
    refetchAdvices({ id: categoryClicked })
  }, [categoryClicked])

  const categoryAdvices = categoryAdvicesData?.feedCategory?.data?.attributes
    ?.feeds?.data?.length
    ? categoryAdvicesData.feedCategory.data.attributes.feeds.data
    : []
  const renderItems = categoryClicked?.length
    ? categoryAdvices
    : allAdvices?.data

  const backHandler = () => {
    setCategoryClicked('')
    setAdviceClicked('')
  }

  const changeCategory = (e: any) => {
    if (e) {
      setLoading(true)
    }
    setCategoryClicked(e)
  }

  return (
    <MainLayout>
      <MobileViewCards totalCount={totalCount} />
      <MainContainer>
        <Wrapper>
          <Navigation>
            <Title>Новости</Title>
            <NavigationList
              loading={loading}
              categories={categories}
              categoryAdvices={categoryAdvices}
              categoryClicked={categoryClicked}
              setCategoryClicked={changeCategory}
              adviceClicked={adviceClicked}
              setAdviceClicked={setAdviceClicked}
            />
          </Navigation>
          <Content>
            {!categoryClicked?.length && !adviceClicked?.length && !loading ? (
              <AdvicesList
                items={!loading ? renderItems : []}
                adviceClicked={adviceClicked}
                setCategoryClicked={changeCategory}
                setAdviceClicked={setAdviceClicked}
              />
            ) : null}
            {categoryClicked?.length && !adviceClicked?.length && !loading ? (
              <AdvicesList
                items={!loading ? renderItems : []}
                adviceClicked={adviceClicked}
                setCategoryClicked={setCategoryClicked}
                setAdviceClicked={setAdviceClicked}
              />
            ) : null}
            {!!adviceClicked ? (
              <FullAdvice
                backHandler={backHandler}
                adviceClicked={adviceClicked}
              />
            ) : null}
          </Content>
        </Wrapper>
      </MainContainer>
    </MainLayout>
  )
}

export default AdvicesPage
