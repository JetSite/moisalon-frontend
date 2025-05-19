import MainLayout from 'src/layouts/MainLayout'
import NotFound from '../components/pages/404'
import MainHead from './MainHead'
import { Fragment } from 'react'

const Custom404 = () => {
  return (
    <Fragment>
      <MainHead
        title="Страница не найдена | MOI salon"
        description="К сожалению, запрашиваемая страница не найдена на сайте MOI salon"
        image="/mobile-main-bg.jpg"
      />
      <MainLayout noMobileFooter>
        <NotFound />
      </MainLayout>
    </Fragment>
  )
}

export default Custom404
