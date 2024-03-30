import styled from 'styled-components'
import Button from '../../../../../../../ui/Button'
import { deleteSeatMutation } from '../../../../../../../../_graphql-legacy/salon/deleteSeatMutation'
import { useMutation } from '@apollo/client'
import { laptopBreakpoint } from '../../../../../../../../styles/variables'

const Wrapper = styled.div`
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

const Seat = ({
  seat,
  onClick,
  salon,
  refetchSalon,
  roomId,
  seatActivities,
}) => {
  const [deleteSeat] = useMutation(deleteSeatMutation, {
    onCompleted: () => {
      refetchSalon()
    },
  })
  const handleDelete = () => {
    deleteSeat({
      variables: {
        salonId: salon.id,
        roomId,
        seatId: seat.id,
      },
    })
  }

  const seatActivity = seatActivities?.groups?.filter(
    activity => activity.id === seat?.activities[0],
  )

  return (
    <Wrap>
      <Wrapper onClick={onClick} url={seat?.photo?.url}>
        {seatActivity[0]?.title ? <Name>{seatActivity[0]?.title}</Name> : null}
      </Wrapper>
      <Button onClick={() => handleDelete()} size="fullWidth" variant="red">
        Удалить
      </Button>
    </Wrap>
  )
}

export default Seat
