import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import {
  MainContainer,
  MobileHidden,
  MobileVisible,
} from "../../../styles/common";
import {
  Wrapper,
  Wrap,
  Left,
  ImageBrand,
  Image,
  Right,
  Title,
  Price,
  WrapButton,
  CustomButton,
  TopCustomButton,
  BottomCustomButton,
  QuantityWrap,
  Minus,
  Plus,
  Quantity,
  Description,
} from "../ProductPage/styled";
import {
  CityContext,
  MeContext,
  ProductsContext,
} from "../../../searchContext";
import { PHOTO_URL } from "../../../../variables";
import BackButton from "../../ui/BackButton";
import Reviews from "../../blocks/Reviews";
import { createReviewMutation } from "../../../_graphql-legacy/createReviewMutation";
import Button from "../../ui/Button";
import { getB2cCart } from "../../../_graphql-legacy/cart/getB2cCart";
import { addToCartB2cMutation } from "../../../_graphql-legacy/cart/addToB2cCart";
import { removeItemB2cMutation } from "../../../_graphql-legacy/cart/removeItemB2c";
import { reviewsforProductB2c } from "../../../_graphql-legacy/reviewsforProductB2c";
import Rating from "../../ui/Rating";
import { cyrToTranslit } from "../../../utils/translit";

const ProductPageB2c = ({ product, dataReviews, brand }) => {
  const [, setProductsState] = useContext(ProductsContext);
  const [city] = useContext(CityContext);
  const [reviews, setReviews] = useState(dataReviews);
  const [me] = useContext(MeContext);

  const router = useRouter();

  const { refetch: refetchReviews } = useQuery(reviewsforProductB2c, {
    variables: { originId: product.id },
    skip: true,
    onCompleted: (res) => {
      setReviews(res);
    },
  });

  const [reviewMutation] = useMutation(createReviewMutation, {
    onCompleted: () => {
      refetchReviews();
    },
  });

  const { data: dataCart, refetch: refetchCart } = useQuery(getB2cCart, {
    onCompleted: (res) => {
      setProductsState(res?.getCart?.contents || []);
    },
  });

  const cart = dataCart?.getCart?.contents || [];

  const [addToCart] = useMutation(addToCartB2cMutation, {
    onCompleted: () => {
      refetchCart();
    },
  });

  const [removeItem] = useMutation(removeItemB2cMutation, {
    onCompleted: () => {
      refetchCart();
    },
  });

  const add = (item, quantity) => {
    addToCart({
      variables: {
        input: {
          productId: item.id,
          quantity,
          isB2b: false,
        },
      },
    });
  };

  const deleteItem = (item) => {
    removeItem({
      variables: {
        input: {
          items: [{ key: item.key, quantity: item.quantity - 1 }],
          isB2b: false,
        },
      },
    });
  };

  const newItem = cart?.find((el) => el?.product?.id === product.id)
    ? cart?.find((el) => el?.product?.id === product.id)
    : { product: { ...product }, quantity: 0 };

  return (
    <MainContainer>
      <Wrapper>
        <BackButton
          type="Магазин"
          link={`/${cyrToTranslit(city)}/beautyFreeShop`}
          onlyType
        />
        <Wrap>
          <Left>
            <ImageBrand>
              <Image
                alt="product"
                src={
                  newItem?.product?.photoIds[0]
                    ? ` ${PHOTO_URL}${newItem?.product?.photoIds[0]}/original`
                    : "/cosmetic_placeholder.jpg"
                }
              />
            </ImageBrand>
            <Rating
              averageScore={brand?.averageScore}
              numberScore={brand?.numberScore}
            />
          </Left>
          <Right>
            <Title>{newItem?.product?.title}</Title>
            {brand?.dontShowPrice && !me?.info ? null : (
              <Price>{`${
                (newItem?.product?.currentAmount &&
                  newItem?.product?.currentAmount?.toLocaleString()) ||
                newItem?.product?.currentAmount?.toLocaleString()
              } ₽`}</Price>
            )}
            {newItem?.quantity === 0 ? (
              <>
                <MobileHidden>
                  <Button
                    size="medium"
                    variant="red"
                    font="medium"
                    mt="48"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (me && !me?.info) {
                        router.push(
                          {
                            pathname: "/login",
                            query: { error: "notAuthorized" },
                          },
                          "/login"
                        );
                      } else {
                        add(newItem?.product, 1);
                      }
                    }}
                  >
                    Добавить в корзину
                  </Button>
                </MobileHidden>
                <MobileVisible>
                  <Button
                    size="fullWidth"
                    variant="red"
                    font="popUp"
                    mt="37"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (me && !me?.info) {
                        router.push(
                          {
                            pathname: "/login",
                            query: { error: "notAuthorized" },
                          },
                          "/login"
                        );
                      } else {
                        add(newItem?.product, 1);
                      }
                    }}
                  >
                    Добавить в корзину
                  </Button>
                </MobileVisible>
              </>
            ) : (
              <WrapButton>
                <CustomButton onClick={() => router.push("/cartB2c")}>
                  <TopCustomButton>В корзине</TopCustomButton>
                  <BottomCustomButton>Перейти</BottomCustomButton>
                </CustomButton>
                <QuantityWrap>
                  <Minus onClick={() => deleteItem(newItem)} />
                  <Quantity>{`${newItem?.quantity} шт.`}</Quantity>
                  <Plus onClick={() => add(newItem?.product, 1)} />
                </QuantityWrap>
              </WrapButton>
            )}
            <Description>{newItem?.product?.description || ""}</Description>
          </Right>
        </Wrap>
        <Reviews
          type="PRODUCT"
          id={newItem?.product?.id}
          reviewMutation={reviewMutation}
          reviews={reviews?.reviewsForProduct || []}
          me={me}
        />
      </Wrapper>
    </MainContainer>
  );
};

export default ProductPageB2c;
