import styled from 'styled-components'
import PhotoArrayField from './PhotoArrayField'
import { IPhoto } from 'src/types'

const Wrapper = styled.div`
  margin-bottom: 40px;
`

const PhotoGallery = ({ photos }: { photos: IPhoto[] }) => {
  const photoArrayProps = {
    photoType: 'salonPhoto',
    kind: 'small',
    photos,
  }
  return (
    <Wrapper>
      <PhotoArrayField {...photoArrayProps} />
    </Wrapper>
  )
}

export default PhotoGallery
