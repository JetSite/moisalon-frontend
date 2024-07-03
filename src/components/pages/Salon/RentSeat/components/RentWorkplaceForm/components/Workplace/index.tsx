import styled from 'styled-components'
import Button from '../../../../../../../ui/Button'
import { deleteSeatMutation } from '../../../../../../../../_graphql-legacy/salon/deleteSeatMutation'
import { useMutation } from '@apollo/client'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'
import { FC, MouseEvent } from 'react'
import { ISalonWorkplaces } from 'src/types'
import { PHOTO_URL } from 'src/api/variables'
import { ISalonPage } from 'src/types/salon'
import { IApolloRefetch, IID } from 'src/types/common'
import { DELETE_WORKPLACE } from 'src/api/graphql/salon/mutations/deleteWorkPlace'

const Wrapper = styled.div<{ url: string }>`
  height: 200px;
  width: 300px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background: ${props => `url(${props.url})`};
  background-size: cover;
  border-radius: 5px;
  position: relative;
  margin-bottom: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  }
`

const Wrap = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 308px;
    margin: 0;
  }
`

const Name = styled.p`
  width: fit-content;
  max-width: 100%;
  position: absolute;
  background: #fff;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 14px;
  top: 15px;
  left: 15px;
  right: 15px;
`

interface Props {
  workplace: ISalonWorkplaces
  onClick: (e: MouseEvent<HTMLDivElement>) => void
  salon: ISalonPage
  refetchSalon: IApolloRefetch
}

const Workplace: FC<Props> = ({ workplace, onClick, salon, refetchSalon }) => {
  const [deleteWorkplace] = useMutation(DELETE_WORKPLACE, {
    onCompleted: () => {
      refetchSalon()
    },
  })
  const handleDelete = () => {
    deleteWorkplace({
      variables: {
        id: workplace.id,
      },
    })
  }

  return (
    <Wrap>
      {
        <Wrapper onClick={onClick} url={PHOTO_URL + workplace?.cover?.url}>
          {workplace.title ? <Name>{workplace.title}</Name> : null}
        </Wrapper>
      }
      <Button onClick={() => handleDelete()} size="fullWidth" variant="red">
        Удалить
      </Button>
    </Wrap>
  )
}

export default Workplace
