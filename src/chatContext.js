import { useState, useEffect, useContext, createContext, useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { MeContext } from "./searchContext";
import { getRooms } from "./_graphql-legacy/chat/getRooms";
// import { getRoomMessages } from "./_graphql-legacy/chat/getRoomMessages";

const ChatContext = createContext(null);

const useChatContext = () => {
  const [me] = useContext(MeContext);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [websocketMessage, setWebsocketMessage] = useState(null);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  const { data, refetch: refetchChats } = useQuery(getRooms, {
    skip: true,
    onCompleted: (res) => {
      setChats(res?.rooms);
    },
  });

  useEffect(() => {
    if (!me?.info) return;
    refetchChats();
  }, [me]);

  useEffect(() => {
    if (!me?.info) return;
    let count = 0;
    chats?.forEach((chat) => (count += chat.noReads));
    setUnreadMessagesCount(count);
  }, [me, chats]);

  useEffect(() => {
    if (!me?.info) return;
    const openHandler = () => {};

    const messageHandler = (event) => {
      const message = JSON.parse(event.data);
      setWebsocketMessage(message);
    };

    const errorHandler = () => {
      wsInstance?.close();
    };

    const dev = process.env.NEXT_PUBLIC_ENV !== "production";
    const webSocketsUrl = dev
      ? `wss://stage-moi.moi.salon/ws?user=${me?.info?.id}`
      : `wss://moi.salon/ws?user=${me?.info?.id}`;

    const wsInstance = new WebSocket(webSocketsUrl);
    wsInstance?.addEventListener("open", openHandler);
    wsInstance?.addEventListener("message", messageHandler);
    wsInstance?.addEventListener("error", errorHandler);

    return () => {
      wsInstance?.removeEventListener("open", openHandler);
      wsInstance?.removeEventListener("message", messageHandler);
      wsInstance?.removeEventListener("error", errorHandler);
      wsInstance?.close();
    };
  }, [me]);

  useEffect(() => {
    if (websocketMessage) {
      setMessages([
        ...messages,
        {
          id: websocketMessage.Id,
          authorId: websocketMessage.AuthoruserId,
          userId: websocketMessage.UserId,
          createAt: websocketMessage.CreateAt,
          message: websocketMessage.Message,
          read: websocketMessage.Read,
        },
      ]);
      setUnreadMessagesCount((prevState) => prevState + 1);
    }
  }, [websocketMessage]);

  useEffect(() => {}, [messages]);

  const chatContext = useMemo(
    () => ({
      messages,
      setMessages,
      chats,
      unreadMessagesCount,
      setUnreadMessagesCount,
    }),
    [messages, setMessages, chats, unreadMessagesCount, setUnreadMessagesCount]
  );
  return chatContext;
};

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const chatContext = useChatContext();

  return (
    <ChatContext.Provider value={chatContext}>{children}</ChatContext.Provider>
  );
};
