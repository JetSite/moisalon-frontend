import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  Wrapper,
  TitlePage,
  Subtitle,
  Item,
  Container,
  Avatar,
  Content,
  Name,
  Type,
  PriorityWrapper,
  Back,
  SkeletonWrap,
} from './styles'
import Button from '../../../../ui/Button'
import CreatePriority from './components/CreatePriority'
import { MobileHidden, MobileVisible } from '../../../../../styles/common'
import { currentRequestPriority } from '../../../../../_graphql-legacy/priority/currentRequestPriority'
import { deletePriorityMutation } from '../../../../../_graphql-legacy/priority/deletePriorityMutation'
import { PHOTO_URL } from '../../../../../api/variables'
import Priority from '../../../../ui/Priority'

const CabinetPriorityList = ({ priority, loading, handleDelete }) => {
  if (loading) {
    return <SkeletonWrap variant="rect" />
  }

  return (
    <PriorityWrapper>
      {priority?.length > 0 ? (
        <>
          {priority?.map(item => (
            <>
              <Priority text={item?.requestComment} status={item?.status} />
              <Button onClick={() => handleDelete(item)} variant="red">
                Удалить
              </Button>
            </>
          ))}
        </>
      ) : (
        <Subtitle>У профиля нет заявок</Subtitle>
      )}
    </PriorityWrapper>
  )
}

