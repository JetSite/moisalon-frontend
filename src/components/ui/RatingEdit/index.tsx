import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { Wrapper, ActiveStar, DisableStar } from './styled'
import Popup from '../Popup'
import Button from '../Button'
import { IMe } from 'src/types/me'

interface Props {
  me: IMe
  count: number
  userValue: number
  handleChangeRating: (num: number) => void
}

const RatingEdit: FC<Props> = ({
  me,
  count,
  userValue = 0,
  handleChangeRating,
}) => {
  let countNum = count > 0 && count < 6 ? count : 0
  const [hover, setHover] = useState<number | null>(null)
  const [openPopup, setOpenPopup] = useState(false)
  const router = useRouter()

  return (
    <>
      <Wrapper>
        {[...Array(5)].map((_, i) =>
          countNum > i && !hover ? (
            <ActiveStar
              key={i}
              onClick={() => {
                if (!me?.info) {
                  setOpenPopup(true)
                } else {
                  handleChangeRating(i + 1)
                }
              }}
              active={hover ? hover > i : false}
              userValue={userValue > i}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(null)}
            />
          ) : (
            <DisableStar
              active={hover ? hover > i : false}
              onClick={() => {
                if (!me?.info) {
                  setOpenPopup(true)
                } else {
                  handleChangeRating(i + 1)
                }
              }}
              userValue={userValue > i}
              key={i}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(null)}
            />
          ),
        )}
      </Wrapper>
      <Popup
        isOpen={openPopup}
        title="Для выставления рейтинга необходима регистрация"
      >
        <Button
          style={{ marginTop: 20 }}
          onClick={() => router.push('/login')}
          variant="red"
          font="popUp"
          size="popUp"
        >
          Перейти на страницу регистрации
        </Button>
        <Button
          style={{ marginTop: 20 }}
          onClick={() => setOpenPopup(false)}
          variant="darkTransparent"
          font="small"
          size="popUp"
        >
          Закрыть
        </Button>
      </Popup>
    </>
  )
}

export default RatingEdit
