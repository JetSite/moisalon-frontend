import { useRef, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { format, formatDistanceToNow, isYesterday, isToday, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
  MessageBlockWrapper,
  AvatarBlock,
  AvatarWrapper,
  Avatar,
  Content,
  MobileTopWrapper,
  Row,
  Name,
  Time,
  Question,
} from './styles'
import { MobileHidden } from '../../../../../../styles/common'
import { PHOTO_URL } from '../../../../../../api/variables'
import { useChat } from '../../../../../../chatContext.tsx'

const formatMessageDate = (date) => {
  const messageDate = typeof date === 'string' ? parseISO(date) : date
  
  if (isToday(messageDate)) {
    return format(messageDate, 'HH:mm', { locale: ru })
  } else if (isYesterday(messageDate)) {
    return `Вчера в ${format(messageDate, 'HH:mm', { locale: ru })}`
  } else if (messageDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
    return format(messageDate, 'dd.MM.yyyy', { locale: ru })
  } else {
    return format(messageDate, 'dd.MM.yyyy', { locale: ru })
  }
}

const MessageBlock = ({
  chat,
  chatClicked,
  message,
  me,
  messagesListRef,
  refetchMessages,
}) => {
  const messageRef = useRef()
  const [messageIsRead, setMessageIsRead] = useState(message.read)
  const { setUnreadMessagesCount } = useChat()

  // const [changeMessageStatus] = useMutation(changeMessageStatusMutation, {
  //   variables: {
  //     input: {
  //       id: message.id,
  //     },
  //   },
  //   onCompleted: () => {
  //     refetchMessages()
  //     setUnreadMessagesCount(prevCount => prevCount - 1)
  //   },
  // })

  useEffect(() => {
    if (me.info.id === message.authorUserId) return
    if (message.read) return

    const options = {
      root: messagesListRef?.current,
      rootMargin: '0px',
      threshold: 0.9,
    }

    const callback = entries => {
      const [entry] = entries
      if (entry.isIntersecting && !messageIsRead) {
        // changeMessageStatus()
        setMessageIsRead(true)
      }
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(messageRef?.current)

    return () => {
      observer.disconnect()
    }
  }, [messageIsRead])

  const name =
    me.info.id === message.authorUserId
      ? me.info.displayName
      : chatClicked.user.displayName
  const photoId =
    me.info.id === message.authorUserId
      ? me.info.avatar
      : chatClicked.user.avatar
  const photoUrl = `${PHOTO_URL}${photoId}/original`
  const isRead = me.info.id !== message.authorUserId ? messageIsRead : true

  return (
    <MessageBlockWrapper ref={messageRef} isRead={isRead}>
      <MobileHidden>
        <AvatarBlock>
          <AvatarWrapper>
            <Avatar src={photoUrl} />
          </AvatarWrapper>
        </AvatarBlock>
      </MobileHidden>
      <MobileTopWrapper>
        <AvatarBlock>
          <AvatarWrapper>
            <Avatar src={photoUrl} />
          </AvatarWrapper>
        </AvatarBlock>
        <Name>{name}</Name>
        <Time>{formatMessageDate(message?.createAt)}</Time>
      </MobileTopWrapper>
      <Content>
        <MobileHidden>
          <Row>
            <Name>{name}</Name>
            <Time>{formatMessageDate(message?.createAt)}</Time>
          </Row>
        </MobileHidden>
        <Row>
          <Question>{message?.message}</Question>
        </Row>
      </Content>
    </MessageBlockWrapper>
  )
}

export default MessageBlock
