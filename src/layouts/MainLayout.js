import Footer from '../components/blocks/Footer'
import Header from '../components/pages/MainPage/components/Header'

const MainLayout = ({ children, noMobileFooter = false }) => {
  return (
    <>
      <Header />
      {children}
      <Footer noMobileFooter={noMobileFooter} />
    </>
  )
}

export default MainLayout
