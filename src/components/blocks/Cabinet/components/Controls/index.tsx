import styled from 'styled-components'
import { useRouter } from 'next/router'
import { laptopBreakpoint } from '../../../../../styles/variables'
import Avatar from '../../../Form/Avatar'
import { useQuery } from '@apollo/client'
import { currentUserSalonsAndMasterQuery } from '../../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import { cyrToTranslit } from '../../../../../utils/translit'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const Wrapper = styled.div`
  max-width: 395px;
  width: 100%;
  position: sticky;
  top: 120px;
  height: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    position: relative;
    top: initial;
    height: initial;
    max-width: 100%;
  }
`

const Text = styled.p`
  margin-top: 50px;
  font-size: 18px;
  font-weight: 600;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

const TextRed = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  line-height: 45px;
  cursor: pointer;
  color: #f03;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

const IconBack = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    background: url('/icon-back.svg') no-repeat center;
    width: 10px;
    height: 12px;
    position: absolute;
    left: 0;
    top: 44px;
  }
`

const Controls = ({
  id,
  onAdd,
  setPhotoId,
  photoType,
  photo,
  noSetPhoto = false,
  noPhotoError,
  setNoPhotoError,
}) => {
  const dev = process.env.NEXT_PUBLIC_ENV !== 'production'

  const router = useRouter()
  const { logout } = useAuthStore(getStoreEvent)

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
      <Text>Мои данные</Text>
      <TextRed
        onClick={() => {
          logout(router)
        }}
      >
        Выход
      </TextRed>
      <IconBack
        onClick={() => {
          logout(router)
        }}
      />
    </Wrapper>
  )
}

export default Controls
