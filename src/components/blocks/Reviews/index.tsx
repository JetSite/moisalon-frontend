import { ChangeEvent, FC, useState } from 'react'
import { MainContainer, MobileVisible } from '../../../styles/common'
import * as Styled from './styled'
import { useRouter } from 'next/router'
import Stars from '../../ui/Stars'
import Button from '../../ui/Button'
import { TextField } from '@mui/material'
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
import { TrashIcon } from 'src/components/ui/Icons/Trash'

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

  const handleDelete = () => {
    updateReview({
      variables: {
        itemID: editID,
        publishedAt: null,
      },
      onCompleted: data => {
        const prepareData = flattenStrapiResponse(data.updateReview) as IReview
        const findIndex = reviews.findIndex(e => e.id === prepareData.id)
        setUpdatedReviews(prev => {
          const [start, end] = splitArray(prev, findIndex, false)
          return [...start, ...end]
        })
      },
    })
    setReviewOpen(false)
    editingReviewClear()
  }

  const sendMessage = () => {
    if (editID) {
      updateReview({
        variables: {
          itemID: editID,
          content: reviewText,
          rating: rating > 0 ? rating : null,
        },
      })
      editingReviewClear()
      return
    }
    if (reviewText) {
      setLoading(true)
      reviewMutation({
        variables: {
          user: me?.info.id,
          id,
          rating: rating > 0 ? rating : null,
          content: reviewText,
          publishedAt: new Date().toISOString(),
        },
      })
      editingReviewClear()
      return
    }
  }

  const handleEdit = (item: IReview) => {
    setEditID(item.id)
    const rating = parseToNumber(item.rating?.id) || 0
    setRating(rating)
    setReviewOpen(true)
    setReviewText(item.content)
  }

  const editingReviewClear = () => {
    setEditID(null)
    setRating(0)
    setReviewText('')
  }

  return (
    <MainContainer id="reviews">
      <Styled.Wrapper>
        <Styled.Top>
          <Styled.Title>Отзывы</Styled.Title>
          <Styled.Count>
            <span>{reviews?.length}</span>
          </Styled.Count>
        </Styled.Top>
        <Styled.Content>
          {reviews?.slice(0, showAll ? undefined : 4).map(item => (
            <Styled.Review active={item.id === editID} key={item?.id}>
              <Styled.ReviewTop>
                <Styled.Name>
                  {(item?.user?.username && nameRedact(item?.user?.username)) ||
                    (item?.user?.email && nameRedact(item?.user?.email)) ||
                    (item?.user?.phone && nameRedact(item?.user?.phone)) ||
                    ''}
                </Styled.Name>
                <Stars count={Number(item.rating?.title)} />
              </Styled.ReviewTop>
              <Styled.Text>{item.content}</Styled.Text>
              {me?.info.id === item.user.id && (
                <Styled.EditButton
                  disabled={item.id === editID}
                  onClick={() => handleEdit(item)}
                >
                  редактировать
                </Styled.EditButton>
              )}
            </Styled.Review>
          ))}
          {loading && <ReviewSkeleton />}
        </Styled.Content>
        <Styled.Buttons>
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
                reviewOpen && editingReviewClear()
              }
            }}
          >
            {!reviewOpen ? 'Оставить отзыв' : 'Закрыть'}
          </Button>
        </Styled.Buttons>
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
          {!reviewOpen && (
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
                  editingReviewClear()
                }
              }}
            >
              Написать отзыв
            </Button>
          )}
        </MobileVisible>
        {reviewOpen ? (
          <Styled.Form>
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
              value={reviewText}
              variant="outlined"
              onChange={handleReviews}
            />
            <Styled.FormButtons>
              <Button
                size="fullWidth"
                variant="withBorder"
                onClick={() => {
                  setReviewOpen(false)
                  editingReviewClear()
                }}
              >
                Отмена
              </Button>
              <Styled.FormEditButtons editID={!!editID}>
                <Button
                  size="fullWidth"
                  variant="red"
                  onClick={() => {
                    sendMessage()
                  }}
                >
                  {editID ? 'Изменить' : 'Отправить'}
                </Button>
                {editID && (
                  <Styled.DeleteFormButton
                    size="fullWidth"
                    variant="secondary"
                    onClick={() => {
                      handleDelete()
                    }}
                  >
                    <TrashIcon />
                  </Styled.DeleteFormButton>
                )}
              </Styled.FormEditButtons>
            </Styled.FormButtons>
          </Styled.Form>
        ) : null}
      </Styled.Wrapper>
    </MainContainer>
  )
}

export default Reviews
