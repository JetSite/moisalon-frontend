import { useState, FC } from 'react'
import { CreateWorkplace, ICreateWorkplaceProps } from '../CreateWorkplace'
import Workplace from './components/Workplace'
import {
  Wrapper,
  TitleRent,
  TextRent,
  Text,
  WrapperWorkplace,
  ButtonCustom,
} from './styles'
import { ISalonWorkplace } from 'src/types/workplace'

interface Props
  extends Omit<ICreateWorkplaceProps, 'workplace' | 'setWorkplace'> {
  refetchSalonLoad: boolean
}

const RentWorkplaceForm: FC<Props> = ({
  salon,
  refetchSalon,
  refetchSalonLoad,
  rentalPeriods,
  groupedEquipments,
  paymentMethods,
  quantityFields,
  workplaceTypes,
}) => {
  const [createWorkplace, setCreateWorkplace] = useState<boolean>(false)
  const [workplace, setWorkplace] = useState<ISalonWorkplace | null>(null)

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
          workplace={workplace}
          salon={salon}
          setWorkplace={setWorkplace}
          refetchSalon={refetchSalon}
          rentalPeriods={rentalPeriods}
          groupedEquipments={groupedEquipments}
          quantityFields={quantityFields}
          paymentMethods={paymentMethods}
          workplaceTypes={workplaceTypes}
        />
      )}
    </Wrapper>
  )
}

export default RentWorkplaceForm
