import { FC } from 'react'
import Footer from '../components/blocks/Footer'
import Header from '../components/pages/MainPage/components/Header'
import { IChildren } from 'src/types/common'
import styled from 'styled-components'

interface Props {
  children: IChildren
  noMobileFooter?: boolean
}

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Минимальная высота на весь экран

  header {
    flex-shrink: 0; // Хедер занимает свою высоту
  }

  footer {
    flex-shrink: 0; // Футер занимает свою высоту
  }

  main {
    flex-grow: 1; // Основной контент занимает всё оставшееся пространство
    display: flex; // Добавляем flexbox для управления содержимым
    flex-direction: column; // Содержимое в колонку
  }
`

const MainLayout: FC<Props> = ({ children, noMobileFooter = false }) => {
  return (
    <PageWrapper>
      <Header />
      <main>{children}</main>
      <Footer noMobileFooter={noMobileFooter} />
    </PageWrapper>
  )
}

export default MainLayout
