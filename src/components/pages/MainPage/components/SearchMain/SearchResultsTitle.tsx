import React, { FC } from 'react'
import { Title } from './styled'
import { getTitle } from './utils/getTitle'

interface SearchResultsTitleProps {
  totalCount: number
  noFoundText: string
  prepareTitle: string
  prepareSubTitle?: string
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
    prepareSubTitle: prepareSubTitle ?? null,
    search,
    totalCount,
    main,
    noFoundText,
  })

  return (
    <div role="region" aria-label="Search Results Summary">
      {title ? <Title>{title}</Title> : null}
      {subTitle ? <Title as="h2">{subTitle}</Title> : null}
    </div>
  )
}

export default SearchResultsTitle
