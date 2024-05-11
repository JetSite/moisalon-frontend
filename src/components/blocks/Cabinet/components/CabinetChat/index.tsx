import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import Link from 'next/link'
import ChatBlock from './components/ChatBlock'
import MessageBlock from './components/MessageBlock'
import AnswerBlock from './components/AnswerBlock'
import { Wrapper, BackBtn, ChatContent, Error, ScrollDiv } from './styles'
import { ChatBlockOrigin } from './components/styles'
import { getRoomMessages } from '../../../../../_graphql-legacy/chat/getRoomMessages'
import { createMessage } from '../../../../../_graphql-legacy/chat/createMessage'
import RotatingLoader from '../../../../ui/RotatingLoader'
import { cyrToTranslit } from '../../../../../utils/translit'
import { IChat, useChat } from '../../../../../chatContext'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IID, LazyType } from 'src/types/common'

const CabinetChat = () => {
  const [chatClicked, setChatClicked] = useState<IChat | null>(null)
  const [loading, setLoading] = useState(false)
  const scrollMessagesRef = useRef<HTMLDivElement>(null)
  const { city, me } = useAuthStore(getStoreData)
  const messagesListRef = useRef<HTMLDivElement>(null)

  const { chats, messages, setMessages } = useChat()

  useEffect(() => {
    scrollMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('div')).filter(
      el => el.textContent === 'Сообщения',
    )
    const clickHandler = () => {
      setChatClicked(null)
    }
    elements[2]?.addEventListener('click', clickHandler)

    return () => {
      elements[2]?.removeEventListener('click', clickHandler)
    }
  }, [])

  const { data, refetch: refetchMessages } = useQuery(getRoomMessages, {
    skip: true,
    variables: {
      roomId: chatClicked?.chat?.id,
    },
    onCompleted: res => {
      setMessages(res?.massages)
      setLoading(false)
    },
  })

  useEffect(() => {
    if (chatClicked) {
      setLoading(true)
      setMessages([])
      refetchMessages({
        variables: {
          roomId: chatClicked?.id,
        },
      })
    }
  }, [chatClicked])

  const [newMessage] = useMutation(createMessage)

  const answerMessage = async (e, answerInput) => {
    e.stopPropagation()
    if (answerInput.trim() === '') return
    await newMessage({
      variables: {
        input: {
          roomId: chatClicked?.chat?.id,
          message: answerInput,
        },
      },
    })
    await refetchMessages({
      variables: {
        roomId: chatClicked?.chat?.id,
      },
    })
  }

  const chatClickHandler = (chatData: IChat) => {
    setChatClicked(chatData)
  }

  if (!me) return null

  return (
    <Wrapper>
      {/* {error ? <Error>{error}</Error> : null} */}
      {!chatClicked ? (
        <>
          {chats?.map(chat => (
            <ChatBlock
              key={chat.id}
              chat={chat}
              chatClicked={(chatClicked as unknown as IChat)?.chat}
              chatClickHandler={chatClickHandler}
              me={me}
            />
          ))}
        </>
      ) : (
        <>
          {chatClicked ? (
            <BackBtn onClick={() => setChatClicked(null)}>Назад</BackBtn>
          ) : null}
          {chatClicked?.originData && (
            <Link
              href={`/${
                chatClicked?.chat.origin === 'MASTER'
                  ? cyrToTranslit(chatClicked?.originData.city)
                  : city?.citySlug
              }/${chatClicked?.chat.origin === 'MASTER' ? 'master' : 'salon'}/${
                chatClicked?.originData.id
              }`}
              passHref
            >
              <ChatBlockOrigin target="_blank">{`${
                chatClicked?.chat.origin === 'MASTER' ? 'Мастер' : 'Салон'
              } ${chatClicked?.originData.name}`}</ChatBlockOrigin>
            </Link>
          )}
          {messages.length ? (
            <>
              <ChatContent ref={messagesListRef}>
                {messages?.map(message => (
                  <MessageBlock
                    key={message.id as unknown as IID}
                    chatClicked={chatClicked?.chat}
                    message={message}
                    me={me}
                    messagesListRef={messagesListRef}
                    refetchMessages={refetchMessages}
                  />
                ))}
                <ScrollDiv ref={scrollMessagesRef} />
              </ChatContent>
              <AnswerBlock answerMessage={answerMessage} />
            </>
          ) : (
            <RotatingLoader />
          )}
        </>
      )}
    </Wrapper>
  )
}

export default CabinetChat
