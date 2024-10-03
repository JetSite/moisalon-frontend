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
  EditButton,
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
import RatingEdit from 'src/components/ui/RatingEdit'
import { parseToNumber } from 'src/utils/newUtils/common'
import { useMutation } from '@apollo/client'
import { UPDATE_REVIEW } from 'src/api/graphql/salon/mutations/updateReviews'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import splitArray from 'src/utils/newUtils/common/splitArray'

interface Props {
  type: string | 'BRAND' | 'SALON' | 'MASTER'
  id: IID
  reviews: IReview[]
  reviewMutation: IMutations
  loading?: boolean
  setLoading: ISetState<boolean>
  setUpdatedReviews: ISetState<IReview[]>
}

const Reviews: FC<Props> = ({
  type,
  id,
  reviews,
  reviewMutation,
  loading,
  setLoading,
  setUpdatedReviews,
}) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const { review } = goalIdObjects(`/${router.pathname.split('/')[1]}`)
  const [rating, setRating] = useState<number>(0)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [editID, setEditID] = useState<string | null>(null)
  const [updateReview] = useMutation(UPDATE_REVIEW, {
    onCompleted: data => {
      const prepareData = flattenStrapiResponse(data.updateReview) as IReview
      const findIndex = reviews.findIndex(e => e.id === prepareData.id)
      setUpdatedReviews(prev => {
        const [start, end] = splitArray(prev, findIndex, false)
        return [...start, prepareData, ...end]
      })
      setLoading(false)
    },
  })

  const handleReviews = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setReviewText(e.target.value)
  }

  const sendMessage = () => {
    console.log(rating)

    if (editID) {
      updateReview({
        variables: {
          itemID: editID,
          content: reviewText,
          rating: rating > 0 ? rating : null,
        },
      })
      setEditID(null)
      setReviewOpen(false)
      setReviewText('')
      setRating(0)
      return
    }
    setLoading(true)
    if (type === 'EDUCATION') {
      reviewMutation({
        variables: {
          user: me?.info.id,
          id,
          content: reviewText,
          rating: rating > 0 ? rating : null,
          publishedAt: new Date().toISOString(),
        },
      })
      setReviewOpen(false)
      setReviewText('')
      setRating(0)

      return
    }
    if (type === 'PRODUCT') {
      reviewMutation({
        variables: {
          user: me?.info.id,
          id,
          rating: rating > 0 ? rating : null,
          content: reviewText,
          publishedAt: new Date().toISOString(),
        },
      })
      setReviewOpen(false)
      setReviewText('')
      setRating(0)

      return
    }
    if (reviewText) {
      reviewMutation({
        variables: {
          user: me?.info.id,
          id,
          rating: rating > 0 ? rating : null,
          content: reviewText,
          publishedAt: new Date().toISOString(),
        },
      })
      setReviewOpen(false)
      setReviewText('')
      setRating(0)
    }
  }

  const handleEdit = (item: IReview) => {
    setEditID(item.id)
    const rating = parseToNumber(item.rating?.id) || 0
    setRating(rating)
    setReviewOpen(true)
    setReviewText(item.content)
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
              {me?.info.id === item.user.id && (
                <EditButton onClick={() => handleEdit(item)}>
                  редактировать
                </EditButton>
              )}
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
            <RatingEdit
              newRating={rating}
              handleChangeRating={e => {
                setRating(e)
              }}
              rating={0}
            />
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
                  setRating(0)
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
                {editID ? 'Изменить' : 'Отправить'}
              </Button>
            </FormButtons>
          </Form>
        ) : null}
      </Wrapper>
    </MainContainer>
  )
}

export default Reviews
