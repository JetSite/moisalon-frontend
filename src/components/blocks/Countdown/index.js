import { useEffect, useState } from "react";
import { pluralize } from "../../../utils/pluralize";
import { Wrapper, Title, CountWrapper, Value, Days, Dots, End } from "./styles";

const Countdown = ({
  dateStart,
  dateEnd,
  titleStart,
  titleEnd,
  text,
  align,
}) => {
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isStarted, setIsStarted] = useState(null);

  const addZero = (n) => {
    return (n < 10 ? "0" : "") + n;
  };

  const now = new Date().getTime();
  const start = new Date(dateStart).getTime();
  const end = new Date(dateEnd).getTime();
  const startTimeDistance = start - now;
  const endTimeDistance = end - now;

  useEffect(() => {
    if (startTimeDistance > 0) {
      setDistance(startTimeDistance);
      setIsStarted(false);
    } else if (startTimeDistance < 0) {
      setDistance(endTimeDistance);
      setIsStarted(true);
    }
    const interval = setInterval(() => {
      const nowInterval = new Date().getTime();
      setDistance(distance - nowInterval);
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [distance]);

  return (
    <>
      {seconds != null ? (
        <Wrapper>
          {distance > 0 ? (
            <Title align={align}>{!isStarted ? titleStart : titleEnd}</Title>
          ) : null}
          {distance < 0 ? (
            <End>{text}</End>
          ) : distance ? (
            <CountWrapper align={align}>
              <Days>{`${days} ${pluralize(days, "день", "дня", "дней")}`}</Days>
              <Value>{addZero(hours)}</Value>
              <Dots>:</Dots>
              <Value>{addZero(minutes)}</Value>
              <Dots>:</Dots>
              <Value>{addZero(seconds)}</Value>
            </CountWrapper>
          ) : null}
        </Wrapper>
      ) : null}
    </>
  );
};

export default Countdown;
