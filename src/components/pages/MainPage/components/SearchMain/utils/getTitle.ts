interface IGetTitleProps {
  prepareTitle: string
  prepareSubTitle: string
  main?: boolean
  search?: boolean
  totalCount: number
  noFoundText: string
}

type GetTitle = (props: IGetTitleProps) => [string | null, string | null]

export const getTitle: GetTitle = ({
  prepareTitle,
  main,
  search,
  totalCount,
  prepareSubTitle,
  noFoundText,
}) => {
  let title: string | null = null
  let subTitle: string | null = null

  if (main) {
    if (totalCount > 0) {
      title = prepareTitle
    } else {
      title = null
    }
    return [title, subTitle]
  }

  if (totalCount > 0) {
    title = prepareTitle
  } else {
    title = noFoundText
  }

  if (!main && !search && totalCount > 0) {
    subTitle = prepareSubTitle
  }

  return [title, subTitle]
}
