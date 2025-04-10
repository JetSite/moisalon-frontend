import { FC } from 'react';
import Stars from '../Stars';
import styled from 'styled-components';

const Wrapper = styled.div<{ position?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props?.position === 'start'
      ? 'flex-start'
      : props?.position === 'justify'
      ? 'space-between'
      : 'center'};
`;

const Count = styled.p<{ fontSize: string; fontWeight: number }>`
  color: #727272;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
`;

interface Props {
  rating?: number;
  countRatings?: number;
  countReviews?: number;
  position?: string;
  fontSize?: string;
  fontWeight?: number;
}

const Rating: FC<Props> = ({
  rating,
  countRatings,
  countReviews,
  position,
  fontSize = '10px',
  fontWeight = 400,
}) => {
  return (
    <Wrapper position={position}>
      <Wrapper>
        <Stars count={Math.round(rating || 0)} />
        <Count fontSize={fontSize} fontWeight={fontWeight}>
          {!!rating &&
            !!countRatings &&
            rating > 0 &&
            countRatings > 0 &&
            `${rating}(${countRatings || 1})`}
        </Count>
      </Wrapper>

      {!!countReviews && countReviews > 0 && (
        <Count fontSize={fontSize} fontWeight={fontWeight}>
          {`${countReviews || 0}`}
        </Count>
      )}
    </Wrapper>
  );
};

export default Rating;
