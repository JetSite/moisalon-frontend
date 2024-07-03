import React, { FC } from 'react'
import PhotoAdd from './PhotoAdd'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import { IPhotoAddProps } from '..'

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: ${laptopBreakpoint}) {
    justify-content: center;
  }
`

const PhotoAddBlock: FC<IPhotoAddProps> = ({
  defaultPhoto,
  setDefaultPhoto,
}) => {
  return (
    <Wrapper>
      <PhotoAdd defaultPhoto={defaultPhoto} setDefaultPhoto={setDefaultPhoto} />
    </Wrapper>
  )
}

export default PhotoAddBlock
