import MainLayout from 'src/layouts/MainLayout'
import NotFound from '../components/pages/404'

const Custom404 = () => {
  return (
    <MainLayout noMobileFooter>
      <NotFound />
    </MainLayout>
  )
}

export default Custom404
