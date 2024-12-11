import { MutableRefObject, useRef } from 'react'
import { SwiperClass } from 'swiper/react'

interface IUseBeforeInitResult {
  onBeforeInit: (Swiper: SwiperClass) => void
  navigationPrevRef: MutableRefObject<null>
  navigationNextRef: MutableRefObject<null>
}

type UseBeforeInit = () => IUseBeforeInitResult

export const useBeforeInit: UseBeforeInit = () => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const onBeforeInit = (Swiper: SwiperClass) => {
    if (typeof Swiper.params.navigation !== 'boolean') {
      const navigation = Swiper.params.navigation
      if (
        navigation &&
        navigationPrevRef.current &&
        navigationNextRef.current
      ) {
        navigation.prevEl = navigationPrevRef.current
        navigation.nextEl = navigationNextRef.current
      }
    }
  }
  return { onBeforeInit, navigationPrevRef, navigationNextRef }
}
