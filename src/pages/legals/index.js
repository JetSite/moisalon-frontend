import MainLayout from "../../layouts/MainLayout"
import LegalsPage from "../../components/pages/LegalsPage"
import MainHead from "../MainHead"
import { Fragment } from "react"

const Legals = () => {
  return (
    <Fragment>
      <MainHead
        title="Правовая информация | MOI salon"
        description="Юридическая информация, условия использования и политика конфиденциальности MOI salon"
        image="/brands-page-bg.jpg"
      />
      <MainLayout>
        <LegalsPage />
      </MainLayout>
    </Fragment>
  )
}

export default Legals
