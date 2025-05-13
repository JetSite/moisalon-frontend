import { FC, useMemo, useState } from 'react'
import { MainContainer, MobileHidden } from '../../../../styles/common'
import Header from '../../MainPage/components/Header'
import Controls from '../../../blocks/Form/Controls'
import { Wrapper } from './styles'
import CabinetHeaderMobile from '../../../blocks/Cabinet/components/CabinetHeaderMobile'
import RentWorkplaceForm from './components/RentWorkplaceForm'
import { PHOTO_URL } from 'src/api/variables'
import { ISalonPage } from 'src/types/salon'
import { useLazyQuery } from '@apollo/client'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import {
  IPaymentMethods,
  IPhoto,
  IRentalPeriod,
  IWorkplacesType,
} from 'src/types'
import { IGroupedCategories } from 'src/utils/getGrupedServices'
import { quantityFieldsConfig } from './config'
import { getStoreData } from '@/store/utils'
import useAuthStore from '@/store/authStore'

export interface IRentSeatProps {
  salonData: ISalonPage
  rentalPeriods: IRentalPeriod[]
  groupedEquipments: IGroupedCategories[]
  paymentMethods: IPaymentMethods[]
  workplaceTypes: IWorkplacesType[]
}

const RentSeat: FC<IRentSeatProps> = ({
  salonData,
  rentalPeriods,
  groupedEquipments,
  paymentMethods,
  workplaceTypes,
}) => {
  const { city } = useAuthStore(getStoreData)
  const [salon, setSalon] = useState<ISalonPage>(salonData)
  const quantityFields = useMemo(() => quantityFieldsConfig, [])
  const [refetchSalon, { loading }] = useLazyQuery(getSalonPage, {
    variables: { id: salonData.id },
    onCompleted: async data => {
      const prepareData = await flattenStrapiResponse(data.salon)

      setSalon(prepareData)
    },
  })

  const tabs = useMemo(
    () => [
      {
        id: '1',
        value: 'Данные салона',
        anchor: 'cabinet',
        href: `/${city.slug}/rent/${salonData.id}`,
        link: '',
        back: true,
      },
    ],
    [salonData],
  )

  return (
    <>
      <Header />
      <MainContainer>
        <CabinetHeaderMobile category={salon} />
        <Wrapper>
          <MobileHidden>
            <Controls
              tabs={tabs}
              photoType={'salon'}
              noSetPhoto={true}
              photo={
                salonData.logo
                  ? {
                      ...(salon.logo as IPhoto),
                      url: `${PHOTO_URL}${salonData.logo.url}`,
                    }
                  : { url: '/empty-photo.svg', id: 'default', name: 'default' }
              }
            />
          </MobileHidden>
          <RentWorkplaceForm
            refetchSalonLoad={loading}
            refetchSalon={refetchSalon}
            rentalPeriods={rentalPeriods}
            groupedEquipments={groupedEquipments}
            salon={salon}
            paymentMethods={paymentMethods}
            quantityFields={quantityFields}
            workplaceTypes={workplaceTypes}
          />
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default RentSeat