const CabinetPriority = ({ me }) => {
  const salons = me?.salons
  const master = me?.master
  const brands = me?.userBrands

  const [id, setId] = useState('')
  const [type, setType] = useState(null)
  const [activeProfile, setActiveProfile] = useState(null)
  const [priority, setPriority] = useState([])
  const [loading, setLoading] = useState(false)
  const [createPriority, setCreatePriority] = useState(false)

  const { data, refetch: refetchPriority } = useQuery(currentRequestPriority, {
    skip: true,
    variables: {
      originId: id,
    },
    onCompleted: res => {
      setPriority(res?.currentRequestPriority)
      setLoading(false)
    },
  })

  useEffect(() => {
    if (id) {
      setLoading(true)
      setPriority([])
      refetchPriority({
        variables: {
          originId: id,
        },
      })
    }
  }, [type, id])

  const [deletePriority] = useMutation(deletePriorityMutation, {
    onCompleted: async () => {
      await refetchPriority({
        variables: {
          originId: activeProfile.id,
        },
      })
    },
  })

  const handleDelete = item => {
    deletePriority({
      variables: {
        id: item.id,
      },
    })
  }

  return (
    <Wrapper>
      <TitlePage>Приоритетное размещение</TitlePage>
      <Subtitle>
        Нажмите на профиль для просмотра или создания запроса на приоритетное
        размещение
      </Subtitle>
      {!master?.id && !salons?.length && !brands?.length ? (
        <Subtitle>У Вас нет профиля</Subtitle>
      ) : null}
      {master?.id && !activeProfile ? (
        <Item
          onClick={() => {
            setType('master')
            setId(master?.id)
            setActiveProfile(master)
          }}
        >
          <Container>
            <Avatar
              alt="avatar"
              src={master?.photo?.url || 'empty-photo.svg'}
            />
            <Content>
              <Name>{master?.name}</Name>
              <Type>Профиль мастера</Type>
            </Content>
          </Container>
        </Item>
      ) : null}
      {salons?.length && !activeProfile
        ? salons.map(item => (
            <div key={item.id}>
              <Item
                onClick={() => {
                  setType('salon')
                  setId(item?.id)
                  setActiveProfile(item)
                }}
              >
                <Container>
                  <Avatar
                    alt="avatar"
                    src={item?.logo?.url || 'empty-photo.svg'}
                  />
                  <Content>
                    <Name>{item?.name}</Name>
                    <Type>
                      {item?.lessor
                        ? 'Профиль салона арендодателя'
                        : 'Профиль салона'}
                    </Type>
                  </Content>
                </Container>
              </Item>
            </div>
          ))
        : null}
      {brands?.length && !activeProfile
        ? brands.map(item => (
            <div key={item.id}>
              <Item
                onClick={() => {
                  setType('brand')
                  setId(item?.id)
                  setActiveProfile(item)
                }}
              >
                <Container>
                  <Avatar
                    alt="avatar"
                    src={
                      item?.logoId
                        ? `${PHOTO_URL}${item?.logoId}/original`
                        : 'empty-photo.svg'
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
        : null}
      {type === 'master' && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null)
              setCreatePriority(false)
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={master?.photo?.url || 'empty-photo.svg'}
              />
              <Content>
                <Name>{master?.name}</Name>
                <Type>Профиль мастера</Type>
              </Content>
            </Container>
          </Item>
          {!createPriority ? (
            <>
              {!priority?.length && !loading ? (
                <>
                  <MobileHidden>
                    <Button
                      size="width374WithoutPadding"
                      variant="darkTransparent"
                      font="medium"
                      onClick={() => setCreatePriority(true)}
                    >
                      Создать заявку
                    </Button>
                  </MobileHidden>
                  <MobileVisible>
                    <Button
                      size="fullWidth"
                      onClick={() => setCreatePriority(true)}
                      variant="darkTransparent"
                      font="small"
                    >
                      Создать заявку
                    </Button>
                  </MobileVisible>
                </>
              ) : null}
              <CabinetPriorityList
                handleDelete={handleDelete}
                priority={priority}
                loading={loading}
              />
            </>
          ) : (
            <CreatePriority
              refetch={refetchPriority}
              type={type}
              activeProfile={activeProfile}
              setCreatePriority={setCreatePriority}
            />
          )}
        </>
      ) : null}
      {type === 'salon' && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null)
              setCreatePriority(false)
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={activeProfile?.logo?.url || 'empty-photo.svg'}
              />
              <Content>
                <Name>{activeProfile?.name}</Name>
                <Type>Профиль салона</Type>
              </Content>
            </Container>
          </Item>
          {!createPriority ? (
            <>
              {!priority?.length && !loading ? (
                <>
                  <MobileHidden>
                    <Button
                      size="width374WithoutPadding"
                      variant="darkTransparent"
                      font="medium"
                      onClick={() => setCreatePriority(true)}
                    >
                      Создать заявку
                    </Button>
                  </MobileHidden>
                  <MobileVisible>
                    <Button
                      size="fullWidth"
                      onClick={() => setCreatePriority(true)}
                      variant="darkTransparent"
                      font="small"
                    >
                      Создать заявку
                    </Button>
                  </MobileVisible>
                </>
              ) : null}
              <CabinetPriorityList
                handleDelete={handleDelete}
                priority={priority}
                loading={loading}
              />
            </>
          ) : (
            <CreatePriority
              refetch={refetchPriority}
              type={type}
              activeProfile={activeProfile}
              setCreatePriority={setCreatePriority}
            />
          )}
        </>
      ) : null}
      {type === 'brand' && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null)
              setCreatePriority(false)
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
                    : 'empty-photo.svg'
                }
              />
              <Content>
                <Name>{activeProfile?.name}</Name>
                <Type>Профиль бренда</Type>
              </Content>
            </Container>
          </Item>
          {!createPriority ? (
            <>
              {!priority?.length && !loading ? (
                <>
                  <MobileHidden>
                    <Button
                      size="width374WithoutPadding"
                      variant="darkTransparent"
                      font="medium"
                      onClick={() => setCreatePriority(true)}
                    >
                      Создать заявку
                    </Button>
                  </MobileHidden>
                  <MobileVisible>
                    <Button
                      size="fullWidth"
                      onClick={() => setCreatePriority(true)}
                      variant="darkTransparent"
                      font="small"
                    >
                      Создать заявку
                    </Button>
                  </MobileVisible>
                </>
              ) : null}
              <CabinetPriorityList
                handleDelete={handleDelete}
                priority={priority}
                loading={loading}
              />
            </>
          ) : (
            <CreatePriority
              refetch={refetchPriority}
              type={type}
              activeProfile={activeProfile}
              setCreatePriority={setCreatePriority}
            />
          )}
        </>
      ) : null}
    </Wrapper>
  )
}

export default CabinetPriority
