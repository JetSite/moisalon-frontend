import { useState, FC } from 'react';
import Header from '../../pages/MainPage/components/Header';
import { MainContainer, Wrapper } from './styled';
import CabinetForm, { CabinetFormProps } from './components/CabinetForm';
import { PHOTO_URL } from '../../../api/variables';
import { IPhoto } from 'src/types';
import Controls from './components/Controls';

type Props = Pick<CabinetFormProps, 'cities' | 'user'>;

const Cabinet: FC<Props> = ({ cities, user }) => {
  const [avatar, setAvatar] = useState<IPhoto | null>(
    user.info.avatar?.url ? user.info.avatar : null,
  );
  const [noPhotoError, setNoPhotoError] = useState(false);
  const [dirtyForm, setDirtyForm] = useState(false);

  return (
    <>
      <Header />
      <MainContainer>
        <Wrapper>
          <Controls
            setPhoto={setAvatar}
            photo={
              avatar ? { ...avatar, url: `${PHOTO_URL}${avatar?.url}` } : null
            }
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
            photoType="master"
          />
          <CabinetForm
            user={user}
            cities={cities}
            setDirtyForm={setDirtyForm}
            dirtyForm={dirtyForm}
            setNoPhotoError={setNoPhotoError}
            photo={avatar}
            auth
          />
        </Wrapper>
      </MainContainer>
    </>
  );
};

export default Cabinet;
