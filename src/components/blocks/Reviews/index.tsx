import { ChangeEvent, FC, useEffect, useState } from 'react'
import { MainContainer, MobileVisible } from '../../../styles/common'
import {
  Wrapper,
  Top,
  Title,
  Count,
  Content,
  Review,
  ReviewTop,
  Name,
  Text,
  Buttons,
  Form,
  FormButtons,
} from './styled'
import { useRouter } from 'next/router'
import Stars from '../../ui/Stars'
import Button from '../../ui/Button'
import { TextField } from '@material-ui/core'
import nameRedact from '../../../utils/nameRedact'
import goalIdObjects from '../../../lib/goalIdObjects'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IID, ISetState } from 'src/types/common'
import { IReview } from 'src/types/reviews'
import { IMutations } from 'src/api/types'
import { ReviewSkeleton } from 'src/components/skeletons/reviews'

interface Props {
  type: string | 'BRAND' | 'SALON' | 'MASTER'
  id: IID
  reviews: IReview[]
  reviewMutation: IMutations
  loading?: boolean
  setLoading: ISetState<boolean>
}

const Reviews: FC<Props> = ({
  type,
  id,
  reviews,
  reviewMutation,
  loading,
  setLoading,
}) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const { review } = goalIdObjects(`/${router.pathname.split('/')[1]}`)

  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [showAll, setShowAll] = useState(false)

  const handleReviews = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setReviewText(e.target.value)
  }

  const sendMessage = () => {
    setLoading(true)
    if (type === 'EDUCATION') {
      reviewMutation({
        variables: {
          input: {
            description: reviewText,
            originId: id,
          },
        },
      })
      setReviewOpen(false)
      setReviewText('')
      return
    }
    if (type === 'PRODUCT') {
      console.log('product')
      reviewMutation({
        variables: {
          user: me?.info.id,
          id,
          content: reviewText,
          publishedAt: new Date().toISOString(),
        },
      })
      setReviewOpen(false)
      setReviewText('')
      return
    }
    if (reviewText) {
      reviewMutation({
        variables: {
          user: me?.info.id,
          id,
          content: reviewText,
        },
      })
      setReviewOpen(false)
      setReviewText('')
    }
  }

  return (
    <MainContainer id="reviews">
      <Wrapper>
        <Top>
          <Title>Отзывы</Title>
          <Count>
            <span>{reviews?.length}</span>
          </Count>
        </Top>
        <Content>
          {reviews?.slice(0, showAll ? undefined : 4).map(item => (
            <Review key={item?.id}>
              <ReviewTop>
                <Name>
                  {(item?.user?.username && nameRedact(item?.user?.username)) ||
                    (item?.user?.email && nameRedact(item?.user?.email)) ||
                    (item?.user?.phone && nameRedact(item?.user?.phone)) ||
                    ''}
                </Name>
                <Stars count={Number(item.rating?.title)} />
              </ReviewTop>
              <Text>{item.content}</Text>
            </Review>
          ))}
          {loading && <ReviewSkeleton />}
        </Content>
        <Buttons>
          {!showAll ? (
            reviews?.length > 4 ? (
              <Button
                variant="red"
                size="medium"
                onClick={() => setShowAll(true)}
                style={{ marginRight: 19 }}
              >
                Все отзывы
              </Button>
            ) : null
          ) : null}
          <Button
            variant="darkTransparent"
            size="medium"
            onClick={() => {
              ;(window as any).dataLayer.push({
                event: 'event',
                eventProps: {
                  category: 'click',
                  action: review,
                },
              })
              if (!me?.info) {
                router.push('/login')
              } else {
                setReviewOpen(!reviewOpen)
              }
            }}
          >
            {!reviewOpen ? 'Оставить отзыв' : 'Закрыть'}
          </Button>
        </Buttons>
        <MobileVisible>
          {!showAll ? (
            reviews?.length > 4 ? (
              <Button
                size="roundSmall"
                variant="withRoundBorder"
                font="roundSmall"
                mb="42"
                onClick={() => setShowAll(true)}
              >
                Смотреть все отзывы
              </Button>
            ) : null
          ) : null}
          <Button
            size="fullWidth"
            variant="gray"
            font="small"
            mb="67"
            onClick={() => {
              if (!me?.info) {
                router.push('/login')
              } else {
                setReviewOpen(true)
              }
            }}
          >
            Написать отзыв
          </Button>
        </MobileVisible>
        {reviewOpen ? (
          <Form>
            <TextField
              id="outlined-multiline-static"
              label=""
              multiline
              minRows={4}
              defaultValue={reviewText}
              variant="outlined"
              onChange={handleReviews}
            />
            <FormButtons>
              <Button
                variant="secondary"
                style={{ marginRight: 24 }}
                onClick={() => {
                  setReviewOpen(false)
                  setReviewText('')
                }}
              >
                Отмена
              </Button>
              <Button
                variant="red"
                onClick={() => {
                  sendMessage()
                }}
              >
                Отправить
              </Button>
            </FormButtons>
          </Form>
        ) : null}
      </Wrapper>
    </MainContainer>
  )
}

export default Reviews
