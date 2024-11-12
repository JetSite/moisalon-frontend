import React from 'react'
import {
  TitleBottom,
  BottomWrapper,
  BottomContent,
  Left,
  Right,
  ImageWrap,
  Image,
  Desc,
  Items,
  Item,
  ButtonWrap,
} from './styles'
import Button from '../../../../ui/Button'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import { useRouter } from 'next/router'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const Change = ({ setOpenPopup }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const isLoggedIn = me?.info !== undefined && me?.info !== null
  return (
    <>
      <BottomWrapper>
        <BottomContent>
          <Left>
            <TitleBottom>Меняем представление об индустрии</TitleBottom>
            <Desc>
              Наша команда объединяет опытных разработчиков, маркетологов,
              менеджеров и других экспертов. Специализируемся на индустрии
              красоты, поэтому знаем, что нужно ее представителям.
            </Desc>
            <Items>
              <Item>
                Сотрудничаем с бьюти-мастерами и салонами по всей России —
                поможем вам расширить географию продаж.
              </Item>
              <Item>
                Работаем для мастеров маникюра, парикмахеров, бровистов,
                тату-мастеров, косметологов, визажистов, заинтересованных в 100+
                видах косметики и расходных материалов.
              </Item>
              <Item>
                Всегда на связи, поэтому быстро ответим на любые вопросы и
                поможем решить проблему.
              </Item>
            </Items>
            <MobileHidden>
              <ButtonWrap>
                <Button
                  style={{ padding: 0 }}
                  size="medium"
                  variant="red"
                  font="medium"
                  // onClick={() => setOpenPopup(true)}
                  onClick={() =>
                    router.push(isLoggedIn ? '/masterCabinet' : '/login')
                  }
                >
                  Отправить заявку
                </Button>
              </ButtonWrap>
            </MobileHidden>
            <MobileVisible>
              <ButtonWrap>
                <Button
                  style={{ padding: 0 }}
                  size="fullWidth"
                  variant="red"
                  font="medium"
                  // onClick={() => setOpenPopup(true)}
                  onClick={() =>
                    router.push(isLoggedIn ? '/masterCabinet' : '/login')
                  }
                >
                  Отправить заявку
                </Button>
              </ButtonWrap>
            </MobileVisible>
          </Left>
          <Right>
            <ImageWrap>
              <Image alt="login" src="/master-landing-login.jpg" />
            </ImageWrap>
          </Right>
        </BottomContent>
      </BottomWrapper>
    </>
  )
}

export default Change
