import { useState, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import { useRouter } from 'next/router'
import BackButton from '../../ui/BackButton'
import { Wrapper } from './styles'
import OrderForm from './components/OrderForm'
import SuccessForm from './components/SuccessForm'
import { sendOrderBrandMutation } from '../../../_graphql-legacy/brand/sendOrderBrandMutation'
import parseToFloat from '../../../utils/parseToFloat'
import catalogOrDefault from '../../../utils/catalogOrDefault'
import { removeItemB2cMutation } from '../../../_graphql-legacy/cart/removeItemB2c'
import { cyrToTranslit } from '../../../utils/translit'
import useBaseStore from 'src/store/baseStore'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const OrderPage = () => {
  const { catalogs } = useBaseStore(getStoreData)

  const masterSpecializationsCatalog = catalogOrDefault(
    catalogs?.masterSpecializationsCatalog,
  )

  const [successPage, setSuccessPage] = useState(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [errors, setErrors] = useState(null)
  const [shippingMethod, setShippingMethod] = useState('courier')
  const [shippingType, setShippingType] = useState(0)
  // const [mapCoordinates, setMapCoordinates] = useState([])
  const mapRef = useRef(null)
  // const [clickAddress, setClickAddress] = useState(true)
  const [formValues, setFormValues] = useState(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleClose = () => {
    setOpen(false)
    router.push(`/cartB2b`)
  }

  const [removeItem] = useMutation(removeItemB2cMutation)
  const [sendOrder, { data, loading }] = useMutation(sendOrderBrandMutation, {
    onCompleted: result => {
      const itemsDelete = checkedProducts?.map(item => {
        return {
          key: item.key,
          quantity: 0,
        }
      })
      if (itemsDelete) {
        removeItem({
          variables: {
            input: {
              items: itemsDelete,
              clientMutationId: '',
              isB2b: true,
            },
          },
        })
      }
      router.push(result.sendOrderBrand)
      // setOpen(true);
    },
  })
  let checkedProducts = []
  let productBrands = []
  let orderToRepeat
  if (typeof window !== 'undefined' && window.sessionStorage) {
    if (!sessionStorage.getItem('cartChecked')) {
      router.push('cart')
    } else {
      checkedProducts = JSON.parse(sessionStorage.getItem('cartChecked'))
        .items[0]
      productBrands = JSON.parse(sessionStorage.getItem('cartChecked'))
        .productBrands[0]
    }
  }

  // useEffect(() => {
  //   if (!sessionStorage.getItem('cartChecked')) {
  //     router.push('cart')
  //   } else {
  //     orderToRepeat = JSON.parse(sessionStorage.getItem('cartChecked')).order
  //     productBrands = JSON.parse(
  //       sessionStorage.getItem('cartChecked'),
  //     ).productBrands
  //   }
  //   if (orderToRepeat) {
  //     setFormValues({
  //       ...orderToRepeat,
  //       repeatOrder: true,
  //     })
  //     setShippingMethod(orderToRepeat?.delivery === 0 ? 'self' : 'courier')
  //     setShippingType(orderToRepeat?.payment)
  //   }
  // }, [])

  // const mapData = {
  //   center: mapCoordinates?.length ? mapCoordinates[0] : [55.751574, 37.573856],
  //   zoom: 5,
  //   behaviors: ['default', 'scrollZoom'],
  // }

  // const coordinates = mapCoordinates

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('cartChecked')
      setFormValues(null)
      setSuccessPage(false)
    }
  }, [])

  const onSubmit = values => {
    if (!values.address && shippingMethod !== 'self') {
      setErrors(['Введите адресс или выберите его из выпадающего списка'])
      setErrorPopupOpen(true)
      return
    }
    let orderValues
    if (!formValues?.repeatOrder) {
      orderValues = {
        ...values,
        address: shippingMethod === 'self' ? null : values.address,
        delivery: shippingMethod === 'self' ? 0 : 1,
        payment: shippingType,
      }
    } else {
      orderValues = {
        ...values,
        address: shippingMethod === 'self' ? null : values.address,
        delivery: shippingMethod === 'self' ? 0 : 1,
        payment: shippingType,
        product: formValues?.product,
        repeatOrder: formValues?.repeatOrder,
        brandsIds: formValues?.brandsIds,
      }
    }

    setFormValues(orderValues)
    window.scrollTo(0, 0)
    window.history.pushState(window.history.state, '', '/success')
    setSuccessPage(true)
  }

  const onSuccess = () => {
    let brandsIds = []
    let newArray = []
    if (formValues?.repeatOrder) {
      brandsIds = formValues.brandsIds
      newArray = formValues.product
    } else {
      brandsIds = productBrands.map(prodBrand => prodBrand.id)
      for (let i = 0; i < checkedProducts.length; i++) {
        newArray.push({
          id: checkedProducts[i].product.id,
          name: checkedProducts[i].product?.brand?.name || '',
          description: checkedProducts[i].product.title,
          count: checkedProducts[i].quantity,
          price: parseToFloat(
            checkedProducts[i].product.currentAmount.toString(),
          ),
        })
      }
    }

    sendOrder({
      variables: {
        input: {
          ...formValues,
          product: [...newArray],
          brandsIds,
        },
      },
    })
  }

  // useEffect(() => {
  //   let coordArray = []
  //   productBrands?.length &&
  //     productBrands[0]?.length &&
  //     productBrands[0]?.forEach(item => {
  //       if (item?.addressFull?.latitude && item?.addressFull?.longitude) {
  //         coordArray.push([
  //           item?.addressFull?.latitude,
  //           item?.addressFull?.longitude,
  //         ])
  //       }
  //     })
  //   setMapCoordinates(coordArray)
  // }, [])

  return (
    <MainLayout>
      <MainContainer>
        <Wrapper>
          {!successPage ? (
            <BackButton type="Вернуться в корзину" link={`/cartB2b`} onlyType />
          ) : (
            <div
              onClick={() => {
                setSuccessPage(false)
                window.scrollTo(0, 0)
              }}
            >
              <BackButton type="Редактировать заказ" noLink onlyType />
            </div>
          )}
          {!successPage ? (
            <OrderForm
              formValues={formValues}
              onSubmit={onSubmit}
              errors={errors}
              isErrorPopupOpen={isErrorPopupOpen}
              setErrorPopupOpen={setErrorPopupOpen}
              // setClickAddress={setClickAddress}
              mapRef={mapRef}
              // mapData={mapData}
              // coordinates={coordinates}
              masterSpecializationsCatalog={masterSpecializationsCatalog}
              setShippingMethod={setShippingMethod}
              setShippingType={setShippingType}
              shippingType={shippingType}
              shippingMethod={shippingMethod}
              productBrands={productBrands}
            />
          ) : (
            <SuccessForm
              formValues={formValues}
              checkedProducts={checkedProducts}
              onSuccess={onSuccess}
              handleClose={handleClose}
              open={open}
              loading={loading}
              setSuccessPage={setSuccessPage}
            />
          )}
        </Wrapper>
      </MainContainer>
    </MainLayout>
  )
}

export default OrderPage
