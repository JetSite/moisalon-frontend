import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../styles/variables'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 40px;
  column-gap: 19px;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

const Tab = styled.div`
  display: flex;
  width: 100%;
  border: ${props =>
    props.active
      ? '1px solid #f03'
      : props.disabled
      ? '1px solid #e2e2e2'
      : '1px solid #000000'};
  border-radius: 50px;
  width: 217px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 20px;
  background: ${props => (props.active ? '#f03' : '#fff')};
  color: ${props =>
    props.active ? '#fff' : props.disabled ? '#e2e2e2' : '#000'};
  :hover {
    border: ${props =>
      props.disabled ? '1px solid #e2e2e2' : '1px solid #f03'};
    background: ${props => (props.disabled ? '#fff' : '#f03')};
    color: ${props => (props.disabled ? '#e2e2e2' : '#fff')};
  }
`

const Tabs = ({
  salons,
  activeTab,
  setActiveTab,
  masters,
  brands,
  products,
  educations,
}) => {
  return (
    <Wrapper>
      <Tab
        disabled={!salons?.length}
        active={activeTab === 'salons'}
        onClick={() => salons?.length && setActiveTab('salons')}
      >
        Салоны {!!salons?.length && `(${salons?.length})`}
      </Tab>
      <Tab
        disabled={!masters?.length}
        active={activeTab === 'masters'}
        onClick={() => masters?.length && setActiveTab('masters')}
      >
        Мастера {!!masters?.length && `(${masters?.length})`}
      </Tab>
      <Tab
        disabled={!brands?.length}
        active={activeTab === 'brands'}
        onClick={() => brands?.length && setActiveTab('brands')}
      >
        Бренды {!!brands?.length && `(${brands?.length})`}
      </Tab>
      <Tab
        disabled={!products?.length}
        active={activeTab === 'products'}
        onClick={() => products?.length && setActiveTab('products')}
      >
        Продукты {!!products?.length && `(${products?.length})`}
      </Tab>
      <Tab
        disabled={!educations?.length}
        active={activeTab === 'educations'}
        onClick={() => educations?.length && setActiveTab('educations')}
      >
        Обучение {!!educations?.length && `(${educations?.length})`}
      </Tab>
      <Tab
        disabled={
          !products?.length &&
          !brands?.length &&
          !masters?.length &&
          !salons?.length &&
          !educations?.length
        }
        active={activeTab === 'all'}
        onClick={() => {
          if (
            products?.length ||
            brands?.length ||
            salons?.length ||
            masters?.length ||
            educations?.length
          ) {
            setActiveTab('all')
          }
        }}
      >
        Все
      </Tab>
    </Wrapper>
  )
}

export default Tabs
