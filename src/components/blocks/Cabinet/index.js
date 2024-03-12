import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import Controls from "./components/Controls";
import Header from "../../pages/MainPage/components/Header";
import { MainContainer, Wrapper } from "./styled";
import { updateMasterPhotoMutation } from "../../../_graphql-legacy/master/updateMasterPhotoMutation";
import CabinetForm from "./components/CabinetForm";
import { PHOTO_URL } from "../../../../variables";

const Cabinet = ({ refetch, currentMe }) => {
  const [photoId, setPhotoId] = useState(null);
  const [noPhotoError, setNoPhotoError] = useState(false);

  const [updateMasterPhoto] = useMutation(updateMasterPhotoMutation);
  const onAdd = useCallback(
    (photoId) => {
      updateMasterPhoto({ variables: { input: { photoId } } });
    },
    [updateMasterPhoto]
  );

  return (
    <>
      <Header />
      <MainContainer>
        <Wrapper>
          <Controls
            photo={
              photoId
                ? {
                    url: `${PHOTO_URL}${photoId}/original`,
                  }
                : null
            }
            id={null}
            photoType="master"
            setPhotoId={setPhotoId}
            onAdd={onAdd}
            noPhotoError={noPhotoError}
            setNoPhotoError={setNoPhotoError}
          />
          <CabinetForm
            setNoPhotoError={setNoPhotoError}
            photoId={photoId}
            refetch={refetch}
            currentMe={currentMe}
          />
        </Wrapper>
      </MainContainer>
    </>
  );
};

export default Cabinet;
