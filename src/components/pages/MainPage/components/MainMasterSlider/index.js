import { useContext } from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { mastersRandomQuery } from '../../../../../_graphql-legacy/mastersRandomQuery'
import catalogOrDefault from '../../../../../utils/catalogOrDefault'
import { CatalogsContext } from '../../../../../searchContext'
import Slider from '../../../../blocks/Slider'
import { getMasters } from 'src/graphql/master/queries/getMasters'
import MastersResult from 'src/components/pages/ServicesPage/components/ServicesList/MastersResult'

const MainMasterSlider = ({ me }) => {
  let cityInStorage
  if (typeof window !== 'undefined') {
    cityInStorage = localStorage.getItem('citySalon')
  }
  const catalogs = useContext(CatalogsContext)

  // const masterSpecializationsCatalog = catalogOrDefault(
  //   catalogs?.masterSpecializationsCatalog,
  // )

  const { data: masters, loading } = useQuery(getMasters)

  return (
    <Slider
      type="masters"
      noScroll
      loading={loading}
      items={masters?.masters?.data}
      title="Бьюти-мастера"
      catalog={{}}
      bgColor="#f2f0f0"
      pt={102}
      pb={91}
      noPadding
      pl={20}
    />
  )
}

export default MainMasterSlider
