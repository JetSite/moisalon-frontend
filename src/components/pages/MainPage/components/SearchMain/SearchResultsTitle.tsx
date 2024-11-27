import React, { FC } from 'react'
import { Title } from './styled'
import { getTitle } from './utils/getTitle'

interface SearchResultsTitleProps {
  totalCount: number
  noFoundText: string
  prepareTitle: string
  prepareSubTitle: string
  main?: boolean
  search?: boolean
}

const SearchResultsTitle: FC<SearchResultsTitleProps> = ({
  totalCount,
  main,
  search,
  prepareTitle,
  prepareSubTitle,
  noFoundText,
}) => {
  const [title, subTitle] = getTitle({
    prepareTitle,
    prepareSubTitle,
    search,
    totalCount,
    main,
    noFoundText,
  })

  return (
    <>
      {title ? <Title>{title}</Title> : null}
      {subTitle ? <Title>{subTitle}</Title> : null}
    </>
  )
}

export default SearchResultsTitle
