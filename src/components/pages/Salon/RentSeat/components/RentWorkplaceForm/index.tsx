import { useState, useEffect, FC } from 'react'
import { CreateWorkplace } from '../CreateWorkplace'
import Workplace from './components/Workplace'
import {
  Wrapper,
  TitleRent,
  TextRent,
  Text,
  WrapperWorkplace,
  ButtonCustom,
} from './styles'
import { ISalonPage } from 'src/types/salon'
import { ISalonWorkplace } from 'src/types/workplace'
import { IApolloRefetch, IID } from 'src/types/common'
import { IRentalPeriod } from 'src/types'
import { IEquipment } from 'src/types/equipment'

interface Props {
  salon: ISalonPage
  refetchSalon: IApolloRefetch
  refetchSalonLoad: boolean
  retnalPeriods: IRentalPeriod[]
  equipments: IEquipment[]
}

const RentWorkplaceForm: FC<Props> = ({
  salon,
  refetchSalon,
  refetchSalonLoad,
  retnalPeriods,
  equipments,
}) => {
  const [createWorkplace, setCreateWorkplace] = useState<boolean>(false)
  const [workplace, setWorkplace] = useState<ISalonWorkplace | null>(null)
  const [workplaceId, setWorkplaceId] = useState<IID | null>(null)

  return (
    <Wrapper>
      {!createWorkplace ? (
        <>
          <TitleRent>{salon?.name}</TitleRent>
          <TextRent>Рабочие места салона</TextRent>
          {salon?.workplaces?.length ? (
            <WrapperWorkplace>
              {!refetchSalonLoad &&
                salon?.workplaces.map((item, i) => (
                  <Workplace
                    salon={salon}
                    index={i}
                    workplace={item}
                    refetchSalon={refetchSalon}
                    key={item.id}
                    onClick={() => {
                      setWorkplace(item)
                      setCreateWorkplace(true)
                      setWorkplaceId(item.id)
                    }}
                  />
                ))}
            </WrapperWorkplace>
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
        <CreateWorkplace
          setCreateWorkplace={setCreateWorkplace}
          workplace={workplace}
          salon={salon}
          setWorkplaceId={setWorkplaceId}
          setWorkplace={setWorkplace}
          refetchSalon={refetchSalon}
          workplaceId={workplaceId}
          retnalPeriods={retnalPeriods}
          equipments={equipments}
        />
      )}
    </Wrapper>
  )
}

export default RentWorkplaceForm
