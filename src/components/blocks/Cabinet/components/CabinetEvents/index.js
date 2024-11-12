import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Wrapper, TitlePage, EventsWrapper, SkeletonWrap } from './styles'
import { currentUserEvents } from '../../../../../_graphql-legacy/events/currentUserEvents'
import Button from '../../../../ui/Button'
import CreateEvent from '../../../CreateEvent'
import { MobileHidden, MobileVisible } from '../../../../../styles/common'
import Event from 'src/components/blocks/Event'

const CabinetEventsList = ({ events, loading }) => {
  if (loading) {
    return <SkeletonWrap variant="rect" />
  }

  return (
    <EventsWrapper>
      {events?.length > 0 ? (
        <>
          {events?.map(item => (
            <Event
              key={item.title}
              title={item.title}
              // name={`${
              //   item?.origin.toLowerCase() === "master"
              //     ? "Мастер"
              //     : item.origin.toLowerCase() === "salon"
              //     ? "Салон"
              //     : item.origin.toLowerCase() === "brand"
              //     ? "Бренд"
              //     : ""
              // } ${
              //   item?.masterOrigin?.name ||
              //   item?.salonOrigin?.name ||
              //   item?.brandOrigin?.name ||
              //   ""
              // }
              // `}
              promo={item.value}
              photoId={item.photoId}
              dateStart={item.dateStart}
              dateEnd={item.dateEnd}
              address={item?.address}
              cabinetVariant
            />
          ))}
        </>
      ) : null}
    </EventsWrapper>
  )
}

const CabinetEvents = ({ me }) => {
  const [id, setId] = useState(me?.info?.id)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [createEvent, setCreateEvent] = useState(false)

  const { data, refetch: refetchEvents } = useQuery(currentUserEvents, {
    skip: true,
    onCompleted: res => {
      setEvents(res?.userEvents)
      setLoading(false)
    },
  })

  useEffect(() => {
    if (id) {
      setLoading(true)
      setEvents([])
      refetchEvents()
    }
  }, [id])

  return (
    <Wrapper>
      <TitlePage>Мои мероприятия</TitlePage>
      {/* <Subtitle>
        Нажмите на профиль для просмотра или создания мероприятий
      </Subtitle> */}
      {/* <Back
        onClick={() => {
          setActiveProfile(null);
          setCreateEvent(false);
        }}
      >
        Назад
      </Back>
      <Item>
        <Container>
          <Avatar alt="avatar" src={master?.photo?.url || "empty-photo.svg"} />
          <Content>
            <Name>{master?.name}</Name>
            <Type>Профиль мастера</Type>
          </Content>
        </Container>
      </Item> */}
      {!createEvent ? (
        <>
          <MobileHidden>
            <Button
              size="width374WithoutPadding"
              variant="darkTransparent"
              font="medium"
              onClick={() => setCreateEvent(true)}
            >
              Создать мероприятие
            </Button>
          </MobileHidden>
          <MobileVisible>
            <Button
              size="fullWidth"
              onClick={() => setCreateEvent(true)}
              variant="darkTransparent"
              font="small"
            >
              Создать мероприятие
            </Button>
          </MobileVisible>
          <CabinetEventsList events={events} loading={loading} />
        </>
      ) : (
        <CreateEvent
          refetch={refetchEvents}
          setCreateEvent={setCreateEvent}
          id={id}
        />
      )}
      {/* {!master?.id && !salons?.length && !brands?.length ? (
        <Subtitle>У Вас нет профиля</Subtitle>
      ) : null} */}
      {/* {master?.id && !activeProfile ? (
        <Item
          onClick={() => {
            setType("master");
            setId(master?.id);
            setActiveProfile(master);
          }}
        >
          <Container>
            <Avatar
              alt="avatar"
              src={master?.photo?.url || "empty-photo.svg"}
            />
            <Content>
              <Name>{master?.name}</Name>
              <Type>Профиль мастера</Type>
            </Content>
          </Container>
        </Item>
      ) : null}
      {salons?.length && !activeProfile
        ? salons.map((item) => (
            <div key={item.id}>
              <Item
                onClick={() => {
                  setType("salon");
                  setId(item?.id);
                  setActiveProfile(item);
                }}
              >
                <Container>
                  <Avatar
                    alt="avatar"
                    src={item?.logo?.url || "empty-photo.svg"}
                  />
                  <Content>
                    <Name>{item?.name}</Name>
                    <Type>
                      {item?.lessor
                        ? "Профиль салона арендодателя"
                        : "Профиль салона"}
                    </Type>
                  </Content>
                </Container>
              </Item>
            </div>
          ))
        : null}
      {brands?.length && !activeProfile
        ? brands.map((item) => (
            <div key={item.id}>
              <Item
                onClick={() => {
                  setType("brand");
                  setId(item?.id);
                  setActiveProfile(item);
                }}
              >
                <Container>
                  <Avatar
                    alt="avatar"
                    src={
                      item?.logoId
                        ? `${PHOTO_URL}${item?.logoId}/original`
                        : "empty-photo.svg"
                    }
                  />
                  <Content>
                    <Name>{item?.name}</Name>
                    <Type>Профиль бренда</Type>
                  </Content>
                </Container>
              </Item>
            </div>
          ))
        : null} */}
      {/* {type === "master" && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null);
              setCreateEvent(false);
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={master?.photo?.url || "empty-photo.svg"}
              />
              <Content>
                <Name>{master?.name}</Name>
                <Type>Профиль мастера</Type>
              </Content>
            </Container>
          </Item>
          {!createEvent ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateEvent(true)}
                >
                  Создать мероприятие
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateEvent(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать мероприятие
                </Button>
              </MobileVisible>
              <CabinetEventsList events={events} loading={loading} />
            </>
          ) : (
            <CreateEvent
              refetch={refetchEvents}
              type={type}
              activeProfile={activeProfile}
              setCreateEvent={setCreateEvent}
            />
          )}
        </>
      ) : null}
      {type === "salon" && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null);
              setCreateEvent(false);
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={activeProfile?.logo?.url || "empty-photo.svg"}
              />
              <Content>
                <Name>{activeProfile?.name}</Name>
                <Type>Профиль салона</Type>
              </Content>
            </Container>
          </Item>
          {!createEvent ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateEvent(true)}
                >
                  Создать мероприятие
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateEvent(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать мероприятие
                </Button>
              </MobileVisible>
              <CabinetEventsList events={events} loading={loading} />
            </>
          ) : (
            <CreateEvent
              refetch={refetchEvents}
              type={type}
              activeProfile={activeProfile}
              setCreateEvent={setCreateEvent}
            />
          )}
        </>
      ) : null}
      {type === "brand" && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null);
              setCreateEvent(false);
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={
                  activeProfile?.logoId
                    ? `${PHOTO_URL}${activeProfile?.logoId}/original`
                    : "empty-photo.svg"
                }
              />
              <Content>
                <Name>{activeProfile?.name}</Name>
                <Type>Профиль бренда</Type>
              </Content>
            </Container>
          </Item>
          {!createEvent ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateEvent(true)}
                >
                  Создать мероприятие
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateEvent(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать мероприятие
                </Button>
              </MobileVisible>
              <CabinetEventsList events={events} loading={loading} />
            </>
          ) : (
            <CreateEvent
              refetch={refetchEvents}
              type={type}
              activeProfile={activeProfile}
              setCreateEvent={setCreateEvent}
            />
          )}
        </>
      ) : null} */}
    </Wrapper>
  )
}

export default CabinetEvents
