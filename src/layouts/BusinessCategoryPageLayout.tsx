import Footer from '../components/blocks/Footer'
import Header from '../components/pages/MainPage/components/Header'
import About from '../components/pages/MainPage/components/About'
import { FC } from 'react'

interface BusinessCategoryPageLayoutProps {
  children: React.ReactNode
  loading: boolean
}

const BusinessCategoryPageLayout: FC<BusinessCategoryPageLayoutProps> = ({
  children,
  loading,
}) => {
  return (
    <>
      <Header loading={loading} />
      {children}
      <About />
      <Footer />
    </>
  )
}

export default BusinessCategoryPageLayout
