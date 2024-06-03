import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import Avatar from '../Avatar'
import Tabs from './components/Tabs'
import { Dispatch, FC, SetStateAction } from 'react'
import { IID, ISetState } from 'src/types/common'
import { IMasterCabinetTab } from 'src/components/pages/Master/MasterCabinet'
import { IPhoto } from 'src/types'

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

interface Props {
  id: IID | null
  onAdd: (id: IID) => void
  tabs: IMasterCabinetTab[]
  setPhoto: (photo: IPhoto) => void
  photoType: string
  photo: { url: string }
  noSetPhoto?: boolean
  noPhotoError: boolean
  setNoPhotoError: ISetState<boolean>
  activeTab: string
  setActiveTab: ISetState<string>
}

const ControlsTabs: FC<Props> = ({
  id,
  onAdd,
  tabs,
  setPhoto,
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
        setPhoto={setPhoto}
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
