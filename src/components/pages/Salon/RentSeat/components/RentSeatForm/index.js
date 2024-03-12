import { useState, useEffect } from "react";
import CreateSeat from "../CreateSeat";
import Seat from "./components/Seat";
import {
  Wrapper,
  TitleRent,
  TextRent,
  Text,
  WrapperSeats,
  ButtonCustom,
} from "./styles";

const RentSeatForm = ({
  salon,
  refetchSalon,
  seatActivities,
  seatEquipment,
}) => {
  const [createSeat, setCreateSeat] = useState(false);
  const [seatSalon, setSeatSalon] = useState(null);
  const [roomSeatId, setRoomSeatId] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const room = salon?.rooms?.filter(
      (roomElement) => roomElement.id === roomSeatId
    );
    setRoom(room[0]);
    setSeatSalon(room[0]?.seats[0]);
  }, [salon, refetchSalon, roomSeatId]);

  return (
    <Wrapper>
      {!createSeat ? (
        <>
          <TitleRent>{salon?.name}</TitleRent>
          <TextRent>Рабочие места салона</TextRent>
          {salon?.rooms?.length ? (
            <WrapperSeats>
              {salon?.rooms.map((item) =>
                item?.seats.map((el) => (
                  <Seat
                    salon={salon}
                    seat={el}
                    refetchSalon={refetchSalon}
                    key={el.id}
                    roomId={item.id}
                    onClick={() => {
                      setSeatSalon(el);
                      setCreateSeat(true);
                      setRoomSeatId(item.id);
                      setRoom(item);
                    }}
                    seatActivities={seatActivities}
                  />
                ))
              )}
            </WrapperSeats>
          ) : (
            <Text>У салона нет рабочих мест</Text>
          )}
          <ButtonCustom
            style={{ marginTop: 50, marginBottom: 20 }}
            variant="red"
            size="noWidth"
            font="small"
            onClick={() => setCreateSeat(true)}
          >
            Добавить рабочее место
          </ButtonCustom>
        </>
      ) : (
        <CreateSeat
          setCreateSeat={setCreateSeat}
          seatSalon={seatSalon}
          salon={salon}
          setRoomSeatId={setRoomSeatId}
          setSeatSalon={setSeatSalon}
          setRoom={setRoom}
          refetchSalon={refetchSalon}
          roomSeatId={roomSeatId}
          room={room}
          seatActivities={seatActivities}
          seatEquipment={seatEquipment}
        />
      )}
    </Wrapper>
  );
};

export default RentSeatForm;
