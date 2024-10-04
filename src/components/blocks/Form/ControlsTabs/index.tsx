import styled from 'styled-components'
import {
  laptopBreakpoint,
  largeLaptopBreakpoint,
} from '../../../../styles/variables'
import Avatar from '../Avatar'
import Tabs from './components/Tabs'
import { Dispatch, FC, SetStateAction } from 'react'
import { IID, ISetState } from 'src/types/common'
import { IMasterCabinetTab } from 'src/components/pages/Master/MasterCabinet'
import { IPhoto } from 'src/types'

const Wrapper = styled.section`
  width: 100%;
  max-width: 182px;
  position: sticky;
  top: 152px;
  padding-bottom: 200px;
  min-width: 182px;
  height: 100%;

  @media (min-width: ${largeLaptopBreakpoint}) {
    max-width: 395px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    position: initial;
    top: initial;
    height: initial;
    display: none;
  }
`

interface Props {
  id: IID | null
  onAdd?: (id: IID) => void
  tabs: IMasterCabinetTab[]
  setPhoto: ISetState<IPhoto | null>
  photoType: string
  photo: { url: string }
  noSetPhoto?: boolean
  noPhotoError: boolean
  setNoPhotoError: ISetState<boolean>
  activeTab: string
  setActiveTab: ISetState<string>
  dirtyForm: boolean
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
  dirtyForm,
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
      <Tabs
        dirtyForm={dirtyForm}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Wrapper>
  )
}

export default ControlsTabs
