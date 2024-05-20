import { FC } from 'react'
import Footer from '../components/blocks/Footer'
import Header from '../components/pages/MainPage/components/Header'
import { IChildren } from 'src/types/common'

interface Props {
  children: IChildren
  noMobileFooter?: boolean
}

const MainLayout: FC<Props> = ({ children, noMobileFooter = false }) => {
  return (
    <>
      <Header />
      {children}
      <Footer noMobileFooter={noMobileFooter} />
    </>
  )
}

export default MainLayout
