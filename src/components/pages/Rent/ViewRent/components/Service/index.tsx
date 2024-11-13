import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import { MainContainer } from '../../../../../../styles/common'
import { FC } from 'react'
import { IGroupedCategories } from 'src/utils/getGrupedServices'
import { IService, IServiceCategories } from 'src/types/services'
import { IServices } from 'src/utils/serviceCatalog'

const Wrapper = styled.div`
  padding: 0 140px;
  padding-top: 70px;
  margin-bottom: 70px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px 56px 20px;
    margin-bottom: 0px;
    padding-bottom: 10px;
  }
`

const Title = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  padding-bottom: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    padding-bottom: 16px;
    padding-top: 16px;
  }
`

const Content = styled.div`
  width: 100%;
  border-top: 1px solid #a2a2a2;
  padding-top: 35px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
  }
`

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 32%;
  margin-bottom: 4px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-bottom: 10px;
  }
`

const Text = styled.p`
  font-size: 18px;
  margin-left: 8px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
  }
`

const Icon = styled.img``

interface Props {
  services: IServices[]
  title?: string
}

const Service: FC<Props> = ({ services, title = 'Сервис для посетителей' }) => {
  return (
    <MainContainer id="service">
      <Wrapper>
        <Title>{title}</Title>
        <Content>
          {services?.map(item => (
            <Item key={item.service.id}>
              <Icon src="/service-rent-icon.svg" />
              <Text>{item?.service.title}</Text>
            </Item>
          ))}
        </Content>
      </Wrapper>
    </MainContainer>
  )
}

export default Service
