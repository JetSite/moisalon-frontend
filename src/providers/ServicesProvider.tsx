import React, { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { IChildren } from 'src/types/common'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import useBaseStore from 'src/store/baseStore'
import { getServiceCategories } from 'src/api/graphql/service/queries/getServiceCategories'

const ServicesProvider: FC<{ children: IChildren }> = ({ children }) => {
  const { catalogs } = useBaseStore(getStoreData)
  const { setCatalogs } = useBaseStore(getStoreEvent)

  const { loading } = useQuery(getServiceCategories, {
    onCompleted: data => {
      console.log('first')
      const prepareData = flattenStrapiResponse(data.serviceCategories)
      setCatalogs(prepareData)
    },
    // skip: !!catalogs?.length,
    onError: err => console.log(err),
    notifyOnNetworkStatusChange: true,
  })

  return <>{!loading && children}</>
}

export default ServicesProvider
