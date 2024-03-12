import { useState } from "react";
import { MainContainer, MobileVisible } from "../../../styles/common";
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
} from "./styled";
import { useRouter } from "next/router";
import Stars from "../../ui/Stars";
import Button from "../../ui/Button";
import { TextField } from "@material-ui/core";
import nameRedact from "../../../utils/nameRedact";
import goalIdObjects from "../../../lib/goalIdObjects";

const Reviews = ({ type, id, reviews, reviewMutation, me }) => {
  const router = useRouter();

  const { review } = goalIdObjects(`/${router.pathname.split("/")[1]}`);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handleReviews = (e) => {
    setReviewText(e.target.value);
  };

  const sendMessage = () => {
    if (type === "EDUCATION") {
      reviewMutation({
        variables: {
          input: {
            description: reviewText,
            originId: id,
          },
        },
      });
      setReviewOpen(false);
      setReviewText("");
      return;
    }
    if (reviewText) {
      reviewMutation({
        variables: {
          input: {
            description: reviewText,
            name: me.info.displayName || me.info.phoneNumber || me.info.email,
            origin: type,
            originId: id,
          },
        },
      });
      setReviewOpen(false);
      setReviewText("");
    }
  };

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
          {reviews?.slice(0, showAll ? undefined : 4).map((item) => (
            <Review key={item?.id}>
              <ReviewTop>
                <Name>
                  {(item?.name && nameRedact(item?.name)) ||
                    item?.user?.displayName ||
                    (item?.user?.email && nameRedact(item?.user?.email)) ||
                    (item?.user?.phoneNumber &&
                      nameRedact(item?.user?.phoneNumber)) ||
                    ""}
                </Name>
                <Stars count={5} />
              </ReviewTop>
              <Text>{item?.description}</Text>
            </Review>
          ))}
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
              window.dataLayer.push({
                event: "event",
                eventProps: {
                  category: "click",
                  action: review,
                },
              });
              if (!me?.info) {
                router.push("/login");
              } else {
                setReviewOpen(true);
              }
            }}
          >
            Оставить отзыв
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
                router.push("/login");
              } else {
                setReviewOpen(true);
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
              rows={4}
              defaultValue={reviewText}
              variant="outlined"
              onChange={(e) => handleReviews(e)}
            />
            <FormButtons>
              <Button
                variant="secondary"
                style={{ marginRight: 24 }}
                onClick={() => {
                  setReviewOpen(false);
                  setReviewText("");
                }}
              >
                Отмена
              </Button>
              <Button
                variant="red"
                onClick={() => {
                  sendMessage();
                }}
              >
                Отправить
              </Button>
            </FormButtons>
          </Form>
        ) : null}
      </Wrapper>
    </MainContainer>
  );
};

export default Reviews;
