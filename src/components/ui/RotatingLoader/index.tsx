import React, { FC, useState } from 'react'
import { Spinner, Background, GlobalStyle } from './styles'

export interface ISpinner {
  background?: boolean
}

const RotatingLoader: FC<ISpinner> = ({ background = true }) => {
  return (
    <>
      {background ? (
        <>
          <GlobalStyle />
          <Background />
        </>
      ) : null}
      <Spinner background={background} />
    </>
  )
}

export default RotatingLoader
