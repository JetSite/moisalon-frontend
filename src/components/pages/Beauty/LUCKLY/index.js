import SearchBlock from '../../../blocks/SearchBlock'
import { useRouter } from 'next/router'
import {
  Wrapper,
  Content,
  Image,
  Autor,
  Avatar,
  Info,
  Name,
  Title,
  About,
  Description,
  ContentItem,
  ItemText,
  ItemTitle,
  HideMobile,
  ImageMobile,
  HeadMobile,
  Close,
} from './styled'
import BackButton from '../../../ui/BackButton'
import { cyrToTranslit } from '../../../../utils/translit'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const LucklyPage = () => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)
  return (
    <>
      <HideMobile>
        <SearchBlock />
      </HideMobile>
      <Wrapper>
        <HideMobile>
          <BackButton
            type="Вернуться на главную"
            onlyType
            link={`/${city.slug}`}
          />
        </HideMobile>
        <Content>
          <Image alt="img" src="/luckly-1.jpg" />
          <HeadMobile>
            <ImageMobile alt="img" src="/luckly-1.jpg" />
            <Close onClick={() => router.push(`/${city.slug}`)} />
            <Autor>
              <Avatar alt="avatar" src="/beauty-avatar.png" />
              <Info>
                <Name>Софья Могильникова</Name>
                <About>Помощник Бренд-менеджера LUCKLY</About>
              </Info>
            </Autor>
            <Title>LUCKLY</Title>
          </HeadMobile>
          <HideMobile>
            <Autor>
              <Avatar alt="avatar" src="/beauty-avatar.png" />
              <Info>
                <Name>Софья Могильникова</Name>
                <About>Помощник Бренд-менеджера LUCKLY</About>
              </Info>
            </Autor>
          </HideMobile>
          <HideMobile>
            <Title>LUCKLY</Title>
          </HideMobile>
          <Description>
            “Наш бренд пока еще небольшой, но планы грандиозные! Мы любим
            красивые ногти с качественным маникюром, так как это уже важнейший
            аксессуар в современном мире для женщины, но также и для мужчины! И
            одно название говорит о том, что мы нацелены дарить людям счастье и
            красоту, а она, как известно, в деталях.”
          </Description>
          <ContentItem>
            <ItemTitle>Как давно вы в этом бизнесе?</ItemTitle>
            <ItemText>
              Больше года я работаю, и очень люблю то, чем мы занимаемся. От
              идеи к реализации – это целый путь со своими радостными,
              вдохновляющими моментами, но в то же время своими подводными
              камнями.
            </ItemText>
          </ContentItem>
          <ContentItem>
            <ItemTitle>
              Любимый продукт уходовой или декоративной косметики
            </ItemTitle>
            <ItemText>
              Я очень люблю Полигель UNICORN. Он яркий и привлекательный.
              Подходит на любой день! Будь я в спокойном стиле одета — ногти
              являются акцентами, будь я в бунтарском настроении — этот цвет
              будет идеально его дополнять.
            </ItemText>
          </ContentItem>
          <Image alt="img" src="/luckly-2.jpg" />
          <ImageMobile alt="img" src="/luckly-2.jpg" />
          <ContentItem>
            <ItemTitle>Без чего вы не сможете обойтись</ItemTitle>
            <ItemText>
              Без ногтей, желающих новый, свежий, оригинальный и качественный
              маникюр и педикюр!
            </ItemText>
          </ContentItem>
          <ContentItem>
            <ItemTitle>Расскажите о планах на ближайшее будущее</ItemTitle>
            <ItemText>
              Мы сейчас настроены выходить на новые платформы, магазины. Впереди
              ожидаются форумы, выставки и другие мероприятия.
            </ItemText>
            <ItemText>
              Конечно, хотим расширить цветовую палитру, дополнить ассортимент
              сопутствующими продуктами.
            </ItemText>
          </ContentItem>
          <Image alt="img" src="/luckly-3.jpg" />
          <ImageMobile alt="img" src="/luckly-3.jpg" />
        </Content>
      </Wrapper>
    </>
  )
}

export default LucklyPage
