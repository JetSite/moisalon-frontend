import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { Wrapper, ActiveStar, DisableStar } from './styled'
import Popup from '../Popup'
import Button from '../Button'
import { IMe } from 'src/types/me'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { ISetState } from 'src/types/common'

interface Props {
  rating: number
  newRating: number
  handleChangeRating: (num: number) => void
}

const RatingEdit: FC<Props> = ({ rating, newRating, handleChangeRating }) => {
  let countNum =
    Math.round(rating) > 0 && Math.round(rating) < 6 ? Math.round(rating) : 0
  const [hover, setHover] = useState<number | null>(null)
  const [openPopup, setOpenPopup] = useState(false)
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)

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
              userValue={newRating > i}
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
              userValue={newRating > i}
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
