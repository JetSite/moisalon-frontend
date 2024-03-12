import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import NewMessagePopup from "./components/NewMessagePopup";
import Button from "../../ui/Button";
import Popup from "../Popup";
import { createRoom } from "../../../_graphql-legacy/chat/createRoom";
import { createMessage } from "../../../_graphql-legacy/chat/createMessage";

const ChatMessagePopup = ({
  open,
  setChatMessagePopup,
  me,
  userId,
  buttonText = "Написать",
  successText = "Ваше сообщение отправлено",
  origin,
  originData,
}) => {
  const { push } = useRouter();
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

  const handleClosePopup = useCallback(() => {
    setChatMessagePopup(false);
  }, [setChatMessagePopup]);

  const closeSuccessPopup = useCallback(() => {
    setOpenSuccessPopup(false);
  }, [setOpenSuccessPopup]);

  const [newMessage] = useMutation(createMessage, {
    onCompleted: () => {
      setChatMessagePopup(false);
      setOpenSuccessPopup(true);
    },
  });

  const [newRoom] = useMutation(createRoom);

  const onSubmit = async (values) => {
    const data = await newRoom({
      variables: {
        input: {
          userId,
          origin,
          originId: originData?.id,
        },
      },
    });
    if (data) {
      await newMessage({
        variables: {
          input: {
            roomId: data.data.createRooms.id,
            message: values.message,
          },
        },
      });
    }
  };

  const newMessageTitle =
    origin === "MASTER"
      ? `Начать чат с мастером ${originData?.name}`
      : `Начать чат с салоном ${originData?.name}`;

  return (
    <>
      {me?.info ? (
        <NewMessagePopup
          me={me}
          open={open}
          setChatMessagePopup={setChatMessagePopup}
          // handleClose={handleClosePopup}
          onSubmit={onSubmit}
          buttonText={buttonText}
          title={newMessageTitle}
        />
      ) : (
        <Popup
          isOpen={open}
          title="Для отправки сообщений в чат необходима регистрация"
        >
          <Button
            style={{ marginTop: 20 }}
            onClick={() => push("/login")}
            variant="red"
            font="popUp"
            size="popUp"
          >
            Перейти на страницу регистрации
          </Button>
          <Button
            style={{ marginTop: 20 }}
            onClick={() => setChatMessagePopup(false)}
            variant="darkTransparent"
            font="small"
            size="popUp"
          >
            Закрыть
          </Button>
        </Popup>
      )}

      <Popup
        isOpen={openSuccessPopup}
        onClose={closeSuccessPopup}
        title={successText}
      >
        <Button
          style={{ marginTop: 20 }}
          onClick={closeSuccessPopup}
          variant="red"
        >
          Закрыть
        </Button>
      </Popup>
    </>
  );
};

export default ChatMessagePopup;
