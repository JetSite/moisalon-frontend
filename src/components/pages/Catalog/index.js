import { useState } from "react";
import Product from "./components/Product";
import { Wrapper, Title, Content, ButtonWrap } from "./styled";
import { useMutation } from "@apollo/react-hooks";
import Button from "../../../components/ui/Button";
import { addToCartB2cMutation } from "../../../_graphql-legacy/cart/addToB2cCart";
import { removeItemB2cMutation } from "../../../_graphql-legacy/cart/removeItemB2c";
import { MobileHidden, MobileVisible } from "../../../styles/common";
import Popup from "../../ui/Popup";

const Catalog = ({
  products,
  fetchMore,
  hasNextPage,
  loading,
  cart,
  me,
  noTitle,
  refetchLoading,
  catalog = false,
  loadingCart,
  refetchCart,
  brand,
}) => {
  const b2bClient = !!me?.master?.id || !!me?.salons?.length;
  const [openPopup, setOpenPopup] = useState(false);

  // const [addToCart, { loading: addLoading }] = useMutation(addToCartMutation, {
  //   onCompleted: () => {
  //     refetchCart();
  //   },
  //   context: { clientName: "goods" },
  // });

  // const [removeItem, { loading: deleteLoading }] = useMutation(
  //   removeItemMutation,
  //   {
  //     onCompleted: () => {
  //       refetchCart();
  //     },
  //     context: { clientName: "goods" },
  //   }
  // );

  const [addToCart, { loading: addLoading }] = useMutation(
    addToCartB2cMutation,
    {
      onCompleted: () => {
        refetchCart();
      },
    }
  );

  const [removeItem, { loading: deleteLoading }] = useMutation(
    removeItemB2cMutation,
    {
      onCompleted: () => {
        refetchCart();
      },
    }
  );

  const add = (item, quantity) => {
    // if (!b2bClient) {
    //   setOpenPopup(true);
    //   return;
    // }
    addToCart({
      variables: {
        input: {
          productId: item.id,
          quantity,
          isB2b: true,
        },
      },
    });
  };

  const deleteItem = (item) => {
    removeItem({
      variables: {
        input: {
          items: [{ key: item.key, quantity: item.quantity - 1 }],
          isB2b: true,
        },
      },
    });
  };

  const closePopup = () => {
    setOpenPopup(false);
  };

  return (
    <Wrapper id="catalog">
      <Title noTitle={noTitle}>Каталог товаров</Title>
      {products?.length ? (
        <>
          <Content>
            {products?.map((item) => (
              <Product
                add={add}
                addLoading={addLoading}
                deleteLoading={deleteLoading}
                deleteItem={deleteItem}
                me={me}
                cart={cart}
                loadingCart={loadingCart}
                item={item}
                catalog={catalog}
                key={item.id}
                loading={refetchLoading}
                brand={brand}
              />
            ))}
          </Content>
          {hasNextPage ? (
            <>
              <MobileHidden>
                <ButtonWrap>
                  <Button
                    onClick={() => fetchMore()}
                    size="mediumNoPadding"
                    variant="darkTransparent"
                    mt="39"
                    disabled={loading}
                  >
                    Показать еще
                  </Button>
                </ButtonWrap>
              </MobileHidden>
              <MobileVisible>
                <Button
                  style={{ marginTop: 39 }}
                  onClick={() => fetchMore()}
                  size="fetchMore"
                  disabled={loading}
                  variant="darkTransparent"
                >
                  Показать еще
                </Button>
              </MobileVisible>
            </>
          ) : null}
        </>
      ) : (
        <p>Товары не найдены</p>
      )}
      <Popup
        isOpen={openPopup}
        onClose={closePopup}
        title="Для заказа B2B товара, необходимо зарегистрировать профиль салона или мастера"
      >
        <Button style={{ marginTop: 20 }} onClick={closePopup} variant="red">
          Закрыть
        </Button>
      </Popup>
    </Wrapper>
  );
};

export default Catalog;
