import Link from 'next/link'
import styled from 'styled-components'
import Button from '../../../../../ui/Button'

const Wrapper = styled.div`
  background: #f2f0f0;
  height: 260px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Wrap = styled.div`
  width: 1167px;
  height: 260px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  background: url('/rent-back.png') no-repeat left;
`

const Title = styled.p`
  font-size: 48px;
  font-weight: 500;
  text-transform: uppercase;
`

const Text = styled.p`
  width: 380px;
  font-size: 18px;
  margin-right: 75px;
`

const Right = styled.div`
  display: flex;
`

const ButtonWrap = styled.div``

const Banner = () => {
  return (
    <Wrapper>
      <Wrap>
        <Title>
          BEAUTY– <br /> платформа
        </Title>
        <Right>
          <Text>
            Вы можете арендовать или сдать рабочее место, кабинет, студию, салон
          </Text>
          <ButtonWrap>
            <Link href={'/masterCabinet'}>
              <Button variant="darkTransparent">Сдать / Снять</Button>
            </Link>
          </ButtonWrap>
        </Right>
      </Wrap>
    </Wrapper>
  )
}

export default Banner
