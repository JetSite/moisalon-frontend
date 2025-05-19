import SalonLanding from 'src/components/pages/SalonLanding'
import MainHead from '../MainHead'
import { Fragment } from 'react'

const ForSalon = () => {
  return (
    <Fragment>
      <MainHead
        title="Для салонов | MOI salon"
        description="MOI salon - платформа для салонов красоты. Продвигайте услуги, находите клиентов и развивайте свой бизнес"
        image="/salons-page-bg.jpg"
      />
      <SalonLanding />
    </Fragment>
  )
}

export default ForSalon
