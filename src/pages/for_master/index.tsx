import React, { Fragment } from 'react'
import MasterLanding from 'src/components/pages/MasterLanding'
import MainHead from '../MainHead'

const ForMaster = () => {
  return (
    <Fragment>
      <MainHead
        title="Для мастеров | MOI salon"
        description="MOI salon - платформа для мастеров красоты. Развивайте свои навыки, находите клиентов и продвигайте услуги"
        image="/masters-page-right.png"
      />
      <MasterLanding />
    </Fragment>
  )
}

export default ForMaster
