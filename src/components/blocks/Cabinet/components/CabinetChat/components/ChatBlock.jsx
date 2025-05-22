import { useState, useEffect, FC } from 'react'
import { useQuery } from '@apollo/client/react'
import { format, isToday, isYesterday, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
  ChatBlockWrapper,
  ChatAvatarWrapper,
  ChatAvatar,
  ChatBlockContent,
  Row,
  ChatRowMessage,
  ChatBlockName,
  ChatBlockOrigin,
  ChatBlockLastMessageTime,
  ChatBlockLastMessage,
  UnreadQuantity,
} from './styles'
import { PHOTO_URL } from '../../../../../../api/variables'
import { IChat, IChatChat } from 'src/chatContext'

const formatMessageDate = (date) => {
  const parsedDate = parseISO(date)
  if (isToday(parsedDate)) {
    return format(parsedDate, 'HH:mm', { locale: ru })
  }
  if (isYesterday(parsedDate)) {
    return `Вчера в ${format(parsedDate, 'HH:mm', { locale: ru })}`
  }
  if (new Date().getFullYear() === parsedDate.getFullYear()) {
    return format(parsedDate, 'd MMMM', { locale: ru })
  }
  return format(parsedDate, 'dd.MM.yyyy', { locale: ru })
}

const ChatBlock = ({ chat, chatClicked, chatClickHandler, me }) => {
  const [messages, setMessages] = useState([])
  const [unreadMessages, setUnreadMessages] = useState([])
  const [originData, setOriginData] = useState(null)

  // const { data, refetch } = useQuery(getRoomMessages, {
  //   variables: {
  //     roomId: chat?.id,
  //   },
  //   onCompleted: res => {
  //     setMessages(res?.massages)
  //   },
  // })

  // const { data: origin } = useQuery(
  //   chat?.origin === 'MASTER' ? masterQuery : salonQuery,
  //   {
  //     variables: {
  //       id: chat?.originId,
  //     },
  //     onCompleted: res => {
  //       setOriginData(chat?.origin === 'MASTER' ? res?.master : res?.salon)
  //     },
  //   },
  // )

  useEffect(() => {
    // refetch()
    setUnreadMessages([])
  }, [chatClicked])

  useEffect(() => {
    const unread = []
    messages.forEach(message => {
      if (!message.read && me.info.id !== message.authorUserId)
        unread.push(message)
    })
    setUnreadMessages(unread)
  }, [messages])

  const lastMessage =
    unreadMessages.length > 0
      ? unreadMessages[unreadMessages?.length - 1]
      : messages[messages?.length - 1]
  const name =
    me.info.id === lastMessage?.authorUserId
      ? me.info.displayName
      : chat.user.displayName
  const photoId =
    me.info.id === lastMessage?.authorUserId ? me.info.avatar : chat.user.avatar
  const photoUrl = `${PHOTO_URL}${photoId}/original`

  return (
    <ChatBlockWrapper
      onClick={() => {
        chatClickHandler({ chat, originData })
        setUnreadMessages([])
      }}
    >
      <ChatAvatarWrapper>
        <ChatAvatar src={photoUrl} />
      </ChatAvatarWrapper>
      <ChatBlockContent>
        <Row>
          <ChatBlockName>{name}</ChatBlockName>
          <ChatBlockLastMessageTime>
            {moment(lastMessage?.createAt).calendar()}
          </ChatBlockLastMessageTime>
        </Row>
        {originData && (
          <Row>
            <ChatBlockOrigin>{`${
              chat?.origin === 'MASTER' ? 'Мастер' : 'Салон'
            } ${originData?.name}`}</ChatBlockOrigin>
          </Row>
        )}
        <ChatRowMessage>
          <ChatBlockLastMessage>{lastMessage?.message}</ChatBlockLastMessage>
          {unreadMessages.length > 0 && (
            <UnreadQuantity>{unreadMessages.length}</UnreadQuantity>
          )}
        </ChatRowMessage>
      </ChatBlockContent>
    </ChatBlockWrapper>
  )
}

export default ChatBlock
