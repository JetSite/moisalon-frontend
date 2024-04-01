import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import Avatar from '../Avatar'
import Tabs from './components/Tabs'

const Wrapper = styled.div`
  max-width: 395px;
  width: 100%;
  position: sticky;
  top: 120px;
  height: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    position: initial;
    top: initial;
    height: initial;
    display: none;
  }
`

const ControlsTabs = ({
  id,
  onAdd,
  tabs,
  setPhotoId,
  photoType,
  photo,
  noSetPhoto = false,
  noPhotoError,
  setNoPhotoError,
  activeTab,
  setActiveTab,
}) => {
  return (
    <Wrapper>
      <Avatar
        setPhotoId={setPhotoId}
        id={id}
        photo={photo}
        onAdd={onAdd}
        photoType={photoType}
        noSetPhoto={noSetPhoto}
        noPhotoError={noPhotoError}
        setNoPhotoError={setNoPhotoError}
      />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </Wrapper>
  )
}

export default ControlsTabs
