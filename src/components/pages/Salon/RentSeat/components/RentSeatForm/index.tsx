import { useState, useEffect, FC } from 'react'
import CreateSeat from '../CreateSeat'
import Seat from './components/Seat'
import {
  Wrapper,
  TitleRent,
  TextRent,
  Text,
  WrapperSeats,
  ButtonCustom,
} from './styles'
import { ISalonPage } from 'src/types/salon'
import { ISalonWorkplaces } from 'src/types'
import { IApolloRefetch, IID } from 'src/types/common'

interface Props {
  salon: ISalonPage
  refetchSalon: IApolloRefetch
  refetchSalonLoad: boolean
}

const RentSeatForm: FC<Props> = ({ salon, refetchSalon, refetchSalonLoad }) => {
  const [createWorkplace, setCreateWorkplace] = useState<boolean>(false)
  const [workplace, setWorkplace] = useState<ISalonWorkplaces | null>(null)
  const [workplaceId, setWorkplaceId] = useState<IID | null>(null)

  useEffect(() => {
    const findWorkplace =
      salon?.workplaces?.filter(
        roomElement => roomElement.id === workplaceId,
      ) || []
    setWorkplace(findWorkplace[0])
  }, [salon, refetchSalon, workplaceId])

  console.log('workplace', workplace)

  return (
    <Wrapper>
      {!createWorkplace ? (
        <>
          <TitleRent>{salon?.name}</TitleRent>
          <TextRent>Рабочие места салона</TextRent>
          {salon?.workplaces?.length ? (
            <WrapperSeats>
              {!refetchSalonLoad &&
                salon?.workplaces.map(item => (
                  <Seat
                    salon={salon}
                    seat={item}
                    refetchSalon={refetchSalon}
                    key={item.id}
                    onClick={() => {
                      setWorkplace(item)
                      setCreateWorkplace(true)
                      setWorkplaceId(item.id)
                    }}
                  />
                ))}
            </WrapperSeats>
          ) : (
            <Text>У салона нет рабочих мест</Text>
          )}
          <ButtonCustom
            style={{ marginTop: 50, marginBottom: 20 }}
            variant="red"
            size="noWidth"
            font="small"
            onClick={() => setCreateWorkplace(true)}
          >
            Добавить рабочее место
          </ButtonCustom>
        </>
      ) : (
        <CreateSeat
          setCreateWorkplace={setCreateWorkplace}
          workplace={workplace}
          salon={salon}
          setWorkplaceId={setWorkplaceId}
          setWorkplace={setWorkplace}
          refetchSalon={refetchSalon}
          workplaceId={workplaceId}
        />
      )}
    </Wrapper>
  )
}

export default RentSeatForm
