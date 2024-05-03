import {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  FC,
  Dispatch,
  SetStateAction,
} from 'react'
import { useQuery } from '@apollo/client/react'
import { getRooms } from './_graphql-legacy/chat/getRooms'
import { getStoreData } from './store/utils'
import useAuthStore from './store/authStore'
import { IChildren, IID, LazyType } from './types/common'
import { ICity } from './types'
// import { getRoomMessages } from "./_graphql-legacy/chat/getRoomMessages";

export interface IChatChat {
  id: IID
  origin: 'MASTER'
}

export interface IChat {
  id: IID
  noReads: boolean
  chat: IChatChat
  originData: { city: ICity; id: IID; name: string }
}

interface IChatContext {
  messages: LazyType[]
  setMessages: Dispatch<SetStateAction<LazyType[]>>
  chats: IChat[]
  unreadMessagesCount: number
  setUnreadMessagesCount: Dispatch<SetStateAction<number>>
}

const initialChatContext = {
  messages: [],
  setMessages: () => {},
  chats: [],
  unreadMessagesCount: 0,
  setUnreadMessagesCount: () => {},
}

const ChatContext = createContext<IChatContext>(initialChatContext)

const useChatContext = () => {
  debugger
  const { me } = useAuthStore(getStoreData)
  const [chats, setChats] = useState<IChat[]>([])
  const [messages, setMessages] = useState<LazyType[]>([])
  const [websocketMessage, setWebsocketMessage] = useState<LazyType | null>(
    null,
  )
  const [unreadMessagesCount, setUnreadMessagesCount] = useState<number>(0)

  const { data, refetch: refetchChats } = useQuery(getRooms, {
    skip: true,
    onCompleted: res => {
      setChats(res?.rooms)
    },
  })

  if (!me?.info) return
  refetchChats()

  // useEffect(() => {
  //   if (!me?.info) return
  //   let count = 0
  //   chats?.forEach(chat => (count += chat.noReads ? 1 : 0))
  //   setUnreadMessagesCount(count)
  // }, [me, chats])

  // useEffect(() => {
  //   if (!me?.info) return
  //   const openHandler = () => {}

  //   const messageHandler = (event: MessageEvent) => {
  //     const message = JSON.parse(event.data)
  //     setWebsocketMessage(message)
  //   }

  //   const errorHandler = () => {
  //     wsInstance?.close()
  //   }

  //   const dev = process.env.NEXT_PUBLIC_ENV !== 'production'
  //   const webSocketsUrl = dev
  //     ? `wss://stage-moi.moi.salon/ws?user=${me?.info?.id}`
  //     : `wss://moi.salon/ws?user=${me?.info?.id}`

  //   const wsInstance = new WebSocket(webSocketsUrl)
  //   wsInstance?.addEventListener('open', openHandler)
  //   wsInstance?.addEventListener('message', messageHandler)
  //   wsInstance?.addEventListener('error', errorHandler)

  //   return () => {
  //     wsInstance?.removeEventListener('open', openHandler)
  //     wsInstance?.removeEventListener('message', messageHandler)
  //     wsInstance?.removeEventListener('error', errorHandler)
  //     wsInstance?.close()
  //   }
  // }, [me])

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
      ])
      setUnreadMessagesCount(prevState => prevState + 1)
    }
  }, [websocketMessage])

  useEffect(() => {}, [messages])

  const chatContext = useMemo(
    () => ({
      messages,
      setMessages,
      chats,
      unreadMessagesCount,
      setUnreadMessagesCount,
    }),
    [messages, setMessages, chats, unreadMessagesCount, setUnreadMessagesCount],
  )
  return chatContext
}

export const useChat = () => {
  return useContext(ChatContext)
}

export const ChatProvider: FC<{ children: IChildren }> = ({ children }) => {
  const chatContext: IChatContext = useChatContext()

  return (
    <ChatContext.Provider value={chatContext}>{children}</ChatContext.Provider>
  )
}
