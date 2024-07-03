import styled from 'styled-components'
import PhotoAddBlock from './PhotoField/PhotoAddBlock'
import { IPhoto } from 'src/types'
import { ISetState } from 'src/types/common'
import { FC } from 'react'

const Wrapper = styled.div`
  margin-bottom: 40px;
`

export interface IPhotoAddProps {
  defaultPhoto: IPhoto | null
  setDefaultPhoto: ISetState<IPhoto | null>
}

const DefaultPhoto: FC<IPhotoAddProps> = ({
  defaultPhoto,
  setDefaultPhoto,
}) => {
  return (
    <Wrapper>
      <PhotoAddBlock
        defaultPhoto={defaultPhoto}
        setDefaultPhoto={setDefaultPhoto}
      />
    </Wrapper>
  )
}

export default DefaultPhoto
