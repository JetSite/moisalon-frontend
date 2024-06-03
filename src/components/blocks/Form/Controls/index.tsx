import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import Avatar from '../Avatar'
import Tabs from '../Tabs'
import { FC } from 'react'
import { ITab } from 'src/components/pages/Salon/CreateSalon/config'
import { IID, ISetState } from 'src/types/common'

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
  }
`

interface Props {
  tabs: ITab[]
  photoType: string
  refActive: string | boolean
  photo: { url: string } | null
  id: IID | null
  onAdd: () => void
  setPhotoId: ISetState<IID | null>
  noPhotoError: boolean
  setNoPhotoError: ISetState<boolean>
  noSetPhoto?: boolean
}

const Controls: FC<Props> = ({
  id,
  onAdd,
  refActive,
  tabs,
  setPhoto,
  photoType,
  photo,
  noSetPhoto = false,
  noPhotoError,
  setNoPhotoError,
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
      <Tabs refActive={refActive} tabs={tabs} />
    </Wrapper>
  )
}

export default Controls
