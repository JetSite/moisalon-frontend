import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'
import Button from '../../ui/Button'
import { PHOTO_URL } from '../../../variables'

const BannerWrap = styled.div`
  width: 375px;
  height: 340px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
  transition: 0.2s;
  margin-top: 20px;

  &:hover {
    opacity: 0.9;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 375px;
    height: 280px;
  }
`

const Wrap = styled.div`
  width: 375px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 375px;
    height: 280px;
  }
`

const BannerTop = styled.div`
  width: 100%;
  height: 163px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  @media (max-width: ${laptopBreakpoint}) {
    height: 133px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const BannerContent = styled.div`
  padding: 30px 25px;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 177px;
  @media (max-width: ${laptopBreakpoint}) {
    height: 147px;
  }
`

const BannerTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  margin-top: 8px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: initial;
  }
`

const BannerText = styled.p`
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: initial;
  }
`

const Status = styled.p`
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;
  color: #f03;
`

const Banner = ({ item, handleDelete }) => {
  return (
    <>
      <BannerWrap>
        <BannerTop>
          <Image alt="photo" src={`${PHOTO_URL}${item.photoId}/original`} />
        </BannerTop>
        <BannerContent>
          <BannerTitle>{item.adHeader}</BannerTitle>
          <BannerText>{item.adText}</BannerText>
        </BannerContent>
      </BannerWrap>
      <Wrap>
        <Status>
          Статус:{' '}
          {item.status === 'New '
            ? 'Новый'
            : item.status === 'Confirmed'
            ? 'Подтвержденный'
            : 'Новый'}
        </Status>
        <Button
          onClick={() => handleDelete(item)}
          size="fullWidth"
          variant="red"
        >
          Удалить
        </Button>
      </Wrap>
    </>
  )
}

export default Banner
