import { FC, useState } from 'react'
import { MainContainer, MobileHidden } from '../../../../styles/common'
import Header from '../../MainPage/components/Header'
import Controls from '../../../blocks/Form/Controls'
import { Wrapper } from './styles'
import CabinetHeaderMobile from '../../../blocks/Cabinet/components/CabinetHeaderMobile'
import RentWorkplaceForm from './components/RentWorkplaceForm'
import { PHOTO_URL } from 'src/api/variables'
import { ISalonPage } from 'src/types/salon'
import { useLazyQuery, useQuery } from '@apollo/client'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IPhoto, IRentalPeriod } from 'src/types'
import { IEquipment } from 'src/types/equipment'

interface ITab {
  id: string
  value: string
  anchor: string
  href: string
  link: string
  back: boolean
}

interface Props {
  salonData: ISalonPage
  retnalPeriods: IRentalPeriod[]
  equipments: IEquipment[]
}

const RentSeat: FC<Props> = ({ salonData, retnalPeriods, equipments }) => {
  const [salon, setSalon] = useState<ISalonPage>(salonData)
  const [refetchSalon, { loading }] = useLazyQuery(getSalonPage, {
    variables: { id: salonData.id },
    onCompleted: async data => {
      const prepareData = await flattenStrapiResponse(data.salon)

      setSalon(prepareData)
    },
  })

  const [tabs] = useState<ITab[]>([
    {
      id: '1',
      value: 'Данные салона',
      anchor: 'cabinet',
      href: '/rentSalonSeat',
      link: salonData.id,
      back: true,
    },
  ])

  console.log(salon.rent)

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
          {salonData?.rent ? (
            <RentWorkplaceForm
              refetchSalonLoad={loading}
              refetchSalon={refetchSalon}
              retnalPeriods={retnalPeriods}
              equipments={equipments}
              salon={salon}
            />
          ) : null}
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default RentSeat
