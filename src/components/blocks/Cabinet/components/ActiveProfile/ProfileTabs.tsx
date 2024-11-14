import { FC } from 'react'
import { ButtonWrapper, SalesTabButton } from '../CabinetSales/styles'
import { ButtonProps } from 'src/components/ui/Button'
import { IActiveProfilesView } from '../CabinetVacancies/components/ActiveVacanciesProfile'

interface ProfileTabsProps extends ButtonProps {
  view: IActiveProfilesView
}

export const ProfileTabs: FC<ProfileTabsProps> = ({
  font,
  size,
  onClick,
  variant,
  view,
}) => {
  return (
    <ButtonWrapper role="tablist">
      <SalesTabButton
        size={size}
        onClick={onClick}
        variant={variant}
        font={font}
        name="publish"
        disabled={view === 'publish'}
        role="tab"
        aria-selected={view === 'publish'}
        tabIndex={view === 'publish' ? 0 : -1}
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
        tabIndex={view === 'publish' ? 0 : -1}
      >
        Не активные
      </SalesTabButton>
    </ButtonWrapper>
  )
}
