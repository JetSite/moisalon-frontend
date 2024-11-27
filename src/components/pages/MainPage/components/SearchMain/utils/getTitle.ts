interface IGetTitleProps {
  prepareTitle: string
  prepareSubTitle: string | null
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
  const title = (() => {
    if (totalCount === 0) {
      return main ? null : noFoundText
    }
    return prepareTitle
  })()

  const subTitle = !main && !search && totalCount > 0 ? prepareSubTitle : null

  return [title, subTitle]
}
