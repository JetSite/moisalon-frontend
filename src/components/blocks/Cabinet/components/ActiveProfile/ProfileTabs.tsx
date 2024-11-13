import { FC } from 'react'
import { ButtonWrapper, SalesTabButton } from '../CabinetSales/styles'
import { ButtonProps } from 'src/components/ui/Button'
import { IActiveProfilesView } from '../CabinetVacancies/components/ActiveVacanciesProfile'

interface Props extends ButtonProps {
  view: IActiveProfilesView
}

export const ProfileTabs: FC<Props> = ({
  disabled,
  font,
  size,
  onClick,
  variant,
  view,
}) => {
  return (
    <ButtonWrapper>
      <SalesTabButton
        size={size}
        onClick={onClick}
        variant={variant}
        font={font}
        name="publish"
        disabled={view === 'publish'}
        role="tab"
        aria-selected={view === 'publish'}
        aria-controls="publish-panel"
      >
        Активные
      </SalesTabButton>
      <SalesTabButton
        size={size}
        onClick={onClick}
        variant={variant}
        font={font}
        name="draft"
        disabled={view === 'draft'}
        role="tab"
        aria-selected={view === 'draft'}
        aria-controls="publish-panel"
      >
        Не активные
      </SalesTabButton>
    </ButtonWrapper>
  )
}
