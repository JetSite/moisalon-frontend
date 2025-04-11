import styled from 'styled-components';
import { useRouter } from 'next/router';
import { laptopBreakpoint } from '../../../../../styles/variables';
import Avatar from '../../../Form/Avatar';
import { getStoreEvent } from 'src/store/utils';
import useAuthStore from 'src/store/authStore';
import { FC } from 'react';
import { IControlsFormProps } from 'src/components/blocks/Form/Controls';
import Image from 'next/image';

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
`;

const Text = styled.p`
  margin-top: 50px;
  font-size: 18px;
  font-weight: 600;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

const TextRed = styled.button`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  line-height: 45px;
  cursor: pointer;
  color: #f03;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

const IconBack = styled.button`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    gap: 4px;
    position: absolute;
    font-weight: 600;
    left: 0;
    top: 44px;
    :hover {
      color: #f03;
    }
  }
`;

type Props = Omit<IControlsFormProps, 'tabs'>;

const Controls: FC<Props> = ({
  onAdd,
  setPhoto,
  photoType,
  photo,
  noSetPhoto = false,
  noPhotoError,
  setNoPhotoError,
}) => {
  // const dev = process.env.NEXT_PUBLIC_ENV !== 'production'

  const router = useRouter();
  const { logout } = useAuthStore(getStoreEvent);

  return (
    <Wrapper>
      <Avatar
        setPhoto={setPhoto}
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
          logout(router);
        }}
      >
        Выход
      </TextRed>
      <IconBack
        onClick={() => {
          logout(router);
        }}
      >
        <Image src="/icon-back.svg" alt="back" width={10} height={12} />
        Выход
      </IconBack>
    </Wrapper>
  );
};

export default Controls;
