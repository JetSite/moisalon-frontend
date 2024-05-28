import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
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
  Back,
} from './styles'
import Button from '../../../../ui/Button'
import CreateVacancy from './components/CreateVacancy'
import { MobileHidden, MobileVisible } from '../../../../../styles/common'
import { currentVacancies } from '../../../../../_graphql-legacy/vacancies/currentVacancies'
import { deleteVacancyMutation } from '../../../../../_graphql-legacy/vacancies/deleteVacancyMutation'
import { PHOTO_URL } from '../../../../../api/variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IID } from 'src/types/common'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { CabinetVacanciesList } from './components/CabinetVacanciesList'

const CabinetVacancies = () => {
  const { city, user, loading } = useAuthStore(getStoreData)
  const salons = user?.owner?.salons
  const brands = user?.owner?.brand
  const vacancies = user?.vacancies

  const [id, setId] = useState<IID>('')
  const [type, setType] = useState<string | null>(null)
  const [activeProfile, setActiveProfile] = useState<ISalon | IBrand | null>(
    null,
  )
  const [createVacancy, setCreateVacancy] = useState(false)

  const removeVacancy = () => {
    console.log('delete vacancy')
  }

  const refetchVacancies = () => {
    console.log('refetchVacancies')
  }

  return (
    <Wrapper>
      <TitlePage>Вакансии</TitlePage>
      <Subtitle>
        Нажмите на профиль для просмотра или создания вакансий
      </Subtitle>
      {!salons?.length && !brands?.length ? (
        <Subtitle>У Вас нет профиля бренда или салона</Subtitle>
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
                    src={PHOTO_URL + item?.salonLogo?.url || 'empty-photo.svg'}
                  />
                  <Content>
                    <Name>{item?.salonName}</Name>
                    <Type>
                      {item?.salonWorkplacesCount
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
                      item?.brandLogo
                        ? `${PHOTO_URL}${item?.brandLogo.url}`
                        : 'empty-photo.svg'
                    }
                  />
                  <Content>
                    <Name>{item?.brandName}</Name>
                    <Type>Профиль бренда</Type>
                  </Content>
                </Container>
              </Item>
            </div>
          ))
        : null}
      {type === 'salon' && activeProfile !== null ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null)
              setCreateVacancy(false)
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={
                  PHOTO_URL + (activeProfile as ISalon).salonLogo?.url ||
                  'empty-photo.svg'
                }
              />
              <Content>
                <Name>{(activeProfile as ISalon).salonName}</Name>
                <Type>Профиль салона</Type>
              </Content>
            </Container>
          </Item>
          {!createVacancy ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateVacancy(true)}
                >
                  Создать вакансию
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateVacancy(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать вакансию
                </Button>
              </MobileVisible>
              {!!vacancies && (
                <CabinetVacanciesList
                  vacancies={vacancies.filter(
                    item => item.salon?.id === activeProfile.id,
                  )}
                  loading={loading}
                  removeVacancy={removeVacancy}
                />
              )}
            </>
          ) : (
            <CreateVacancy
              refetch={refetchVacancies}
              type={type}
              activeProfile={activeProfile}
              setCreateVacancy={setCreateVacancy}
            />
          )}
        </>
      ) : null}
      {type === 'brand' && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null)
              setCreateVacancy(false)
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={
                  (activeProfile as IBrand).brandLogo
                    ? `${PHOTO_URL}${(activeProfile as IBrand).brandLogo.url}`
                    : 'empty-photo.svg'
                }
              />
              <Content>
                <Name>{(activeProfile as IBrand).brandName}</Name>
                <Type>Профиль бренда</Type>
              </Content>
            </Container>
          </Item>
          {!createVacancy ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateVacancy(true)}
                >
                  Создать вакансию
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateVacancy(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать вакансию
                </Button>
              </MobileVisible>
              {!!vacancies && (
                <CabinetVacanciesList
                  vacancies={vacancies.filter(
                    item => item.brand?.id === activeProfile.id,
                  )}
                  loading={loading}
                  removeVacancy={removeVacancy}
                />
              )}
            </>
          ) : (
            <CreateVacancy
              refetch={refetchVacancies}
              type={type}
              activeProfile={activeProfile}
              setCreateVacancy={setCreateVacancy}
            />
          )}
        </>
      ) : null}
    </Wrapper>
  )
}

export default CabinetVacancies
