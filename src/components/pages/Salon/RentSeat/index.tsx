import { FC, useState } from 'react'
import { MainContainer, MobileHidden } from '../../../../styles/common'
import Header from '../../MainPage/components/Header'
import Controls from '../../../blocks/Form/Controls'
import { Wrapper } from './styles'
import CabinetHeaderMobile from '../../../blocks/Cabinet/components/CabinetHeaderMobile'
import RentSeatForm from './components/RentSeatForm'
import { PHOTO_URL } from 'src/api/variables'
import { ISalonPage } from 'src/types/salon'
import { useLazyQuery, useQuery } from '@apollo/client'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

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
}

const RentSeat: FC<Props> = ({ salonData, seatActivities, seatEquipment }) => {
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
      href: '/createSalon',
      link: salonData.id,
      back: true,
    },
  ])

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
                  ? { ...salon.logo, url: `${PHOTO_URL}${salonData.logo.url}` }
                  : { url: '/empty-photo.svg', id: 'default', name: 'default' }
              }
            />
          </MobileHidden>
          {salonData?.rent ? (
            <RentSeatForm
              refetchSalonLoad={loading}
              refetchSalon={refetchSalon}
              salon={salon}
              seatActivities={seatActivities}
              seatEquipment={seatEquipment}
            />
          ) : null}
        </Wrapper>
      </MainContainer>
    </>
  )
}

export default RentSeat
