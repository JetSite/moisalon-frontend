import Link from 'next/link'
import { MainContainer } from '../../../styles/common'
import {
  Wrapper,
  Content,
  Logo,
  Bottom,
  Text,
  MobileItemApple,
  MobileItemGoogle,
  Socials,
  SocialYou,
  SocialWs,
  SocialTg,
  BottomMobile,
  TopWrapper,
  LogoMobile,
  BottomTitle,
  ContactsWrapper,
  ContactsItem,
  Right,
  Center,
  Left,
  Phone,
  Copyright,
  NavFooter,
  NavFooterItem,
  LawText,
} from './styled'
import NewsletterSubscribe from '../NewsletterSubscribe'
import { cyrToTranslit } from '../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { FC } from 'react'

interface Props {
  loading?: boolean
  noMobileFooter?: boolean
}

const Footer: FC<Props> = ({ loading = false, noMobileFooter }) => {
  const { city } = useAuthStore(getStoreData)
  return (
    <Wrapper loading={loading} noMobileFooter={noMobileFooter}>
      <MainContainer>
        {!loading ? <NewsletterSubscribe /> : null}
        <Content>
          <Logo alt="logo" src="/logo-white.svg" />
          <Bottom>
            <Left>
              <BottomTitle>Beauty-платформа</BottomTitle>
              <ContactsItem>
                <Phone>
                  <a href="tel:+79852203700">+7 (985) 220 37 00</a>
                </Phone>
                <Text>
                  Офис: <a href="mailto:info@moi.salon">info@moi.salon</a>
                </Text>
              </ContactsItem>
              <ContactsItem>
                <Phone>
                  <a href="tel:+79168447712">+7 (916) 844 77 12</a>
                </Phone>
                <Text>
                  Сотрудничество и реклама:
                  <a href="mailto:vog@moi.salon"> vog@moi.salon</a>
                </Text>
                <Text>
                  Техподдержка:{' '}
                  <a href="mailto:support@moi.salon">support@moi.salon</a>
                </Text>
              </ContactsItem>
            </Left>
            <Center>
              <NavFooter>
                <Link href={`/${city?.slug}`}>
                  <NavFooterItem>Главная</NavFooterItem>
                </Link>
                <Link href={`/${cyrToTranslit(city?.slug)}/master`}>
                  <NavFooterItem>Мастер</NavFooterItem>
                </Link>
                <Link href={`/${cyrToTranslit(city?.slug)}/salon`}>
                  <NavFooterItem>Салон</NavFooterItem>
                </Link>
                <Link href={`/${cyrToTranslit(city?.slug)}/brand`}>
                  <NavFooterItem>Бренд</NavFooterItem>
                </Link>
                <Link href={`/${cyrToTranslit(city?.slug)}/rent`}>
                  <NavFooterItem>Аренда</NavFooterItem>
                </Link>
                <Link href="/about">
                  <NavFooterItem>О проекте</NavFooterItem>
                </Link>
              </NavFooter>
            </Center>
            <Right>
              <Socials>
                {/* <a
                  href="https://www.facebook.com/moi.salon.official/"
                  target="_blank"
                  rel="noreferrer nofollow"
                >
                  <SocialFb />
                </a>
                <a
                  href="https://www.instagram.com/moi.salon_official/"
                  target="_blank"
                  rel="noreferrer nofollow"
                >
                  <SocialInst />
                </a> */}
                <noindex>
                  <a
                    href="https://www.youtube.com/channel/UCK89_mS-ANFgxKlF3JDU0Bw"
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <SocialYou />
                  </a>
                </noindex>
                <noindex>
                  <a
                    href="https://wa.me/79852203700"
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <SocialWs />
                  </a>
                </noindex>
                <noindex>
                  <a
                    href="https://telegram.im/79852203700"
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <SocialTg />
                  </a>
                </noindex>
              </Socials>
              <LawText>
                <Link href="/legals">Юридическая информация</Link>
                <br /> <Link href="/legals">
                  Пользовательское соглашение
                </Link>{' '}
                <br />{' '}
                <Link
                  href={{
                    pathname: '/legals',
                    query: { tab: 'policy' },
                  }}
                  as="/legals"
                >
                  Политика конфиденциальности
                </Link>
                <br /> © 2022{' '}
                <Link href={`/${cyrToTranslit(city?.slug)}`}>MOI SALON</Link>{' '}
                Все права защищены
              </LawText>
            </Right>
          </Bottom>
          <BottomMobile>
            <TopWrapper>
              <LogoMobile alt="logo" src="/logo-white.svg" />
              <Socials>
                {/* <a
                  href="https://www.facebook.com/moi.salon.official/"
                  target="_blank"
                  rel="noreferrer nofollow"
                >
                  <SocialFb />
                </a>
                <a
                  href="https://www.instagram.com/moi.salon_official/"
                  target="_blank"
                  rel="noreferrer nofollow"
                >
                  <SocialInst />
                </a> */}
                <noindex>
                  <a
                    href="https://www.youtube.com/channel/UCK89_mS-ANFgxKlF3JDU0Bw"
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <SocialYou />
                  </a>
                </noindex>
                <noindex>
                  <a
                    href="https://wa.me/79852203700"
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <SocialWs />
                  </a>
                </noindex>
                <noindex>
                  <a
                    href="https://telegram.im/79852203700"
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <SocialTg />
                  </a>
                </noindex>
              </Socials>
            </TopWrapper>
            <BottomTitle>Beauty-платформа</BottomTitle>
            <ContactsWrapper>
              <ContactsItem>
                <Left>
                  <Phone>
                    <a href="tel:+79852203700">+7 (985) 220 37 00</a>
                  </Phone>
                  <Text>
                    Офис: <a href="mailto:info@moi.salon">info@moi.salon</a>
                  </Text>
                </Left>
                <Right>
                  <Link href={`/${cyrToTranslit(city?.slug)}`}>
                    <MobileItemApple />
                  </Link>
                </Right>
              </ContactsItem>
              <ContactsItem>
                <Left>
                  <Phone>
                    <a href="tel:+79168447712">+7 (916) 844 77 12</a>
                  </Phone>
                  <Text>
                    Сотрудничество и реклама:
                    <a href="mailto:vog@moi.salon"> vog@moi.salon</a>
                  </Text>
                </Left>
                <Right>
                  <Link href={`/${cyrToTranslit(city?.slug)}`}>
                    <MobileItemGoogle />
                  </Link>
                </Right>
              </ContactsItem>
              <ContactsItem>
                <Left>
                  <Text>
                    Техподдержка:
                    <br />{' '}
                    <a href="mailto:support@moi.salon">support@moi.salon</a>
                  </Text>
                  <Copyright>
                    © 2022{' '}
                    <Link href={`/${cyrToTranslit(city?.slug)}`}>
                      MOI SALON
                    </Link>{' '}
                    <Link href="/legals">Пользовательское соглашение</Link>
                    <br />
                    <Link
                      href={{
                        pathname: '/legals',
                        query: { tab: 'policy' },
                      }}
                      as="/legals"
                    >
                      Политика конфиденциальности
                    </Link>
                  </Copyright>
                </Left>
                <Right>
                  <NavFooter>
                    <Link href={`/${cyrToTranslit(city?.slug)}`}>
                      <NavFooterItem>Главная</NavFooterItem>
                    </Link>
                    <Link href={`/${cyrToTranslit(city?.slug)}/master`}>
                      <NavFooterItem>Мастер</NavFooterItem>
                    </Link>
                    <Link href={`/${cyrToTranslit(city?.slug)}/rent`}>
                      <NavFooterItem>Аренда</NavFooterItem>
                    </Link>
                    <Link href={`/${cyrToTranslit(city?.slug)}/salon`}>
                      <NavFooterItem>Салон</NavFooterItem>
                    </Link>
                    <Link href="/about">
                      <NavFooterItem>О проекте</NavFooterItem>
                    </Link>
                    <Link href={`/${cyrToTranslit(city?.slug)}/brand`}>
                      <NavFooterItem>Бренд</NavFooterItem>
                    </Link>
                  </NavFooter>
                </Right>
              </ContactsItem>
            </ContactsWrapper>
          </BottomMobile>
        </Content>
      </MainContainer>
    </Wrapper>
  )
}

export default Footer
